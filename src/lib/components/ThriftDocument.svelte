<script>
	import { thisSource, thisDocument, thisService } from "../../stores.js";
	import { load } from "../Thrift/IDL/main.js";
	import { TOKEN } from "../Thrift/IDL/Lexer/Tokens.js";

	/** @type {string} */
	export let service = "";

	thisSource.subscribe((/** @type {string} */ value) => {
		console.error(`>> RECEIVED SOURCE UPDATE (length ${value.length})<<`);
		thisDocument.set(load(value));
	});

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
				.filter(svc => svc.name === service)[0].definition;
		}

		thisService.set(selectedService);

	});
</script>
