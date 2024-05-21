import { json } from "../../../stores.js";
import { source } from "./stores.js";
import debug_list from "./samples/payloads.json";
import debug_source from "./samples/sample.thrift?raw";


export const debug_file = "DocTest.thrift";
export const debug_sample = "sample_17";
export const debug_type = "request";


export function enableDebug() {
	console.warn(`Loading from debug...`);

	source.set(debug_source);

	const debug_obj = debug_list
		.find(file => file.file == debug_file)?.samples
		.find(sample => sample.name.includes(debug_sample));

	if (!debug_obj) { return; }

	json.set(JSON.stringify(debug_obj[debug_type]));
}

