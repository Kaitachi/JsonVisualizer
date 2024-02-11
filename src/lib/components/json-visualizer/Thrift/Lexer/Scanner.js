export class Scanner {

	#source = "";
	#start = 0;
	#current = 0;
	#line = 1;

	/** @type {any[]} */
	#tokens = [];

	/**
	 * @param {string} source
	 */
	constructor(source) {
		this.#source = source;
	}


	/**
	 * Scans given source file for Thrift tokens
	 * @returns {any} - list of tokens found
	 */
	scanTokens() {
		while (!this.#isAtEnd()) {
			this.#start = this.#current;
			this.#scanToken();
		}

		return this.#tokens;
	}

	#scanToken() {
		const c = this.#advance();
		console.log(`scanning ${c}...`);

		//switch (c) {
		//}
	}


	// ======================
	// MARK: - Helper Methods
	// ======================

	#advance() {
		return this.#source[this.#current++];
	}

	#isAtEnd() {
		return (this.#current >= this.#source.length);
	}
};



