/**
 * Thrift Message that can be transmitted across services
 * @typedef {Array<[number, string, number, number, Object]>} ThriftMessage
 */


export const THRIFT = {
	/** @type {Object.<string, number>} */
	FIELDS: {
		VERSION: 0,
		ENDPOINT: 1,
		MESSAGE: 2,
		PAYLOAD_TYPE: 3,
		PAYLOAD: 4
	},

	/** @type {Object.<string, number>} */
	MESSAGE: {
		REQUEST: 1,
		RESPONSE: 2
	},

	/** @type {Object.<number, string>} */
	MESSAGE_TYPES: {
		1: "Request",
		2: "Response"
	},

	/** @type {function(number): string} */
	PAYLOAD_TYPES: (type) => {
		switch (type) {
			case 1: return 'Regular Object';
			default: return 'Something Else???';
		}
	},

	/**
	* @typedef ThriftDataType
	* @property {string} name
	* @property {boolean} is_container
	* @property {boolean} is_unquoted
	*/

	/** @type {Object.<string, ThriftDataType>} */
	DATA_TYPES: {
		"tf" : { name: "boolean", is_container: false, is_unquoted: true },
		"i8": { name: "byte", is_container: false, is_unquoted: true },
		"i16": { name: "short", is_container: false, is_unquoted: true },
		"i32": { name: "int", is_container: false, is_unquoted: true },
		"i64": { name: "long", is_container: false, is_unquoted: true },
		"dbl": { name: "double", is_container: false, is_unquoted: true },
		"str": { name: "string", is_container: false, is_unquoted: false },
		"rec": { name: "record", is_container: true, is_unquoted: true },
		"lst": { name: "list", is_container: true, is_unquoted: true },
		"map": { name: "map", is_container: true, is_unquoted: true },
		"set": { name: "set", is_container: true, is_unquoted: true }
	},

	/** @type {function(string): ThriftMessage} */
	VALIDATE_THRIFT_MESSAGE: function (input) {
		/** @type {ThriftMessage} */
		let message = [];

		try {
			let msg = JSON.parse(input);

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

			message = msg;
		} catch (e) {
			console.error(e);
			throw e;
		}

		return message;
	}
}

