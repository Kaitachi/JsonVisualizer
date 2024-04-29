// TODO: Don't really enjoy the place nor the contents of this file... =/

import { THRIFT } from './Types.js';

	/**
	 * Updates payload with given change details
	 * @param {string} payload - Payload to be updated
	 * @param {{type: string, value: string, path: string}} delta - Change to be performed on payload
	 */
export function update(payload, delta) {
	let inputObject = THRIFT.VALIDATE_THRIFT_MESSAGE(payload);

	if (!THRIFT.DATA_TYPES[delta.type] || !THRIFT.DATA_TYPES[delta.type].is_unquoted) {
		delta.value = `"${delta.value}"`;
	}

	let replace = `${delta.path.replace("$", "inputObject")} = ${delta.value}`;
	eval(replace);

	return JSON.stringify(inputObject);
}

