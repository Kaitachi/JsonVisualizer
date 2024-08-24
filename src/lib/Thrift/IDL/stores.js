import { writable, derived } from "svelte/store";
import { service as selectedService } from "../../../stores.js";
import { loadCK } from "./main.js";
import { enableDebug } from "./debug.js";
import { dev } from "$app/environment";


export const source = writable("");

export const document = derived(source, ($source) => {
	if (!$source) {
		return null;
	}

	let src = loadCK($source);

	if (src.type === "ThriftErrors") {
		// TODO: Properly handle Thrift errors!
		return null;
	}

	return src;
});


/** @type {import("svelte/store").Readable<import("@creditkarma/thrift-parser").ServiceDefinition?>} */
export const service = derived([selectedService, document], ([$selectedService, $document]) => {
	if (!$document) {
		return null;
	}

	let services = /** @type {import("@creditkarma/thrift-parser").ServiceDefinition[]} */
		($document.body.filter(item => item.type === "ServiceDefinition"));

	if (!services.length) {
		console.warn("No services found in current Thrift definition!");
		return null;
	}

	let matchingService = services.find(svc => svc.name.value === $selectedService);

	if (matchingService) {
		return matchingService;
	} else {
		return services[0];
	}
});


/** @type {import("svelte/store").Readable<import("@creditkarma/thrift-parser").EnumDefinition[]?>} */
export const enums = derived([document], ([$document]) => {
	if (!document) {
		return null;
	}

	let enums = /** @type {import("@creditkarma/thrift-parser").EnumDefinition[]} */
		($document.body.filter(item => item.type === "EnumDefinition"));

	return enums;
});


/** @type {import("svelte/store").Readable<import("@creditkarma/thrift-parser").ExceptionDefinition[]?>} */
export const exceptions = derived([document], ([$document]) => {
	if (!document) {
		return null;
	}

	let exceptions = /** @type {import("@creditkarma/thrift-parser").ExceptionDefinition[]} */
		($document.body.filter(item => item.type === "ExceptionDefinition"));

	return exceptions;
});


/** @type {import("svelte/store").Readable<import("@creditkarma/thrift-parser").StructDefinition[]?>} */
export const structs = derived([document], ([$document]) => {
	if (!document) {
		return null;
	}

	let structs = /** @type {import("@creditkarma/thrift-parser").StructDefinition[]} */
		($document.body.filter(item => item.type === "StructDefinition"));

	return structs;
});


if (dev) {
	enableDebug();
}

