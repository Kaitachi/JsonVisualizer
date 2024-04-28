/**
	* @typedef {Object} token
	* @property {string} type
	* @property {string?} [text]
	* @property {(string|number)?} [literal]
	*/

/**
	* @typedef {Object} tokenType
	* @property {string} type
	*/

/** @type {Object.<string, tokenType>} */
export const TOKEN = {
	// Single-character tokens
	LEFT_PAREN: {type: "LEFT_PAREN"},
	RIGHT_PAREN: {type: "RIGHT_PAREN"},
	LEFT_BRACKET: {type: "LEFT_BRACKET"},
	RIGHT_BRACKET: {type: "RIGHT_BRACKET"},
	LEFT_BRACE: {type: "LEFT_BRACE"},
	RIGHT_BRACE: {type: "RIGHT_BRACE"},
	LEFT_ANGLE_BRACE: {type: "LEFT_ANGLE_BRACE"},
	RIGHT_ANGLE_BRACE: {type: "RIGHT_ANGLE_BRACE"},
	COMMA: {type: "COMMA"},
	SEMICOLON: {type: "SEMICOLON"},
	DOT: {type: "DOT"},
	COLON: {type: "COLON"},
	PLUS: {type: "PLUS"},
	DASH: {type: "DASH"},
	STAR: {type: "STAR"},
	SINGLE_QUOTE: {type: "SINGLE_QUOTE"},
	DOUBLE_QUOTE: {type: "DOUBLE_QUOTE"},

	// One or two-character tokens
	EQUAL: {type: "EQUAL"},
	SLASH_SLASH: {type: "SLASH_SLASH"},
	SLASH_STAR: {type: "SLASH_STAR"},
	STAR_SLASH: {type: "STAR_SLASH"},

	// Literals
	LITERAL: {type: "LITERAL"},
	IDENTIFIER: {type: "IDENTIFIER"},
	NUMBER: {type: "NUMBER"},

	// Keywords
	CONST: {type: "CONST"},
	CPP_INCLUDE: {type: "CPP_INCLUDE"},
	ENUM: {type: "ENUM"},
	EXCEPTION: {type: "EXCEPTION"},
	EXTENDS: {type: "EXTENDS"},
	INCLUDE: {type: "INCLUDE"},
	NAMESPACE: {type: "NAMESPACE"},
	ONEWAY: {type: "ONEWAY"},
	OPTIONAL: {type: "OPTIONAL"},
	REQUIRED: {type: "REQUIRED"},
	SERVICE: {type: "SERVICE"},
	STRUCT: {type: "STRUCT"},
	THROWS: {type: "THROWS"},
	TYPEDEF: {type: "TYPEDEF"},
	UNION: {type: "UNION"},

	// Containers
	LIST: {type: "LIST"},
	MAP: {type: "MAP"},
	SET: {type: "SET"},

	// Base types
	BOOL: {type: "BOOL"},
	BYTE: {type: "BYTE"},
	I8: {type: "I8"},
	I16: {type: "I16"},
	I32: {type: "I32"},
	I64: {type: "I64"},
	DOUBLE: {type: "DOUBLE"},
	STRING: {type: "STRING"},
	BINARY: {type: "BINARY"},
	UUID: {type: "UUID"},
	VOID: {type: "VOID"},

	EOF: {type: "EOF"}
};

