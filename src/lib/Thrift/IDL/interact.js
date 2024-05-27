import { get } from "svelte/store";
import { THRIFT } from "../Types.js";
import { document, service } from "./stores.js";


/**
 * @param {string?} name
 * @param {number?} messageType
 * @returns {import("@creditkarma/thrift-parser").FieldDefinition[]}
 */
export function getThriftStruct(name, messageType = null) {
	if (!name) {
		return [];
	}

	if (messageType) {
		return getFieldsFromService(name, messageType);
	} else {
		return getFieldsFromStruct(name);
	}
}


/**
 * @param {string} methodName
 * @param {number} messageType
 * @returns {import("@creditkarma/thrift-parser").FieldDefinition[]}
 */
function getFieldsFromService(methodName, messageType) {
	let currentService = get(service);

	if (!currentService) {
		return [];
	}

	let signature = currentService.functions.find(svc => svc.name.value === methodName);
	console.warn(`>>> getFieldsFromService(${methodName}, ${messageType}) signature: ${JSON.stringify(signature)}`);

	if (!signature) {
		return [];
	}

	switch (messageType) {
		case THRIFT.MESSAGE.REQUEST:
		default:
			return signature.fields;

		case THRIFT.MESSAGE.RESPONSE:
			let returns = signature.returnType;

			// TODO: Return fields from response type!
			return [];
	}
}

/**
 * @param {string} structName
 * @returns {import("@creditkarma/thrift-parser").FieldDefinition[]}
 */
function getFieldsFromStruct(structName) {
	let currentDocument = get(document);

	if (!currentDocument) {
		return [];
	}

	let struct = /** @type {import("@creditkarma/thrift-parser").StructDefinition} */ (currentDocument.body
		.find(item => item.type === "StructDefinition" && item.name.value.toLowerCase() === structName.toLowerCase()));

	if (!struct) {
		return [];
	}

	return struct.fields;
}




