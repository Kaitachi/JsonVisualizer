import { TOKEN } from "./Tokens.js";

export class Scanner {

	#source = "";
	#start = 0;
	#current = 0;
	#line = 1;

	/** @type {import("./Tokens.js").token[]} */
	#tokens = [];

	/** @type {Object.<string, import("./Tokens.js").tokenType>} */
	#keywords = {
		CONST: TOKEN.CONST,
		ENUM: TOKEN.ENUM,
		EXCEPTION: TOKEN.EXCEPTION,
		EXTENDS: TOKEN.EXTENDS,
		INCLUDE: TOKEN.INCLUDE,
		CPP_INCLUDE: TOKEN.CPP_INCLUDE,
		NAMESPACE: TOKEN.NAMESPACE,
		ONEWAY: TOKEN.ONEWAY,
		OPTIONAL: TOKEN.OPTIONAL,
		SERVICE: TOKEN.SERVICE,
		STRUCT: TOKEN.STRUCT,
		THROWS: TOKEN.THROWS,
		TYPEDEF: TOKEN.TYPEDEF,

		// Containers
		LIST: TOKEN.LIST,
		MAP: TOKEN.MAP,
		SET: TOKEN.SET,

		// Base types
		BOOL: TOKEN.BOOL,
		BYTE: TOKEN.BYTE,
		I8: TOKEN.I8,
		I16: TOKEN.I16,
		I32: TOKEN.I32,
		I64: TOKEN.I64,
		DOUBLE: TOKEN.DOUBLE,
		STRING: TOKEN.STRING,
		BINARY: TOKEN.BINARY,
		UUID: TOKEN.UUID,
		VOID: TOKEN.VOID,
	};

	/**
	 * @param {string} source
	 */
	constructor(source) {
		this.#source = source;
	}


	/**
	 * Scans given source file for Thrift tokens
	 * @returns {import("./Tokens.js").token[]} - list of tokens found
	 */
	scanTokens() {
		while (!this.#isAtEnd()) {
			this.#start = this.#current;
			this.#scanToken();
		}

		// Add final token to make it easy to detect we're done
		this.#tokens.push(TOKEN.EOF);

		return this.#tokens;
	}

	#scanToken() {
		const c = this.#advance();

		switch (c) {
			// Single-character tokens
			case "(": this.#addToken("LEFT_PAREN"); break;
			case ")": this.#addToken("RIGHT_PAREN"); break;
			case "{": this.#addToken("LEFT_BRACE"); break;
			case "}": this.#addToken("RIGHT_BRACE"); break;
			case "<": this.#addToken("LEFT_ANGLE_BRACE"); break;
			case ">": this.#addToken("RIGHT_ANGLE_BRACE"); break;
			case ",": this.#addToken("COMMA"); break;
			case ".": this.#addToken("DOT"); break;
			case ":": this.#addToken("COLON"); break;
			case ";": this.#addToken("SEMICOLON"); break;
			case "=": this.#addToken("EQUAL"); break;
			case "+": this.#addToken("PLUS"); break;
			case "-": this.#addToken("DASH"); break;
			case "*": this.#addToken("STAR"); break;

			// Literals
			case "'":
			case "\"":
				this.#literal(c);
				break;

			// Comments
			case "/":
				if (this.#match("/")) {
					// Single-line comment
					while (this.#peek() != "\n" && !this.#isAtEnd()) {
						// console.warn("ignoring character...");
						this.#advance();
					}
				} else if (this.#match("*")) {
					// Multiline comment
					while (!(this.#peek() == "*" && this.#peekNext() == "/") && !this.#isAtEnd()) {
						// console.warn("ignoring character...");
						this.#advance();
					}
					this.#advance();
					this.#advance();
				}
				break;

			case "#":
				// Single-line comment
				while (this.#peek() != "\n" && !this.#isAtEnd()) {
					// console.warn("ignoring character...");
					this.#advance();
				}

			// Whitespaces
			case " ":
			case "\r":
			case "\t":
			case "\u{a0}": // non-breaking space
				// Ignore whitespace
				break;

			case "\n":
				this.#line++;
				break;

			// Identifiers/keywords
			default:
				if (this.#isDigit(c)) {
					this.#number();
				} else if (this.#isAlpha(c)) {
					this.#identifier();
				} else {
					const curr = this.#current;
					console.error(`> Unexpected character: >${c}< unicode >${c.charCodeAt(0)}< (line ${this.#line} - context: ${this.#source.substring(curr-20, curr+20)}).`);
				}
				break;
		}
	}


	// ==========================
	// MARK: - Identifier Methods
	// ==========================
	
	/**
	 * @param {string} c
	 */
	#literal(c) {
		while (!this.#match(c)) this.#advance();

		this.#addToken("LITERAL", this.#source.substring(this.#start+1, this.#current-1));
	}

	#identifier() {
		while (this.#isAlphaNumeric(this.#peek())) this.#advance();

		let text = this.#source.substring(this.#start, this.#current);
		let type = this.#keywords[text.toUpperCase()]?.type;
		if (type == null) type = TOKEN["IDENTIFIER"].type;

		this.#addToken(type);
	}

	#number() {
		while (this.#isDigit(this.#peek())) this.#advance();

		this.#addToken("NUMBER", Number(this.#source.substring(this.#start, this.#current)));
	}

	/**
	 * @param {string} c
	 * @returns {boolean}
	 */
	#isAlpha(c) {
		return ("a" <= c && c <= "z") ||
			   ("A" <= c && c <= "Z") ||
			   c == "_";
	}

	/**
	 * @param {string} c
	 * @returns {boolean}
	 */
	#isDigit(c) {
		return ("0" <= c && c <= "9");
	}

	/**
	 * @param {string} c
	 * @returns {boolean}
	 */
	#isAlphaNumeric(c) {
		return (this.#isAlpha(c) || this.#isDigit(c));
	}


	// ==========================
	// MARK: - Index Methods
	// ==========================

	/**
	 * @param {string} expected
	 */
	#match(expected) {
		if (this.#isAtEnd()) return false;
		if (this.#source.charAt(this.#current) != expected) return false;

		this.#current++;
		return true;
	}

	#peek() {
		if (this.#isAtEnd()) return "\0";
		return this.#source.charAt(this.#current);
	}

	#peekNext() {
		if (this.#current + 1 >= this.#source.length) return "\0";
		return this.#source.charAt(this.#current + 1);
	}


	// ==========================
	// MARK: - Helper Methods
	// ==========================

	#advance() {
		return this.#source[this.#current++];
	}

	#isAtEnd() {
		return (this.#current >= this.#source.length);
	}

	/**
	 * @param {string} type
	 * @param {(string|number)?} literal
	 */
	#addToken(type, literal = null) {
		/** @type {import("./Tokens.js").token} tokens */
		const token = {
			...TOKEN[type],
			text: this.#source.substring(this.#start, this.#current),
			literal: literal
		};

		this.#tokens.push(token);
	}
};

