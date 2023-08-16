export const THRIFT = {
	/** @type {Object.<string, number>} */
	FIELDS: {
		VERSION: 0,
		ENDPOINT: 1,
		TRANSACTION: 2,
		PAYLOAD_TYPE: 3,
		PAYLOAD: 4
	},

	/** @type {Object.<number, string>} */
	TRANSACTION_TYPES: {
		1: "Request",
		2: "Response"
	},

	/** @type {function(number): string} */
	PAYLOAD_TYPES: (payload_type) => {
		switch (payload_type) {
			case 1: return 'Regular Object';
			default: return 'Error Object';
		}
	},

	/**
	* @typedef ThriftDataType
	* @property {string} name
	* @property {boolean} is_complex
	*/

	/** @type {Object.<string, ThriftDataType>} */
	DATA_TYPES: {
		"tf" : { name: "boolean", is_complex: false },
		"i32": { name: "int", is_complex: false },
		"i64": { name: "long", is_complex: false },
		"dbl": { name: "double", is_complex: false },
		"str": { name: "string", is_complex: false },
		"rec": { name: "record", is_complex: true },
		"lst": { name: "list", is_complex: true },
		"map": { name: "map", is_complex: true },
		"set": { name: "set", is_complex: true }
	},

	/** @type {function(string): any} */
	VALIDATE_THRIFT_OBJ: function (input) {
		let response;

		try {
			let tmp = JSON.parse(input);

			if (!Array.isArray(tmp)) {
				throw new Error("Input data is not an array!");
			}

			if (tmp.length !== 5) {
				throw new Error("Input array does not contain expected five elements!");
			}

			console.info("Valid JSON string!");

			response = tmp;
		} catch (e) {
			console.error(e);
		}

		return response;
	}
}
