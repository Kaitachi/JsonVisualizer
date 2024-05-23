import { THRIFT } from "../Types.js";

/**
 * @param {import("$lib/Thrift/IDL/Lexer/Parser.js").Service?} service
 * @param {string?} method
 * @param {number?} messageType
 * @returns {import("$lib/Thrift/IDL/Lexer/Parser.js").Field[]}
 */
export function getThriftStructForMethod(service, method, messageType) {
	if (!method || !messageType) {
		return [];
	}

	const signature = service?.functions[method];

	if (!signature) { return []; }

	switch (messageType) {
		case THRIFT.MESSAGE.REQUEST:
			return signature.fields ?? [];

		case THRIFT.MESSAGE.RESPONSE:
			// Add return object with id of 0
			const returns = signature.returns ?? "UNDEFINED?";

			/** @type {import("$lib/Thrift/IDL/Lexer/Parser.js").Field[]} */
			let f = [{ id: 0, requiredness: null, type: returns, identifier: `response for ${method} method`, value: null }];

			// Add fields found in throws section of signature
			if (signature.throws) {
				f.push(...signature.throws);
			}

			return f;
	}

	return [];
}

/**
 * @param {import("$lib/Thrift/IDL/Lexer/Parser.js").Document?} document
 * @param {string?} name
 * @returns {import("$lib/Thrift/IDL/Lexer/Parser.js").Field[]}
 */
export function getThriftStruct(document, name) {
	if (!name) {
		return [];
	}

	// FIXME: Validate this object is a Struct, perhaps?
	return document?.definitions[name]?.definition?.fields;
}

