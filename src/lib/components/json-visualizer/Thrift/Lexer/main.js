import { Scanner } from "./Scanner.js";
import { Parser } from "./Parser.js";

	/**
	 * Transform given source string to JSON-ified Thrift service.
	 * @param {string} source - source file to be parsed
	 * @returns {any} JSON object with Service definition
	 */
export function loadService(source) {
	const scanner = new Scanner(source);
	const tokens = scanner.scanTokens();

	console.table(tokens);

	const parser = new Parser(tokens);
	const tree = parser.parse();

	console.warn("DONE LOADING");

	return {tree};
}

