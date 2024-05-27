import { parse } from '@creditkarma/thrift-parser'
import { Scanner } from "./Lexer/Scanner.js";
import { Parser } from "./Lexer/Parser.js";

/**
 * Transform given source string to JSON-ified Thrift service.
 * @param {string} source - source file to be parsed
 * @returns {import("./Lexer/Parser.js").Document} JSON object with Service definition
 */
export function load(source) {
	const scanner = new Scanner(source);
	const tokens = scanner.scanTokens();

	console.info("DONE TOKENS");

	const parser = new Parser(tokens);
	const tree = parser.parse();

	console.info("DONE PARSE");

	console.info({tree});

	return tree;
}

/**
 * Transform given source string to JSON-ified Thrift service.
 * @param {string} source - source file to be parsed
 * @returns {import('@creditkarma/thrift-parser').ThriftDocument | import('@creditkarma/thrift-parser').ThriftErrors} JSON object with Service definition
 */
export function loadCK(source) {
	const tree = parse(source);

	console.info({tree});

	return tree;
}

