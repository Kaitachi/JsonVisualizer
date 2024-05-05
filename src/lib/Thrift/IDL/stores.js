import { writable, derived } from "svelte/store";
import { service as selectedService } from "../../../stores.js";
import { load } from "./main.js";
import { TOKEN } from "./Lexer/Tokens.js";
import { enableDebug } from "./debug.js";
import { dev } from "$app/environment";


export const source = writable("");

export const document = derived(source, ($source) => {
	if (!$source) {
		return null;
	}

	return load($source);
});

export const service = derived([selectedService, document], ([$selectedService, $document]) => {
	if (!$document) {
		return null;
	}

	let definitions = Object.values($document.definitions);

	let services = definitions
		.filter(def => def.type === TOKEN.SERVICE.type);

	if (!services || !services.length) {
		console.warn("No services found in current Thrift definition!");
		return null;
	}

	/** @type {import("$lib/Thrift/IDL/Lexer/Parser.js").Service?} */
	let thisService = null;

	// FIXME: Is there any way to correctly filter mixed arrays on jsdoc?
	if (services.length === 1) {
		thisService = services[0].definition;
	} else {
		thisService = services
			.filter(svc => svc.name === $selectedService)[0].definition;
	}

	return thisService;
});


if (dev) {
	enableDebug();
}

