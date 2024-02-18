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
		CPP_INCLUDE: {type: "CPP_INCLUDE"},
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

		// Add final token to make it easy to detect we're done
		this.#tokens.push({ ...TOKEN.EOF });

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
					console.error(`> Unexpected character: >${c}< unicode >${c.charCodeAt(0)}<.`);
				}
				break;
		}
	}


	// ==========================
	// MARK: - Identifier Methods
	// ==========================
	
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
	 * @param {any} literal
	 */
	#addToken(type, literal = null) {
		/** @type {import("./Types.js").token} tokens */
		const token = {
			...TOKEN[type],
			text: this.#source.substring(this.#start, this.#current),
			literal: literal
		};

		this.#tokens.push(token);
	}
};

