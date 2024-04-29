import { get } from "svelte/store";
import { thisService } from "../../../stores.js";
import { THRIFT } from "../Types.js";

/**
 * @param {string} method
 * @returns {import("$lib/Thrift/IDL/Lexer/Parser.js").ThriftFunction?}
 */
export function getSignature(method) {
	const svc = get(thisService);

	if (!svc) {
		return null;
	}

	return svc.functions[method];
}

/**
 * @param {import("$lib/Thrift/IDL/Lexer/Parser.js").ThriftFunction} signature
 * @param {number} messageType
 * @returns {import("$lib/Thrift/IDL/Lexer/Parser.js").Field[]}
 */
export function getThriftObjectForSignature(signature, messageType) {
	switch (messageType) {
		case THRIFT.MESSAGE.REQUEST:
			return signature.fields ?? [];

			// TODO: Show fields for response-type objects!
		case THRIFT.MESSAGE.RESPONSE:
				// Add return object with id of 0
			const returns = signature.returns;

			/** @type {import("$lib/Thrift/IDL/Lexer/Parser.js").Field[]} */
			let f = [{ id: 0, requiredness: null, type: returns ?? "UNDEFINED?", identifier: "RESPONSE", value: null }];

			// Add fields found in throws section of signature
			if (signature.throws) {
				f.push(...signature.throws);
			}
			return f;
	}

	return [];
}

/**
 * @param {string} method
 * @param {number} messageType
 * @returns {import("$lib/Thrift/IDL/Lexer/Parser.js").Field[]}
 */
export function getThriftObjectForMethod(method, messageType) {
	const signature = getSignature(method);

	if (!signature) { return []; }

	return getThriftObjectForSignature(signature, messageType);
}

// TODO: Could this method benefit from derived stores...?
/**
	* @returns {import("$lib/Thrift/IDL/Lexer/Parser.js").Field}
 */
export function getField() {
}

