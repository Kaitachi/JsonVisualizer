// TODO: Don't really enjoy the place nor the contents of this file... =/

import { validate } from './Message/validator.js';
import { THRIFT } from './Types.js';

	/**
	 * Updates json with given change details
	 * @param {string} json - json to be updated
	 * @param {{type: string, value: string, path: string}} delta - Change to be performed on json
	 */
export function update(json, delta) {
	let inputObject = validate(json);

	if (!THRIFT.DATA_TYPES[delta.type] || !THRIFT.DATA_TYPES[delta.type].is_unquoted) {
		delta.value = `"${delta.value}"`;
	}

	let replace = `${delta.path.replace("$", "inputObject")} = ${delta.value}`;
	eval(replace);

	return JSON.stringify(inputObject);
}

