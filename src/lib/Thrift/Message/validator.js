/**
 * @param {string} json
 * @returns {import("../Types").ThriftMessage}
 */
export function validate(json) {
	/** @type {import("../Types").ThriftMessage} */
	let message = [];

	try {
		let msg = JSON.parse(json);

		if (!Array.isArray(msg)) {
			throw new Error("Input data is not an array!");
		}

		if (msg.length !== 5) {
			throw new Error("Input array does not contain expected five elements!");
		}

		if (!Number.isInteger(msg[0])) {
			throw new Error("Input array element [0] is not an Integer!");
		}

		if (typeof msg[1] !== "string") {
			throw new Error("Input array element [1] is not a String!");
		}

		if (!Number.isInteger(msg[2])) {
			throw new Error("Input array element [2] is not an Integer!");
		}

		if (!Number.isInteger(msg[3])) {
			throw new Error("Input array element [3] is not an Integer!");
		}

		if (typeof msg[4] !== "object") {
			throw new Error("Input array element [4] is not an Object!");
		}

		validatePayload(msg[4]);

		console.info("Valid JSON string!");

		message = msg;
	} catch (e) {
		console.error(e);
		throw e;
	}

	return message;
}

/**
 * @param {any} payload
 */
// NOTE: Expecting to receive indexed objects
function validatePayload(payload, type = "rec", path = "$[4]") {
	VALIDATE[type] && VALIDATE[type](payload, path);
}


const debug_validations = false;


