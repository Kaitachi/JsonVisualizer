import { TOKEN } from "./Tokens.js";

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
 * @property {string} literal
 */

/**
 * [04] CppInclude - Thrift CppInclude Header
 * [04] CppInclude      ::=  'cpp_include' Literal
 *
 * @typedef {Object} CppInclude
 * @property {string} literal
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
 * @typedef {string} NamespaceScope
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
 * @property {FieldType} type
 * @property {string} identifier
 * @property {ConstValue} value
 */

/**
 * [09] Typedef - Thrift Typedef Object
 * [09] Typedef         ::=  'typedef' DefinitionType Identifier
 *
 * @typedef {Object} Typedef
 * @property {DefinitionType} definitionType
 * @property {string} identifier
 */

/**
 * [10] Enum - Thrift Enum Object
 * [10] Enum            ::=  'enum' Identifier '{' (Identifier ('=' IntConstant)? ListSeparator?)* '}'
 *
 * @typedef {Object} EnumType
 * @property {string} identifier
 * @property {Object.<string, IntConstant>} enumerators
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
 * @property {string?} extending
 * @property {Object.<string, ThriftFunction>} functions
 */

/**
 * [15] Field - Thrift Field Object
 * [15] Field           ::=  FieldID? FieldReq? FieldType Identifier ('=' ConstValue)? XsdFieldOptions ListSeparator?
 *
 * @typedef {Object} Field
 * @property {number?} id
 * @property {string?} requiredness
 * @property {FieldType} type
 * @property {string} identifier
 * @property {ConstValue} value
 */

/**
 * [20] Function - Thrift Function Object
 * [20] Function        ::=  'oneway'? FunctionType Identifier '(' Field* ')' Throws? ListSeparator?
 *
 * @typedef {Object} ThriftFunction
 * @property {string?} oneway
 * @property {string} identifier
 * @property {FieldType} returns
 * @property {Field[]} fields
 * @property {Field[]?} throws
 */

/**
 * [21] FunctionType - Thrift FunctionType Object
 * [21] FunctionType    ::=  FieldType | 'void'
 *
 * @typedef {FieldType|string} FunctionType
 */

/**
 * [23] FieldType - Thrift FieldType Object
 * [23] FieldType       ::=  Identifier | BaseType | ContainerType
 *
 * @typedef {Identifier|BaseType|ContainerType} FieldType
 */

/**
 * [24] DefinitionType - Thrift DefinitionType Object
 * [24] DefinitionType  ::=  BaseType | ContainerType
 *
 * @typedef {BaseType|ContainerType} DefinitionType
 */

/**
 * [25] BaseType - Thrift BaseType Object
 * [25] BaseType        ::=  'bool' | 'byte' | 'i8' | 'i16' | 'i32' | 'i64' | 'double' | 'string' | 'binary' | 'uuid'
 *
 * @typedef {string} BaseType
 */

/**
 * [26] ContainerType - Thrift ContainerType Object
 * [26] ContainerType   ::=  MapType | SetType | ListType
 *
 * @typedef {MapType|SetType|ListType} ContainerType
 */

/**
 * [27] MapType - Thrift ContainerType Object
 * [27] MapType         ::=  'map' CppType? '<' FieldType ',' FieldType '>'
 *
 * @typedef {Object} MapType
 * @property {FieldType} keyType
 * @property {FieldType} valueType
 */

/**
 * [28] SetType - Thrift ContainerType Object
 * [28] SetType         ::=  'set' CppType? '<' FieldType '>'
 *
 * @typedef {Object} SetType
 * @property {FieldType} valueType
 */

/**
 * [29] ListType - Thrift ContainerType Object
 * [29] ListType        ::=  'list' CppType? '<' FieldType '>'
 *
 * @typedef {Object} ListType
 * @property {FieldType} valueType
 */

/**
 * [31] ConstValue - Thrift ConstValue Object
 * [31] ConstValue      ::=  IntConstant | DoubleConstant | Literal | Identifier | ConstList | ConstMap
 *
 * @typedef {IntConstant|DoubleConstant|Literal|Identifier|ConstList|ConstMap} ConstValue
 */

/**
 * [32] IntConstant - Thrift IntConstant Object
 * [32] IntConstant     ::=  ('+' | '-')? Digit+
 *
 * @typedef {Number} IntConstant
 */

