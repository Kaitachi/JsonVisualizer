import { TOKEN } from "./Types.js";

// https://thrift.apache.org/docs/idl

/**
 * [01] Document - Thrift Document
 * [01] Document        ::=  Header* Definition*
 *
 * @typedef {Object} Document
 * @property {Object.<string, Header>} headers - collection of headers for this document
 * @property {Object.<string, Definition>} definitions - collection of definitions for this document
 */

/**
 * [02] Header - Thrift Header
 * [02] Header          ::=  Include | CppInclude | Namespace
 *
 * @typedef {Object} Header
 * @property {string} type
 * @property {string} name
 * @property {Include|CppInclude|Namespace} header
 */

/**
 * [03] Include - Thrift Include Header
 * [03] Include         ::=  'include' Literal
 *
 * @typedef {Object} Include
 */

/**
 * [04] CppInclude - Thrift CppInclude Header
 * [04] CppInclude      ::=  'cpp_include' Literal
 *
 * @typedef {Object} CppInclude
 */

/**
 * [05] Namespace - Thrift Namespace Header
 * [05] Namespace       ::=  ( 'namespace' ( NamespaceScope Identifier ) )
 *
 * @typedef {Object} Namespace
 * @property {string} scope
 * @property {string} identifier
 */

/**
 * [06] NamespaceScope - Thrift Napespace Scope Directive
 * [06] NamespaceScope  ::=  '*' | 'c_glib' | 'cpp' | 'delphi' | 'haxe' | 'go' | 'java' | 'js' | 'lua' | 'netstd' | 'perl' | 'php' | 'py' | 'py.twisted' | 'rb' | 'st' | 'xsd'
 *
 * @typedef {Object} NamespaceScope
 */

/**
 * [07] Definition - Thrift Definition Object
 * [07] Definition      ::=  Const | Typedef | Enum | Struct | Union | Exception | Service
 *
 * @typedef {Object} Definition
 * @property {string} type
 * @property {string} name
 * @property {Const|Typedef|EnumType|Struct|Union|Exception|Service} definition
 */

/**
 * [08] Const - Thrift Const Object
 * [08] Const           ::=  'const' FieldType Identifier '=' ConstValue ListSeparator?
 *
 * @typedef {Object} Const
 */

/**
 * [09] Typedef - Thrift Typedef Object
 * [09] Typedef         ::=  'typedef' DefinitionType Identifier
 *
 * @typedef {Object} Typedef
 * @property {string} definitionType
 * @property {string} identifier
 */

/**
 * [10] Enum - Thrift Enum Object
 * [10] Enum            ::=  'enum' Identifier '{' (Identifier ('=' IntConstant)? ListSeparator?)* '}'
 *
 * @typedef {Object} EnumType
 * @property {string} identifier
 * @property {Object.<string, any>} enumerators
 */

/**
 * [11] Struct - Thrift Struct Object
 * [11] Struct          ::=  'struct' Identifier 'xsd_all'? '{' Field* '}'
 *
 * @typedef {Object} Struct
 * @property {string} identifier
 * @property {Field[]} fields
 */

/**
 * [12] Union - Thrift Union Object
 * [12] Union          ::=  'union' Identifier 'xsd_all'? '{' Field* '}'
 *
 * @typedef {Object} Union
 * @property {string} identifier
 * @property {Field[]} fields
 */

/**
 * [13] Exception - Thrift Exception Object
 * [13] Exception       ::=  'exception' Identifier '{' Field* '}'
 *
 * @typedef {Object} Exception
 * @property {string} identifier
 * @property {Field[]} fields
 */

/**
 * [14] Service - Thrift Service Object
 * [14] Service         ::=  'service' Identifier ( 'extends' Identifier )? '{' Function* '}'
 *
 * @typedef {Object} Service
 * @property {string} identifier
 * @property {string} extending
 * @property {ThriftFunction[]} functions
 */

/**
 * [15] Field - Thrift Field Object
 * [15] Field           ::=  FieldID? FieldReq? FieldType Identifier ('=' ConstValue)? XsdFieldOptions ListSeparator?
 *
 * @typedef {Object} Field
 * @property {number?} id
 * @property {string?} requiredness
 * @property {string} type
 * @property {string} identifier
 * @property {any} value
 */

/**
 * [20] Function - Thrift Function Object
 * [20] Function        ::=  'oneway'? FunctionType Identifier '(' Field* ')' Throws? ListSeparator?
 *
 * @typedef {Object} ThriftFunction
 * @property {string?} oneway
 * @property {string} identifier
 * @property {string} returns
 * @property {Field[]} fields
 * @property {Field[]?} throws
 */

