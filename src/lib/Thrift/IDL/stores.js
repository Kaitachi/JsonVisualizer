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

	let services = /** @type {import("@creditkarma/thrift-parser").ServiceDefinition[]} */ ($document.body.filter(item => item.type === "ServiceDefinition"));

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


if (dev) {
	enableDebug();
}