/**
 * [33] DoubleConstant - Thrift DoubleConstant Object
 * [33] DoubleConstant  ::=  ('+' | '-')? Digit* ('.' Digit+)? ( ('E' | 'e') IntConstant )?
 *
 * @typedef {Number} DoubleConstant
 */

/**
 * [34] ConstList - Thrift ConstList Object
 * [34] ConstList       ::=  '[' (ConstValue ListSeparator?)* ']'
 *
 * @typedef {ConstValue[]} ConstList
 */

/**
 * [35] ConstMap - Thrift ConstMap Object
 * [35] ConstMap        ::=  '{' (ConstValue ':' ConstValue ListSeparator?)* '}'
 *
 * @typedef {Object.<ConstValue, ConstValue>} ConstMap
 */

/**
 * [36] Literal - Thrift Literal Object
 * [36] Literal         ::=  ('"' [^"]* '"') | ("'" [^']* "'")
 *
 * @typedef {string} Literal
 */

/**
 * [37] Identifier - Thrift Identifier Object
 * [37] Identifier      ::=  ( Letter | '_' ) ( Letter | Digit | '.' | '_' )*
 *
 * @typedef {string} Identifier
 */

export class Parser {

	#current = 0;

	/** @type {import("./Tokens.js").token[]} */
	#tokens = [];

	/**
	 * @param {import("./Tokens.js").token[]} tokens
	 */
	constructor(tokens) {
		this.#tokens = tokens;
	}

	/**
	 * [01] Document        ::=  Header* Definition*
	 *
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
				case TOKEN.INCLUDE.type:
				case TOKEN.CPP_INCLUDE.type:
				case TOKEN.NAMESPACE.type:
					const header = this.#header();
					document.headers[header.name] = header;
					break;
		
				default:
					const definition = this.#definition();
					if (definition !== null) {
						document.definitions[definition.name] = definition;
					}
					break;
			}
		}

		return document;
	}


	// ==========================
	// MARK: - Header Methods
	// ==========================

	/**
	 * [02] Header          ::=  Include | CppInclude | Namespace
	 *
	 * @returns {Header}
	 */
	#header() {
		const token = this.#peek();

		switch (token.type) {
			case TOKEN.INCLUDE.type:
				const include = this.#include();
				return {
					type: TOKEN.INCLUDE.type,
					name: include.literal,
					header: include
				}

			case TOKEN.CPP_INCLUDE.type:
				const cpp_include = this.#cppInclude();
				return {
					type: TOKEN.INCLUDE.type,
					name: cpp_include.literal,
					header: cpp_include
				}

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
	 * [03] Include         ::=  'include' Literal
	 *
	 * @returns {Include}
	 */
	#include() {
		this.#consume(TOKEN.INCLUDE, "Incorrect include definition");
		const literal = `${this.#advance().literal}`;

		return {
			literal
		};
	}

	/**
	 * [04] CppInclude      ::=  'cpp_include' Literal
	 *
	 * @returns {Include}
	 */
	#cppInclude() {
		this.#consume(TOKEN.CPP_INCLUDE, "Incorrect include definition");
		const literal = `${this.#advance().literal}`;