/** @type {Object.<string, function>} */
const VALIDATE = {
	"tf" : (/** @type {number} */ payload, /** @type {string} */ path) => {
		// NOTE: Booleans should be just a single primitive Boolean type
		debug_validations && console.warn(`~~> VALIDATE.tf(${path}): payload ${JSON.stringify(payload)}`);

		if (typeof payload !== "number" && [0, 1].includes(payload)) {
			throw new Error(`Unexpected item! Expected 0/1. Received ${typeof payload}. JSONPath: ${path}`);
		}
	},
	"i8": (/** @type {number} */ payload, /** @type {string} */ path) => {
		// NOTE: Bytes should be just a single primitive Number type
		debug_validations && console.warn(`~~> VALIDATE.i8(${path}): payload ${JSON.stringify(payload)}`);

		if (typeof payload !== "number") {
			throw new Error(`Unexpected item! Expected number. Received ${typeof payload}. JSONPath: ${path}`);
		}
	},
	"i16": (/** @type {number} */ payload, /** @type {string} */ path) => {
		// NOTE: Shorts should be just a single primitive Number type
		debug_validations && console.warn(`~~> VALIDATE.i16(${path}): payload ${JSON.stringify(payload)}`);

		if (typeof payload !== "number") {
			throw new Error(`Unexpected item! Expected number. Received ${typeof payload}. JSONPath: ${path}`);
		}
	},
	"i32": (/** @type {number} */ payload, /** @type {string} */ path) => {
		// NOTE: Integers should be just a single primitive Number type
		debug_validations && console.warn(`~~> VALIDATE.i32(${path}): payload ${JSON.stringify(payload)}`);

		if (typeof payload !== "number") {
			throw new Error(`Unexpected item! Expected number. Received ${typeof payload}. JSONPath: ${path}`);
		}
	},
	"i64": (/** @type {number} */ payload, /** @type {string} */ path) => {
		// NOTE: Longs should be just a single primitive Number type
		debug_validations && console.warn(`~~> VALIDATE.i64(${path}): payload ${JSON.stringify(payload)}`);

		if (typeof payload !== "number") {
			throw new Error(`Unexpected item! Expected number. Received ${typeof payload}. JSONPath: ${path}`);
		}
	},
	"dbl": (/** @type {number} */ payload, /** @type {string} */ path) => {
		// NOTE: Doubles should be just a single primitive Number type
		debug_validations && console.warn(`~~> VALIDATE.dbl(${path}): payload ${JSON.stringify(payload)}`);

		if (typeof payload !== "number") {
			throw new Error(`Unexpected item! Expected number. Received ${typeof payload}. JSONPath: ${path}`);
		}
	},
	"str": (/** @type {string} */ payload, /** @type {string} */ path) => {
		// NOTE: Strings should be just a single primitive String type
		debug_validations && console.warn(`~~> VALIDATE.str(${path}): payload ${JSON.stringify(payload)}`);

		if (typeof payload !== "string") {
			throw new Error(`Unexpected item! Expected string. Received ${typeof payload}. JSONPath: ${path}`);
		}
	},
	"rec": (/** @type {Object} */ payload, /** @type {string} */ path) => {
		// NOTE: Records should be comprised of a single Object, with numeric indices and Object values
		debug_validations && console.warn(`~~> VALIDATE.rec(${path}): payload ${JSON.stringify(payload)}`);

		if (typeof payload !== "object" || Array.isArray(payload)) {
			throw new Error(`Unexpected item! Expected object (non-array). Received ${typeof payload} (isArray? ${Array.isArray(payload)}). JSONPath: ${path}`);
		}

		for (const [index, obj] of Object.entries(payload)) {

			if (typeof index !== "string") {
				throw new Error(`Unexpected key of type ${typeof index}! Expected string key. JSONPath: ${path}`);
			}

			if (typeof obj !== "object" || Array.isArray(obj)) {
				throw new Error(`Unexpected value! Expected object (non-array). Received ${typeof obj} (isArray? ${Array.isArray(obj)}). JSONPath: ${path}[${index}]`);
			}

			if (Object.entries(obj).length !== 1) {
				throw new Error(`Unexpected empty object! JSONPath: ${path}[${index}]`);
			}

			for (const [t, value] of Object.entries(obj)) {
				validatePayload(value, t, `${path}[${index}]['${t}']`);
			}
		}
	},
	"lst": (/** @type {any[]} */ payload, /** @type {string} */ path) => {
		// NOTE: Lists should be comprised of an array of objects, with at least two items
		debug_validations && console.warn(`~~> VALIDATE.lst(${path}): payload ${JSON.stringify(payload)}`);

		if (typeof payload !== "object" && !Array.isArray(payload)) {
			throw new Error(`Unexpected item! Expected object (array). Received ${typeof payload} (isArray? ${Array.isArray(payload)}). JSONPath: ${path}`);
		}

		if (payload.length < 2) {
			throw new Error(`Unexpected array length! Expected at least two items. Received ${payload.length}. JSONPath: ${path}`);
		}

		if (typeof payload[0] !== "string") {
			throw new Error(`Unexpected array contents! Expected string on first position. Received ${typeof payload[0]}. JSONPath: ${path}[0]`);
		}

		if (typeof payload[1] !== "number") {
			throw new Error(`Unexpected array contents! Expected number on second position. Received ${typeof payload[1]}. JSONPath: ${path}[1]`);
		}

		for (const elem of Object.entries(payload.slice(2))) {
			validatePayload(elem[1], payload[0], `${path}[${+elem[0]+2}]`);
		}
	},
	"map": (/** @type {any[]} */ payload, /** @type {string} */ path) => {
		// NOTE: Maps should be comprised of an array of objects, with at least three items
		debug_validations && console.warn(`~~> VALIDATE.map(${path}): payload ${JSON.stringify(payload)}`);

		if (typeof payload !== "object" && !Array.isArray(payload)) {
			throw new Error(`Unexpected item! Expected object (array). Received ${typeof payload} (isArray? ${Array.isArray(payload)}). JSONPath: ${path}`);
		}

		if (payload.length < 3) {
			throw new Error(`Unexpected array length! Expected at least three items. Received ${payload.length}. JSONPath: ${path}`);
		}

		if (typeof payload[0] !== "string") {
			throw new Error(`Unexpected array contents! Expected string on first position. Received ${typeof payload[0]}. JSONPath: ${path}[0]`);
		}

		if (typeof payload[1] !== "string") {
			throw new Error(`Unexpected array contents! Expected string on second position. Received ${typeof payload[1]}. JSONPath: ${path}[1]`);
		}

		if (typeof payload[2] !== "number") {
			throw new Error(`Unexpected array contents! Expected number on third position. Received ${typeof payload[2]}. JSONPath: ${path}[2]`);
		}

		// TODO: Maps behave slightly different structurally...
		// for (const elem of Object.entries(payload.slice(3))) {
		// 	// validatePayload(elem[1], payload[0], `${path}[${+elem[0]+2}]`);
		// }
	},
	"set": (/** @type {any[]} */ payload, /** @type {string} */ path) => {
		// NOTE: Sets should be comprised of an array of objects, with at least two items
		debug_validations && console.warn(`~~> VALIDATE.set(${path}): payload ${JSON.stringify(payload)}`);

		if (typeof payload !== "object" && !Array.isArray(payload)) {
			throw new Error(`Unexpected item! Expected object (array). Received ${typeof payload} (isArray? ${Array.isArray(payload)}). JSONPath: ${path}`);
		}

		if (payload.length < 2) {
			throw new Error(`Unexpected array length! Expected at least two items. Received ${payload.length}. JSONPath: ${path}`);
		}

		if (typeof payload[0] !== "string") {
			throw new Error(`Unexpected array contents! Expected string on first position. Received ${typeof payload[0]}. JSONPath: ${path}[0]`);
		}

		if (typeof payload[1] !== "number") {
			throw new Error(`Unexpected array contents! Expected number on second position. Received ${typeof payload[1]}. JSONPath: ${path}[1]`);
		}

		for (const elem of Object.entries(payload.slice(2))) {
			validatePayload(elem[1], payload[0], `${path}[${+elem[0]+2}]`);
		}
	}
}

