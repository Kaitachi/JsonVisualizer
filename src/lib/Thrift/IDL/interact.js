import { get } from "svelte/store";
import { service } from "./stores.js";
import { THRIFT } from "../Types.js";

/**
 * @param {string} method
 * @param {number} messageType
 * @returns {import("$lib/Thrift/IDL/Lexer/Parser.js").Field[]}
 */
export function getThriftObjectForMethod(method, messageType) {
	const signature = get(service)?.functions[method];

	if (!signature) { return []; }

	switch (messageType) {
		case THRIFT.MESSAGE.REQUEST:
			return signature.fields ?? [];

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

