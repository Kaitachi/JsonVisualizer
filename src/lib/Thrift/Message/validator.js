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

		console.info("Valid JSON string!");

		// TODO: Is the last entry in this array a proper Thrift payload?

		message = msg;
	} catch (e) {
		console.error(e);
		throw e;
	}

	return message;
}
