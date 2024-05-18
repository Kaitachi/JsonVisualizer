<script>
	import { validate } from "$lib/Thrift/Message/validator.js";
	import { THRIFT } from "../Thrift/Types.js";
	import Table from "./Table.svelte";

	/** @type {string} */
	export let json;

	/** @type {string} */
	let jsonPath = "$[4]";

	/** @type {any} */
	let jsonObject;

	/** @type {string} */
	let errorMessage = "";

	$: {
		try {
			jsonObject = validate(json);
		} catch (/** @type {any} */ error) {
			console.error(error);

			jsonObject = null;
			errorMessage = String(error);
		}
	}
</script>

{#if jsonObject}
	<div class="mx-auto py-4">
		<details class="bg-jimmy-lite-100 dark:bg-jimmy-night-700 shadow-lg p-6 rounded-lg">
			<summary class="text-sm leading-6 text-slate-900 dark:text-gray-100 font-semibold select-none cursor-pointer">
				Thrift Metadata
			</summary>
			<div class="mt-3 text-sm leading-6 text-slate-600 dark:text-gray-100">
				<dl class="divide-y divide-gray-100">
					<div class="px-4 py-6 sm:grid sm:grid-cols-6 sm:gap-4 sm:px-0">
						<dt class="text-sm font-medium leading-6">Thrift Version</dt>
						<dd class="mt-1 text-sm leading-6 text-gray-500 sm:col-span-5 sm:mt-0 font-normal dark:text-gray-400">
							{jsonObject[THRIFT.FIELDS.VERSION]}
						</dd>
					</div>

					<div class="px-4 py-6 sm:grid sm:grid-cols-6 sm:gap-4 sm:px-0">
						<dt class="text-sm font-medium leading-6">Endpoint</dt>
						<dd class="mt-1 text-sm leading-6 text-gray-500 sm:col-span-5 sm:mt-0 font-normal dark:text-gray-400">
							{jsonObject[THRIFT.FIELDS.ENDPOINT]}
						</dd>
					</div>

					<div class="px-4 py-6 sm:grid sm:grid-cols-6 sm:gap-4 sm:px-0">
						<dt class="text-sm font-medium leading-6">Message Type</dt>
						<dd class="mt-1 text-sm leading-6 text-gray-500 sm:col-span-5 sm:mt-0 font-normal dark:text-gray-400">
							{jsonObject[THRIFT.FIELDS.MESSAGE]} -
							({THRIFT.MESSAGE_TYPES[jsonObject[THRIFT.FIELDS.MESSAGE]]})
						</dd>
					</div>

					<div class="px-4 py-6 sm:grid sm:grid-cols-6 sm:gap-4 sm:px-0">
						<dt class="text-sm font-medium leading-6">Payload Type</dt>
						<dd class="mt-1 text-sm leading-6 text-gray-500 sm:col-span-5 sm:mt-0 font-normal dark:text-gray-400">
							{jsonObject[THRIFT.FIELDS.PAYLOAD_TYPE]} -
							({THRIFT.PAYLOAD_TYPES(jsonObject[THRIFT.FIELDS.PAYLOAD_TYPE])})
						</dd>
					</div>

					<div class="px-4 py-6 sm:grid sm:grid-cols-6 sm:gap-4 sm:px-0">
						<dt class="text-sm font-medium leading-6">Payload</dt>
						<dd class="mt-1 text-sm leading-6 text-gray-500 sm:col-span-5 sm:mt-0 font-normal dark:text-gray-400">
							<code>
								{JSON.stringify(jsonObject)}
							</code>
						</dd>
					</div>
				</dl>
			</div>
		</details>
	</div>
	<div class="relative overflow-x-auto shadow-md sm:rounded-lg">
		<Table obj={jsonObject[THRIFT.FIELDS.PAYLOAD]} {jsonPath} struct={jsonObject[THRIFT.FIELDS.ENDPOINT]} payloadType={jsonObject[THRIFT.FIELDS.MESSAGE]} />
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

