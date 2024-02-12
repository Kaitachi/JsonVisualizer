import { Scanner } from "./Scanner.js";

	/**
	 * Transform given source string to JSON-ified Thrift service.
	 * @param {string} source - source file to be parsed
	 * @returns {any} JSON object with Service definition
	 */
export function loadService(source) {
	const scanner = new Scanner(source);
	const tokens = scanner.scanTokens();

	console.table(tokens);

	return {test: 123};
}

