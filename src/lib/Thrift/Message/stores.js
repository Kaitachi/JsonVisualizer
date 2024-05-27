import { derived } from "svelte/store";
import { json } from "../../../stores.js";
import { validate } from "$lib/Thrift/Message/validator.js";
import { THRIFT } from "../Types.js";

/** @type {import("svelte/store").Readable<string?>} */
export const method = derived(json, ($json) => {
	try {
		let jsonObject = validate($json);

		return /** @type {string} */ (jsonObject[THRIFT.FIELDS.ENDPOINT]);
	} catch (/** @type {any} */ error) {
		return null;
	}
});