		return {
			literal
		};
	}

	/**
	 * [05] Namespace       ::=  ( 'namespace' ( NamespaceScope Identifier ) )
	 *
	 * @returns {Namespace}
	 */
	#namespace() {
		this.#consume(TOKEN.NAMESPACE, "Incorrect namespace definition");
		const scope = this.#namespaceScope();
		const identifier = this.#identifier();

		return {
			scope,
			identifier
		};
	}

	/**
	 * [06] NamespaceScope  ::=  '*' | 'c_glib' | 'cpp' | 'delphi' | 'haxe' | 'go' | 'java' | 'js' | 'lua' | 'netstd' | 'perl' | 'php' | 'py' | 'py.twisted' | 'rb' | 'st' | 'xsd'
	 *
	 * @returns {NamespaceScope}
	 */
	#namespaceScope() {
		const token = this.#advance();

		switch (token.type) {
			case TOKEN.IDENTIFIER.type:
				return this.#identifier();

			default:
				return '*';
		}
	}


	// ==========================
	// MARK: - Definition Methods
	// ==========================

	/**
	 * [07] Definition      ::=  Const | Typedef | Enum | Struct | Union | Exception | Service
	 *
	 * @returns {Definition?}
	 */
	#definition() {
		const token = this.#peek();

		switch (token.type) {
			case TOKEN.CONST.type:
				const constType = this.#const();
				return {
					type: TOKEN.ENUM.type,
					name: constType.identifier,
					definition: constType
				};

			case TOKEN.TYPEDEF.type:
				const typedef = this.#typedef();
				return {
					type: TOKEN.TYPEDEF.type,
					name: typedef.identifier,
					definition: typedef
				};

			case TOKEN.ENUM.type:
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

			case TOKEN.LEFT_PAREN.type:
				this.#oddParens();
				return null;

			default:
				console.error(`Token ${token.type} not supported!`);
				throw this.#error(token.type, `Definition token ${token.type} not supported!`);
		}
	}

	/**
	 * [08] Const           ::=  'const' FieldType Identifier '=' ConstValue ListSeparator?
	 *
	 * @returns {Const}
	 */
	#const() {
		this.#consume(TOKEN.CONST, "Incorrect const definition");

		const type = this.#fieldType();
		const identifier = this.#identifier();

		this.#consume(TOKEN.EQUAL, "Incorrect const definition, expected equals sign");

		const value = this.#constValue();

		// Swallow list separator
		this.#listSeparator();

		return {
			type,
			identifier,
			value
		};
	}

	/**
	 * [09] Typedef         ::=  'typedef' DefinitionType Identifier
	 *
	 * @returns {Typedef}
	 */
	#typedef() {
		this.#consume(TOKEN.TYPEDEF, "Incorrect typedef definition");

		const definitionType = this.#definitionType();
		const identifier = this.#identifier();

		return {
			definitionType,
			identifier
		};
	}

	/**
	 * [10] Enum            ::=  'enum' Identifier '{' (Identifier ('=' IntConstant)? ListSeparator?)* '}'
	 *
	 * @returns {EnumType}
	 */
	#enum() {
		this.#consume(TOKEN.ENUM, "Incorrect enum definition");
		const identifier = this.#identifier();

		/** @type {Object.<string, IntConstant>} */
		const enumerators = {};
		let value = 0;

		this.#consume(TOKEN.LEFT_BRACE, "[#enum] Expected opening brace");

		while (this.#peek().type !== TOKEN.RIGHT_BRACE.type) {
			const enumerator = this.#identifier();
			
			if (this.#peek().type === TOKEN.EQUAL.type) {
				// Swallow equals sign
				this.#advance();

				value = this.#intConstant();
			} else {
				value++;
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
	 * [11] Struct          ::=  'struct' Identifier 'xsd_all'? '{' Field* '}'
	 *
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
	 * [12] Union          ::=  'union' Identifier 'xsd_all'? '{' Field* '}'
	 *
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
	 * [13] Exception       ::=  'exception' Identifier '{' Field* '}'
	 *
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
	 * [14] Service         ::=  'service' Identifier ( 'extends' Identifier )? '{' Function* '}'
	 *
	 * @returns {Service}
	 */
	#service() {
		this.#consume(TOKEN.SERVICE, "Incorrect service definition");
		const identifier = this.#identifier();
		let extending = null;

		if (this.#peek().type === TOKEN.IDENTIFIER.type) {
			extending = this.#identifier();
		}

		const functions = this.#functions();

		return {
			identifier,
			extending,
			functions
		};
	}


	// ==========================
	// MARK: - Function Methods
	// ==========================

	#functions() {
		/** @type {Object.<string, ThriftFunction>} */
		const functions = {};

		this.#consume(TOKEN.LEFT_BRACE, "[#function] Expected opening brace");

		while (this.#peek().type !== TOKEN.RIGHT_BRACE.type) {
			const func = this.#function();
			functions[func.identifier] = func;
		}

		this.#consume(TOKEN.RIGHT_BRACE, "[#function] Expected closing brace");

		return functions;
	}

	/**
	 * [20] Function        ::=  'oneway'? FunctionType Identifier '(' Field* ')' Throws? ListSeparator?
	 *
	 * @returns {ThriftFunction}
	 */
	#function() {
		const oneway = this.#oneway();
		const functionType = this.#functionType();
		const identifier = this.#identifier();
		const fields = this.#fields(TOKEN.LEFT_PAREN, TOKEN.RIGHT_PAREN);
		const throws = this.#throws();

		// Swallow list separator
		this.#listSeparator();

		return {
			oneway: oneway,
			identifier,
			returns: functionType,
			fields: fields,
			throws: throws
		};
	}

	/**
	 * @returns {string?}
	 */
	#oneway() {
		if (this.#peek().type === TOKEN.ONEWAY.type) {
			return this.#advance().text ?? null;
		}

		return null;
	}

	/**
	 * @returns {Field[]?}
	 */
	#throws() {
		if (this.#peek()?.type === TOKEN.THROWS.type) {
			this.#consume(TOKEN.THROWS, "Incorrect throws definition");
			return this.#fields(TOKEN.LEFT_PAREN, TOKEN.RIGHT_PAREN);
		}
		return [];
	}


	// ==========================
	// MARK: - Field Methods
	// ==========================

	/**
	 * @param {import("./Tokens.js").tokenType} left
	 * @param {import("./Tokens.js").tokenType} right
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
	 * [15] Field           ::=  FieldID? FieldReq? FieldType Identifier ('=' ConstValue)? XsdFieldOptions ListSeparator?
	 *
	 * @returns {Field}
	 */
	#field() {
		const id = this.#fieldId();
		const requiredness = this.#fieldReq();
		const type = this.#fieldType();
		const identifier = this.#identifier();
		let value = null;

		if (this.#peek().type === TOKEN.EQUAL.type) {
			// Swallow equals sign
			this.#advance();
			value = this.#constValue();
		}

		// Swallow list separator
		this.#listSeparator();

		return {
			id: id?.literal,
			requiredness: (requiredness) ? requiredness.text : null,
			type: type,
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
	// MARK: - Types
	// ==========================

	/**
	 * [21] FunctionType    ::=  FieldType | 'void'
	 *
	 * @returns {FunctionType}
	 */
	#functionType() {
		if (this.#peek().type === TOKEN.VOID.type) {
			return this.#advance().type;
		}

		return this.#fieldType();
	}

	/**
	 * [23] FieldType       ::=  Identifier | BaseType | ContainerType
	 *
	 * @returns {FieldType}
	 */
	#fieldType() {
		const baseType = this.#baseType();
		if (baseType !== null) {
			return baseType;
		}

		const containerType = this.#containerType();
		if (containerType !== null) {
			return containerType;
		}

		const identifier = this.#identifier();
		if (identifier !== null) {
			return identifier;
		}

		const token = this.#peek();

		throw this.#error(token.type, `Expected FieldType Token, found ${token.type}!`);
	}

	/**
	 * [24] DefinitionType  ::=  BaseType | ContainerType
	 *
	 * @returns {DefinitionType}
	 */
	#definitionType() {
		const baseType = this.#baseType();
		if (baseType !== null) {
			return baseType;
		}

		const containerType = this.#containerType();
		if (containerType !== null) {
			return containerType;
		}

		const token = this.#peek();

		throw this.#error(token.type, `Expected DefinitionType Token, found ${token.type}!`);
	}

	/**
	 * [25] BaseType        ::=  'bool' | 'byte' | 'i8' | 'i16' | 'i32' | 'i64' | 'double' | 'string' | 'binary' | 'uuid'
	 *
	 * @returns {BaseType?}
	 */
	#baseType() {
		const token = this.#peek();

		switch (token.type) {
			case TOKEN.BOOL.type:
			case TOKEN.BYTE.type:
			case TOKEN.I8.type:
			case TOKEN.I16.type:
			case TOKEN.I32.type:
			case TOKEN.I64.type:
			case TOKEN.DOUBLE.type:
			case TOKEN.STRING.type:
			case TOKEN.BINARY.type:
			case TOKEN.UUID.type:
				return this.#advance().type;

			default:
				return null;
		}
	}

	/**
	 * [26] ContainerType   ::=  MapType | SetType | ListType
	 *
	 * @returns {ContainerType?}
	 */
	#containerType() {
		const mapType = this.#mapType();
		if (mapType !== null) {
			this.#oddParens(); // NOTE: Take care of odd parentheses
			return mapType;
		}

		const setType = this.#setType();
		if (setType !== null) {
			this.#oddParens(); // NOTE: Take care of odd parentheses
			return setType;
		}

		const listType = this.#listType();
		if (listType !== null) {
			this.#oddParens(); // NOTE: Take care of odd parentheses
			return listType;
		}

		return null;
	}

	/**
	 * [27] MapType         ::=  'map' CppType? '<' FieldType ',' FieldType '>'
	 *
	 * @returns {MapType?}
	 */
	#mapType() {
		if (!this.#match(TOKEN.MAP)) {
			return null;
		}

		if (!this.#match(TOKEN.LEFT_ANGLE_BRACE)) {
			throw this.#error(this.#peek().type, `Expected Opening < Token, found ${this.#peek().type}!`);
		}

		const keyType = this.#fieldType();

		if (!this.#match(TOKEN.COMMA)) {
			throw this.#error(this.#peek().type, `Expected Comma Token, found ${this.#peek().type}!`);
		}

		const valueType = this.#fieldType();

		if (!this.#match(TOKEN.RIGHT_ANGLE_BRACE)) {
			throw this.#error(this.#peek().type, `Expected Closing > Token, found ${this.#peek().type}!`);
		}

		return {
			keyType,
			valueType
		};
	}

	/**
	 * [28] SetType         ::=  'set' CppType? '<' FieldType '>'
	 *
	 * @returns {SetType?}
	 */
	#setType() {
		if (!this.#match(TOKEN.SET)) {
			return null;
		}

		if (!this.#match(TOKEN.LEFT_ANGLE_BRACE)) {
			throw this.#error(this.#peek().type, `Expected Opening < Token, found ${this.#peek().type}!`);
		}

		const valueType = this.#fieldType();

		if (!this.#match(TOKEN.RIGHT_ANGLE_BRACE)) {
			throw this.#error(this.#peek().type, `Expected Closing > Token, found ${this.#peek().type}!`);
		}

		return {
			valueType
		};
	}

	/**
	 * [29] ListType        ::=  'list' CppType? '<' FieldType '>'
	 *
	 * @returns {ListType?}
	 */
	#listType() {
		if (!(this.#match(TOKEN.LIST))) {
			return null;
		}

		if (!(this.#match(TOKEN.LEFT_ANGLE_BRACE))) {
			throw this.#error(this.#peek().type, `Expected Opening < Token, found ${this.#peek().type}!`);
		}

		const valueType = this.#fieldType();

		if (!this.#match(TOKEN.RIGHT_ANGLE_BRACE)) {
			throw this.#error(this.#peek().type, `Expected Closing > Token, found ${this.#peek().type}!`);
		}

		return {
			valueType
		};
	}


	// ==========================
	// MARK: - Constant Values
	// ==========================

	/**
	 * [31] ConstValue      ::=  IntConstant | DoubleConstant | Literal | Identifier | ConstList | ConstMap
	 *
	 * @returns {ConstValue}
	 */
	#constValue() {
		const token = this.#peek();

		switch (token.type) {
			case TOKEN.LEFT_BRACKET.type:
				return this.#constList();
			
			case TOKEN.LEFT_BRACE.type:
				return this.#constMap();

			case TOKEN.DASH.type:
			case TOKEN.PLUS.type:
			case TOKEN.NUMBER.type:
			case TOKEN.DOT.type:
				return this.#doubleConstant();

			case TOKEN.LITERAL.type:
				return this.#advance();

			case TOKEN.IDENTIFIER.type:
				return this.#identifier();
		}

		throw this.#error(token.type, `Expected constValue Token, found ${token.type}!`);
	}

	/**
	 * [32] IntConstant     ::=  ('+' | '-')? Digit+
	 *
	 * @returns {IntConstant}
	 */
	#intConstant() {
		if (this.#peek().type !== TOKEN.NUMBER.type && (this.#peekNext()?.type !== TOKEN.NUMBER.type)) {
			throw this.#error(this.#peek().type, `Expected Number Token, found ${this.#peek().type}!`);
		}

		let sign = 1;

		if (this.#peek().type === TOKEN.DASH.type) {
			// Swallow sign
			this.#advance()
			sign = -1;
		} else if (this.#peek().type === TOKEN.PLUS.type) {
			// Swallow sign
			this.#advance()
		}

		return sign * +this.#advance().text;
	}

	/**
	 * [33] DoubleConstant  ::=  ('+' | '-')? Digit* ('.' Digit+)? ( ('E' | 'e') IntConstant )?
	 *
	 * @returns {DoubleConstant}
	 */
	#doubleConstant() {
		if (this.#peek().type !== TOKEN.NUMBER.type && (this.#peekNext()?.type !== TOKEN.NUMBER.type)) {
			// NOTE: Heavily relying on this value not being something like `-e5` or something crazy like this...
			throw this.#error(this.#peek().type, `Expected Number Token, found ${this.#peek().type}!`);
		}

		let sign = 1;

		if (this.#peek().type === TOKEN.DASH.type) {
			// Swallow sign
			this.#advance()
			sign = -1;
		} else if (this.#peek().type === TOKEN.PLUS.type) {
			// Swallow sign
			this.#advance()
		}

		let whole = 0;
		let decimal = 0;
		let exp = 0;

		// Grab integer part
		if (this.#peek().type === TOKEN.NUMBER.type) {
			whole = +this.#advance().text;
		}

		// Grab decimal part
		if (this.#peek().type === TOKEN.DOT.type) {
			// Swallow dot
			this.#advance();

			if (this.#peek().type === TOKEN.NUMBER.type) {
				decimal = +this.#advance().text;
			}
		}

		// Grab exponent part
		if (this.#peek().type === TOKEN.IDENTIFIER.type) {
			if (this.#peek().text.toLowerCase() === "e") {
				// Swallow exponent symbol
				this.#advance();

				if (this.#peek().type === TOKEN.NUMBER.type) {
					exp = +this.#advance().text;
				}
			}
		}

		return Number(`${sign * whole}.${decimal}e${exp}`);
	}

	/**
	 * [34] ConstList       ::=  '[' (ConstValue ListSeparator?)* ']'
	 *
	 * @returns {ConstList?}
	 */
	#constList() {
		/** @type {ConstValue[]} */
		const constValues = [];

		this.#consume(TOKEN.LEFT_BRACKET, "[#constList] Expected opening brace");

		while (this.#peek().type !== TOKEN.RIGHT_BRACKET.type) {
			constValues.push(this.#constValue());

			// Swallow list separator
			this.#listSeparator();
		}

		this.#consume(TOKEN.RIGHT_BRACKET, "[#constList] Expected closing brace");

		return constValues;
	}

	/**
	 * [35] ConstMap        ::=  '{' (ConstValue ':' ConstValue ListSeparator?)* '}'
	 *
	 * @returns {ConstMap?}
	 */
	#constMap() {
		/** @type {ConstMap} */
		const constMapValues = {};

		this.#consume(TOKEN.LEFT_BRACE, "[#constMap] Expected opening brace");

		while (this.#peek().type !== TOKEN.RIGHT_BRACE.type) {
			const key = this.#constValue();

			this.#consume(TOKEN.COLON, "[#constMap] Expected key-value colon separator");

			const value = this.#constValue();

			constMapValues[key.text] = value;

			// Swallow list separator
			this.#listSeparator();
		}

		this.#consume(TOKEN.RIGHT_BRACE, "[#constMap] Expected closing brace");

		return constMapValues;
	}

	#listSeparator() {
		if (this.#match(TOKEN.COMMA, TOKEN.SEMICOLON)) {
			return this.#previous();
		}

		return null;
	}


	// ==========================
	// MARK: - Basic Definitions
	// ==========================

	/**
	 * [37] Identifier      ::=  ( Letter | '_' ) ( Letter | Digit | '.' | '_' )*
	 *
	 * @returns {Identifier}
	 */
	#identifier() {
		let text = "";

		while (this.#peek().type === TOKEN.IDENTIFIER.type || this.#peek().type === TOKEN.DOT.type) {
			text += this.#advance().text;
		}

		return text;
	}

	// ==========================
	// MARK: - Helper Methods
	// ==========================

	// NOTE: For whatever reason, some Thrift examples are including some parenthesized items that are not documented in the IDL we're using as reference.
	// Let's ignore them for the time being.
	// These items look as follows: `(python.immutable = "")`
	#oddParens() {
		if (this.#peek().type !== TOKEN.LEFT_PAREN.type) {
			return;
		}

		let start = this.#current;
		let text = "";

		while (this.#peek().type !== TOKEN.RIGHT_PAREN.type) {
			text += this.#advance().text;
		}

		// Append closing parentheses
		text += this.#advance().text;

		console.warn(`WARNING: Extraneous parentheses has been found near token ${start}! Contents: >${text}<. These will be ignored for now.`);
	}

	/**
	 * @param {import("./Tokens.js").tokenType[]} tokens
	 */
	#match(...tokens) {

		const matches = tokens
							.filter(token => this.#check(token.type));

		if (matches.length === 0) {
			return false;
		}

		this.#advance();
		return true;
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
	 * @param {import("./Tokens.js").tokenType} type
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
		console.table(this.#tokens.slice(0, this.#current + 1));
		throw new Error(`Unexpected token (${this.#current}): ${type}. ${message}`);
	}

	#isAtEnd() {
		return this.#peek().type == TOKEN.EOF.type;
	}
};

