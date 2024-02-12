import { TOKEN } from "./Types.js";

export class Scanner {

	#source = "";
	#start = 0;
	#current = 0;
	#line = 1;

	/** @type {any[]} */
	#tokens = [];

	/** @type {Object.<string, any>} */
	#keywords = {
		CONST: {type: "CONST"},
		EXCEPTION: {type: "EXCEPTION"},
		EXTENDS: {type: "EXTENDS"},
		INCLUDE: {type: "INCLUDE"},
		NAMESPACE: {type: "NAMESPACE"},
		ONEWAY: {type: "ONEWAY"},
		OPTIONAL: {type: "OPTIONAL"},
		SERVICE: {type: "SERVICE"},
		STRUCT: {type: "STRUCT"},
		THROWS: {type: "THROWS"},
		TYPEDEF: {type: "TYPEDEF"},

		// Containers
		LIST: {type: "LIST"},
		MAP: {type: "MAP"},
		SET: {type: "SET"},

		// Base types
		BOOL: {type: "BOOL"},
		BYTE: {type: "BYTE"},
		DOUBLE: {type: "DOUBLE"},
		I16: {type: "I16"},
		I32: {type: "I32"},
		I64: {type: "I64"},
		STRING: {type: "STRING"},
		VOID: {type: "VOID"},
	};

	/**
	 * @param {string} source
	 */
	constructor(source) {
		this.#source = source;
	}


	/**
	 * Scans given source file for Thrift tokens
	 * @returns {any} - list of tokens found
	 */
	scanTokens() {
		while (!this.#isAtEnd()) {
			this.#start = this.#current;
			this.#scanToken();
		}

		return this.#tokens;
	}

	#scanToken() {
		const c = this.#advance();
		console.log(`scanning ${c}...`);

		switch (c) {
			// Single-character tokens
			case "(": this.#addToken("LEFT_PAREN"); break;
			case ")": this.#addToken("RIGHT_PAREN"); break;
			case "{": this.#addToken("LEFT_BRACE"); break;
			case "}": this.#addToken("RIGHT_BRACE"); break;
			case ",": this.#addToken("COMMA"); break;
			case ".": this.#addToken("DOT"); break;
			case ":": this.#addToken("COLON"); break;

			case "/":
				if (this.#match("/")) {
					// Single-line comment
					while (this.#peek() != "\n" && !this.#isAtEnd()) {
						console.warn("ignoring character...");
						this.#advance();
					}
				} else if (this.#match("*")) {
					// Multiline comment
					while (this.#peek() != "*" && this.#peekNext() != "/" && !this.#isAtEnd()) {
						console.warn("ignoring character...");
						this.#advance();
					}
				}
				break;

			// Whitespaces
			case " ":
			case "\r":
			case "\t":
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
					console.error(`> Unexpected character: ${c}.`);
				}
				break;
		}
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
	// MARK: - Identifier Methods
	// ==========================
	
	#identifier() {
		while (this.#isAlphaNumeric(this.#peek())) this.#advance();

		let text = this.#source.substring(this.#start, this.#current);
		let type = this.#keywords[text.toUpperCase()]?.type;
		if (type == null) type = TOKEN["IDENTIFIER"].type;

		console.error({text, type});

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
	 * @param {any} literal
	 */
	#addToken(type, literal = null) {
		const token = { ...TOKEN[type] };
		console.info({token});
		token.text = this.#source.substring(this.#start, this.#current);
		token.literal = literal;

		this.#tokens.push(token);
	}
};

