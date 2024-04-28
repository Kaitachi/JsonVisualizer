<script>
	import { thisService } from "../../stores.js";
	import { THRIFT } from "../Thrift/Types.js";
	import Table from "./Table.svelte";

	/** @type {string} */
	export let json;

	/** @type {string} */
	let jsonPath = "$[4]";

	/** @type {any} */
	let jsonObject;

	/** @type {boolean} */
	let isThriftMessage = false;

	/** @type {string} */
	let errorMessage = "";

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

	/**
	 * @param {import("$lib/Thrift/IDL/Lexer/Parser.js").Service?} svc 
	 * @returns {import("$lib/Thrift/IDL/Lexer/Parser.js").Field[]}
	 */
	function getFields(svc) {
		console.error("> fetching fields from service...");
		if (!svc) {
			return [];
		}

		let func = svc.functions
					.find(f => f.identifier.toLowerCase() === jsonObject[THRIFT.FIELDS.ENDPOINT].toLowerCase())

		if (!func) {
			return [];
		}

		switch (jsonObject[THRIFT.FIELDS.MESSAGE]) {
			case THRIFT.MESSAGE.REQUEST:
				return func.fields ?? [];

				// TODO: Show fields for response-type objects!
			case THRIFT.MESSAGE.RESPONSE:
				// Add return object with id of 0
				const returns = func.returns;

				/** @type {import("$lib/Thrift/IDL/Lexer/Parser.js").Field[]} */
				let f = [{ id: 0, requiredness: null, type: returns ?? "UNDEFINED?", identifier: "RESPONSE", value: null }];

				// Add fields found in throws section of signature
				if (func.throws) {
					f.push(...func.throws);
				}
				return f;
		}

		return [];
	}

	$: fields = getFields($thisService);
	$: console.log({fields});
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
		<Table obj={jsonObject[THRIFT.FIELDS.PAYLOAD]} {jsonPath} thriftFields={fields} />
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

