/**
	* @typedef {Object} token
	* @property {string} type
	* @property {string} text
	* @property {any} [literal]
	*/

/** @type {Object.<string, {type: string}>} */
export const TOKEN = {
	// Single-character tokens
	LEFT_PAREN: {type: "LEFT_PAREN"},
	RIGHT_PAREN: {type: "RIGHT_PAREN"},
	LEFT_BRACE: {type: "LEFT_BRACE"},
	RIGHT_BRACE: {type: "RIGHT_BRACE"},
	COMMA: {type: "COMMA"},
	SEMICOLON: {type: "SEMICOLON"},
	DOT: {type: "DOT"},
	COLON: {type: "COLON"},

	// One or two-character tokens
	EQUAL: {type: "EQUAL"},
	SLASH_SLASH: {type: "SLASH_SLASH"},
	SLASH_STAR: {type: "SLASH_STAR"},
	STAR_SLASH: {type: "STAR_SLASH"},

	// Literals
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
	DOUBLE: {type: "DOUBLE"},
	I16: {type: "I16"},
	I32: {type: "I32"},
	I64: {type: "I64"},
	STRING: {type: "STRING"},
	VOID: {type: "VOID"},

	EOF: {type: "EOF"}
};

