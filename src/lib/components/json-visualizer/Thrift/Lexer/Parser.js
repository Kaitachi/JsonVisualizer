import { TOKEN } from "./Types.js";

// https://thrift.apache.org/docs/idl

/**
 * [01] Document - Thrift Document
 * @typedef {Object} Document
 * @property {Object.<string, Header>} headers - collection of headers for this document
 * @property {Object.<string, Definition>} definitions - collection of definitions for this document
 */

/**
 * [02] Header - Thrift Header
 * @typedef {Object} Header
 * @property {string} type
 * @property {string} name
 * @property {Include|CppInclude|Namespace} header
 */

/**
 * [03] Include - Thrift Include Header
 * @typedef {Object} Include
 */

/**
 * [04] CppInclude - Thrift CppInclude Header
 * @typedef {Object} CppInclude
 */

/**
 * [05] Namespace - Thrift Namespace Header
 * @typedef {Object} Namespace
 * @property {string} scope
 * @property {string} identifier
 */

/**
 * [06] NamespaceScope - Thrift Napespace Scope Directive
 * @typedef {Object} NamespaceScope
 */

/**
 * [07] Definition - Thrift Definition Object
 * @typedef {Object} Definition
 * @property {string} type
 * @property {string} name
 * @property {Const|Typedef|Enum|Struct|Union|Exception|Service} definition
 */

/**
 * [08] Const - Thrift Const Object
 * @typedef {Object} Const
 */

/**
 * [09] Typedef - Thrift Typedef Object
 * @typedef {Object} Typedef
 * @property {string} definitionType
 * @property {string} identifier
 */

/**
 * [10] Enum - Thrift Enum Object
 * @typedef {Object} Enum
 */

/**
 * [11] Struct - Thrift Struct Object
 * @typedef {Object} Struct
 * @property {string} identifier
 * @property {Field[]} fields
 */

/**
 * [12] Union - Thrift Union Object
 * @typedef {Object} Union
 */

/**
 * [13] Exception - Thrift Exception Object
 * @typedef {Object} Exception
 */

/**
 * [14] Service - Thrift Service Object
 * @typedef {Object} Service
 */

/**
 * [15] Field - Thrift Field Object
 * @typedef {Object} Field
 * @property {number?} id
 * @property {string?} requiredness
 * @property {string} type
 * @property {string} identifier
 * @property {any} value
 */

export class Parser {

	#current = 0;

	/** @type {import("./Types.js").token[]} */
	#tokens = [];

	/**
	 * @param {import("./Types.js").token[]} tokens
	 */
	constructor(tokens) {
		this.#tokens = tokens;
	}

	/**
	* @returns {Document}
	*/
	parse() {
		/** @type {Document} */
		let document = {
			headers: {},
			definitions: {}
		}

		while (!this.#isAtEnd()) {
			switch (this.#peek().type) {
				case TOKEN.NAMESPACE.type:
					const header = this.#header();
					document.headers[header.name] = header;
					break;
		
				default:
					const definition = this.#definition();
					document.definitions[definition.name] = definition;
					break;
			}
		}

		return document;
	}


	// ==========================
	// MARK: - Header Methods
	// ==========================

	/**
	 * @returns {Header}
	 */
	#header() {
		const token = this.#peek();

