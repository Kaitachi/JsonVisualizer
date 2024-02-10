import { THRIFT } from '$components/json-visualizer/Thrift/Types';

export function update(payload, update) {
	let inputObject = THRIFT.VALIDATE_THRIFT_MESSAGE(payload);

	if (!THRIFT.DATA_TYPES[update.type] || !THRIFT.DATA_TYPES[update.type].is_unquoted) {
		update.value = `"${update.value}"`;
	}

	let replace = `${update.path.replace("$", "inputObject")} = ${update.value}`;
	eval(replace);

	return JSON.stringify(inputObject);
}

