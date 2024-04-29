import { get } from "svelte/store";
import { service, thisSource, thisDocument, thisService } from "../../../stores.js";
import { load } from "./main.js";
import { TOKEN } from "./Lexer/Tokens.js";

export function sync() {
	thisSource.subscribe((/** @type {string} */ value) => {
		thisDocument.set(load(value));
	});

	// TODO: Would a derived store be more convenient for this use-case...?
	thisDocument.subscribe((/** @type {import("$lib/Thrift/IDL/Lexer/Parser.js").Document?} */ document) => {
		if (!document) {
			thisService.set(null);
			return;
		}

		let definitions = Object.values(document.definitions);

		let services = definitions
				.filter(def => def.type === TOKEN.SERVICE.type);

		if (!services || !services.length) {
			console.warn("No services found in current Thrift definition!");
			thisService.set(null);
			return;
		}

		/** @type {import("$lib/Thrift/IDL/Lexer/Parser.js").Service?} */
		let selectedService = null;

		// FIXME: Is there any way to correctly filter mixed arrays on jsdoc?
		if (services.length === 1) {
			selectedService = services[0].definition;
		} else {
			selectedService = services
				.filter(svc => svc.name === get(service))[0].definition;
		}

		thisService.set(selectedService);
	});
}