		switch (token.type) {
			case TOKEN.INCLUDE.type:
				// TODO: Parse INCLUDE type!
				throw this.#error(token.type, `Header token ${token.type} not supported!`);

			case TOKEN.CPP_INCLUDE.type:
				// TODO: Parse CPP_INCLUDE type!
				throw this.#error(token.type, `Header token ${token.type} not supported!`);

			case TOKEN.NAMESPACE.type:
				const namespace = this.#namespace();
				return {
					type: TOKEN.NAMESPACE.type,
					name: namespace.scope,
					header: namespace
				}

			default:
				console.error(`Token ${token.type} not supported!`);
				throw this.#error(token.type, `Header token ${token.type} not supported!`);
		}
	}

	/**
	 * @returns {Namespace}
	 */
	#namespace() {
		this.#consume(TOKEN.NAMESPACE, "Incorrect namespace definition");
		const scope = this.#advance();
		const identifier = this.#advance();

		return {
			scope: scope.text,
			identifier: identifier.text
		};
	}


	// ==========================
	// MARK: - Definition Methods
	// ==========================

	/**
	 * @returns {Definition}
	 */
	#definition() {
		const token = this.#peek();

		switch (token.type) {
			case TOKEN.CONST.type:
				// TODO: Parse CONST type!
				throw this.#error(token.type, `Definition token ${token.type} not supported!`);

			case TOKEN.TYPEDEF.type:
				const typedef = this.#typedef();
				return {
					type: TOKEN.TYPEDEF.type,
					name: typedef.identifier,
					definition: typedef
				};

			case TOKEN.ENUM.type:
				// TODO: Parse ENUM type!
				throw this.#error(token.type, `Definition token ${token.type} not supported!`);

			case TOKEN.STRUCT.type:
				const struct = this.#struct();
				return {
					type: TOKEN.STRUCT.type,
					name: struct.identifier,
					definition: struct
				};

			case TOKEN.UNION.type:
				// TODO: Parse UNION type!
				throw this.#error(token.type, `Definition token ${token.type} not supported!`);

			case TOKEN.EXCEPTION.type:
				// TODO: Parse EXCEPTION type!
				throw this.#error(token.type, `Definition token ${token.type} not supported!`);

			case TOKEN.SERVICE.type:
				const service = this.#service();
				return {
					type: TOKEN.SERVICE.type,
					name: service.identifier,
					definition: service
				};

			default:
				console.error(`Token ${token.type} not supported!`);
				throw this.#error(token.type, `Definition token ${token.type} not supported!`);
		}
	}

	/**
	 * @returns {Typedef}
	 */
	#typedef() {
		this.#consume(TOKEN.TYPEDEF, "Incorrect typedef definition");
		const definitionType = this.#advance();
		const identifier = this.#advance();

		return {
			definitionType: definitionType.text,
			identifier: identifier.text
		};
	}

	/**
	 * @returns {Struct}
	 */
	#struct() {
		this.#consume(TOKEN.STRUCT, "Incorrect struct definition");
		const identifier = this.#advance();

		/** @type {Field[]} */
		const fields = [];

		this.#consume(TOKEN.LEFT_BRACE, "Incorrect struct definition");

		while (this.#peek().type !== TOKEN.RIGHT_BRACE.type) {
			fields.push(this.#field());
			// this.#advance();
		}

		this.#consume(TOKEN.RIGHT_BRACE, "Incorrect struct definition");

		return {
			identifier: identifier.text,
			fields
		};
	}

	/**
	 * @returns {Service}
	 */
	#service() {

		return {};
	}


	// ==========================
	// MARK: - Sub-Methods
	// ==========================
	
	/**
	 * @returns {Field}
	 */
	#field() {

		const id = this.#fieldId();
		const requiredness = this.#fieldReq();
		const type = this.#advance();
		const identifier = this.#advance();
		const value = this.#constValue();

		// Swallow list separator
		this.#listSeparator();

		return {
			id: id?.literal,
			requiredness: (requiredness) ? requiredness.text : null,
			type: type.text,
			identifier: identifier.text,
			value: value
		};
	}

	#fieldId() {
		if (this.#peekNext()?.type === TOKEN.COLON.type) {
			const id = this.#advance();
			
			this.#consume(TOKEN.COLON, "Incorrect fieldId definition");

			return id;
		}

		return null;
	}

	#fieldReq() {
		if (this.#match(TOKEN.REQUIRED, TOKEN.OPTIONAL)) {
			return this.#previous();
		}

		return null;
	}


	// ==========================
	// MARK: - Constant Values
	// ==========================

	#constValue() {
		// TODO: Parse CONSTVALUE type!
		return null;
	}

	#listSeparator() {
		if (this.#match(TOKEN.COMMA, TOKEN.SEMICOLON)) {
			return this.#previous();
		}

		return null;
	}

	// ==========================
	// MARK: - Helper Methods
	// ==========================

	/**
	 * @param {{type: string}[]} tokens
	 */
	#match(...tokens) {
		tokens.forEach(token =>
			{ if (this.#check(token.type)) {
                this.#advance();
                return true;
            }
		});

        return false;
    }

	/**
	 * @param {string} type
	 */
	#check(type) {
		if (this.#isAtEnd()) return false;

		return this.#peek().type === type;
	}

	#previous() {
        return this.#tokens[this.#current - 1];
    }

	#advance() {
        if (!this.#isAtEnd()) this.#current++;

        return this.#previous();
    }

	/**
	 * @param {{type: string}} type
	 * @param {string} message
	 */
	#consume(type, message) {
        if (this.#check(type.type)) return this.#advance();

        throw this.#error(this.#peek().type, message);
    }

	#peek() {
		return this.#tokens[this.#current];
	}

	#peekNext() {
		return (this.#current + 1 <= this.#tokens.length)
			? this.#tokens[this.#current + 1]
			: null;
	}

	/**
	 * @param {string} type
	 * @param {string} message
	 */
	#error(type, message) {
		throw new Error(`Unexpected token: ${type}. ${message}`);
	}

	#isAtEnd() {
		return this.#peek().type == TOKEN.EOF.type;
	}
};