/**
 * [37] Identifier - Thrift Identifier Object
 * [37] Identifier      ::=  ( Letter | '_' ) ( Letter | Digit | '.' | '_' )*
 *
 * @typedef {string} Identifier
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
		const identifier = this.#identifier();

		return {
			scope: scope.text,
			identifier
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
				const enumType = this.#enum();
				return {
					type: TOKEN.ENUM.type,
					name: enumType.identifier,
					definition: enumType
				};

			case TOKEN.STRUCT.type:
				const struct = this.#struct();
				return {
					type: TOKEN.STRUCT.type,
					name: struct.identifier,
					definition: struct
				};

			case TOKEN.UNION.type:
				const union = this.#union();
				return {
					type: TOKEN.UNION.type,
					name: union.identifier,
					definition: union
				};

			case TOKEN.EXCEPTION.type:
				const exception = this.#exception();
				return {
					type: TOKEN.EXCEPTION.type,
					name: exception.identifier,
					definition: exception
				};

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
		const identifier = this.#identifier();

		return {
			definitionType: definitionType.text,
			identifier
		};
	}

	/**
	 * @returns {EnumType}
	 */
	#enum() {
		const identifier = this.#identifier();
		/** @type {Object.<string, any>} */
		const enumerators = {};

		this.#consume(TOKEN.LEFT_BRACE, "[#enum] Expected opening brace");

		while (this.#peek().type !== TOKEN.RIGHT_BRACE.type) {
			const enumerator = this.#identifier();
			let value = null;
			
			if (this.#peek().type === TOKEN.EQUAL.type) {
				// Swallow equals sign
				this.#advance();

				value = this.#intConstant();
			}

			// Swallow list separator
			this.#listSeparator();

			enumerators[enumerator] = value;
		}

		this.#consume(TOKEN.RIGHT_BRACE, "[#enum] Expected closing brace");

		return {
			identifier,
			enumerators
		};
	}

	/**
	 * @returns {Struct}
	 */
	#struct() {
		this.#consume(TOKEN.STRUCT, "Incorrect struct definition");
		const identifier = this.#identifier();
		const fields = this.#fields(TOKEN.LEFT_BRACE, TOKEN.RIGHT_BRACE);

		return {
			identifier,
			fields
		};
	}

	/**
	 * @returns {Union}
	 */
	#union() {
		this.#consume(TOKEN.UNION, "Incorrect union definition");
		const identifier = this.#identifier();
		const fields = this.#fields(TOKEN.LEFT_BRACE, TOKEN.RIGHT_BRACE);

		return {
			identifier,
			fields
		};
	}

	/**
	 * @returns {Exception}
	 */
	#exception() {
		this.#consume(TOKEN.EXCEPTION, "Incorrect exception definition");
		const identifier = this.#identifier();
		const fields = this.#fields(TOKEN.LEFT_BRACE, TOKEN.RIGHT_BRACE);

		return {
			identifier,
			fields
		};
	}

	/**
	 * @returns {Service}
	 */
	#service() {
		this.#consume(TOKEN.SERVICE, "Incorrect service definition");
		const identifier = this.#identifier();
		const extending = "";
		const functions = this.#functions();

		return {
			identifier,
			extending: extending,
			functions: functions
		};
	}


	// ==========================
	// MARK: - Function Methods
	// ==========================

	#functions() {
		/** @type {ThriftFunction[]} */
		const functions = [];

		this.#consume(TOKEN.LEFT_BRACE, "[#function] Expected opening brace");

		while (this.#peek().type !== TOKEN.RIGHT_BRACE.type) {
			functions.push(this.#function());
		}

		this.#consume(TOKEN.RIGHT_BRACE, "[#function] Expected closing brace");

		return functions;
	}

	/**
	 * @returns {ThriftFunction}
	 */
	#function() {
		const oneway = this.#oneway();
		const functionType = this.#advance();
		const identifier = this.#identifier();
		const fields = this.#fields(TOKEN.LEFT_PAREN, TOKEN.RIGHT_PAREN);
		const throws = this.#throws();

		// Swallow list separator
		this.#listSeparator();

		return {
			oneway: (oneway) ? oneway.text : null,
			identifier,
			returns: functionType.text,
			fields: fields,
			throws: throws
		};
	}

	#oneway() {
		if (this.#peekNext()?.type === TOKEN.ONEWAY.type) {
			return this.#advance();
		}

		return null;
	}

	/**
	 * @returns {Field[]?}
	 */
	#throws() {
		if (this.#peekNext()?.type === TOKEN.THROWS.type) {
			this.#consume(TOKEN.THROWS, "Incorrect throws definition");
			return this.#fields(TOKEN.LEFT_PAREN, TOKEN.RIGHT_PAREN);
		}
		return [];
	}


	// ==========================
	// MARK: - Field Methods
	// ==========================

	/**
	 * @param {{type: string}} left
	 * @param {{type: string}} right
	 */
	#fields(left, right) {
		/** @type {Field[]} */
		const fields = [];

		this.#consume(left, "[#fields] Expected opening brace");

		while (this.#peek().type !== right.type) {
			fields.push(this.#field());
		}

		this.#consume(right, "[#fields] Expected closing brace");

		return fields;
	}

	/**
	 * @returns {Field}
	 */
	#field() {
		const id = this.#fieldId();
		const requiredness = this.#fieldReq();
		const type = this.#advance();
		const identifier = this.#identifier();
		const value = this.#constValue();

		// Swallow list separator
		this.#listSeparator();

		return {
			id: id?.literal,
			requiredness: (requiredness) ? requiredness.text : null,
			type: type.text,
			identifier,
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

	#intConstant() {
		if (this.#peek().type === TOKEN.NUMBER.type) {
			return +this.#advance().text;
		}

		return null;
	}

	#listSeparator() {
		if (this.#match(TOKEN.COMMA, TOKEN.SEMICOLON)) {
			return this.#previous();
		}

		return null;
	}


	// ==========================
	// MARK: - Basic Types
	// ==========================

	#identifier() {
		let text = this.#advance().text;

		while ([TOKEN.DOT.type, TOKEN.IDENTIFIER.type].includes(this.#peek()?.type)) {
			text += this.#advance().text;
		}

		return text;
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

