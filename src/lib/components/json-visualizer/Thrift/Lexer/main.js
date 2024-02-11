import { Scanner } from "./Scanner.js";

	/**
	 * Transform given source string to JSON-ified Thrift service.
	 * @param {string} source - source file to be parsed
	 * @returns {any} JSON object with Service definition
	 */
export function loadService(source) {
	console.log("> initializing scanner...");
	let scanner = new Scanner(source);
	scanner.scanTokens();

	return {test: 123};
}

