<script>
	import { load } from "../Thrift/IDL/main.js";
	import { TOKEN } from "../Thrift/IDL/Lexer/Tokens.js";
	import { THRIFT } from "../Thrift/Types.js";
	import Table from "./Table.svelte";

	/** @type {string} */
	export let source;

	/** @type {string} */
	export let json;

	/** @type {string} */
	export let service;

	/** @type {string} */
	let jsonPath = "$[4]";

	/** @type {any} */
	let jsonObject;

	/** @type {boolean} */
	let isThriftMessage = false;

	/** @type {string} */
	let errorMessage = "";

	/** @type {import("$lib/Thrift/IDL/Lexer/Parser.js").Document?} */
	let loadedDoc = null;

	/** @type {import("$lib/Thrift/IDL/Lexer/Parser.js").Service?} */
	let selectedService = null;

	/** @type {import("$lib/Thrift/IDL/Lexer/Parser.js").Field[]} */
	let fields = [];

	$: {
		try {
			let result = THRIFT.VALIDATE_THRIFT_MESSAGE(json);

			isThriftMessage = Array.isArray(result) && result.length === 5;
			
			jsonObject = (isThriftMessage)? result : null;
		} catch (/** @type {any} */ error) {
			console.error(error);

			isThriftMessage = false;
			jsonObject = null;
			errorMessage = String(error);
		}
	}

	$: {
		if (source) {
			loadedDoc = load(source);
			console.log(loadedDoc);

			let definitions = Object.values(loadedDoc.definitions);

			let services = definitions
					.filter(def => def.type === TOKEN.SERVICE.type);

			// FIXME: Is there any way to correctly filter mixed arrays on jsdoc?
			if (services.length === 1) {
				selectedService = services[0].definition;
			} else {
				selectedService = services
					.filter(svc => svc.name === service)[0].definition;
			}

			console.log({selectedService});

			if (isThriftMessage) {
				let selectedFunction = selectedService?.functions
					.find(f => f.identifier.toLowerCase() === jsonObject[THRIFT.FIELDS.ENDPOINT].toLowerCase());

				switch (jsonObject[THRIFT.FIELDS.MESSAGE]) {
					case THRIFT.MESSAGE.REQUEST:
						fields = selectedFunction?.fields ?? [];
						break;

					// TODO: Show fields for response-type objects!
					case THRIFT.MESSAGE.RESPONSE:
						fields = [];
						break;
				}
			}
		}
	}
</script>

{#if isThriftMessage}
	<div class="mx-auto py-4">
		<details class="bg-jimmy-lite-100 dark:bg-jimmy-night-700 shadow-lg p-6 rounded-lg">
			<summary class="text-sm leading-6 text-slate-900 dark:text-gray-100 font-semibold select-none cursor-pointer">
				Thrift Metadata
			</summary>
			<div class="mt-3 text-sm leading-6 text-slate-600 dark:text-gray-100">
				<dl class="px-4">
					<dt class="mt-0">Thrift Version:</dt>
					<dd class="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">
						{jsonObject[THRIFT.FIELDS.VERSION]}
					</dd>

					<dt class="mt-6">Endpoint:</dt>
					<dd class="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">
						{jsonObject[THRIFT.FIELDS.ENDPOINT]}
					</dd>

					<dt class="mt-6">Message Type:</dt>
					<dd class="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">
						{jsonObject[THRIFT.FIELDS.MESSAGE]} -
						({THRIFT.MESSAGE_TYPES[jsonObject[THRIFT.FIELDS.MESSAGE]]})
					</dd>

					<dt class="mt-6">Payload Type:</dt>
					<dd class="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">
						{jsonObject[THRIFT.FIELDS.PAYLOAD_TYPE]} -
						({THRIFT.PAYLOAD_TYPES(jsonObject[THRIFT.FIELDS.PAYLOAD_TYPE])})
					</dd>

					<dt class="mt-6">Payload:</dt>
					<dd class="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">
						<code>
							{JSON.stringify(jsonObject)}
						</code>
					</dd>
				</dl>
			</div>
		</details>
	</div>
	<div class="relative overflow-x-auto shadow-md sm:rounded-lg">
		<Table obj={jsonObject[THRIFT.FIELDS.PAYLOAD]} {jsonPath} thriftFields={fields}/>
	</div>
{:else}
	<div role="alert">
		<div class="bg-red-500 text-white font-bold rounded-t px-4 py-2">
			Error
		</div>
		<div class="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700">
			<p>Invalid JSON detected!</p>
			<p>{errorMessage}</p>
		</div>
	</div>
{/if}



<style>
dt {
	font-weight: bold;
}

dd {
	font-style: italic;
}
</style>

