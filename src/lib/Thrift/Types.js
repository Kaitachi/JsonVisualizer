/**
 * Thrift Message that can be transmitted across services
 * @typedef {[number, string, number, number, Object]} ThriftMessage
 */


/**
* @typedef ThriftDataType
* @property {string} name
* @property {boolean} is_container
* @property {boolean} is_unquoted
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
	}
}

