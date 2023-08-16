<script>
	import { THRIFT } from "./Types.js";
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
</script>

{#if isThriftMessage}
	<p class="hidden bg-green-200 my-6">
		Valid JSON object!
	</p>

	<div class="mx-auto py-4">
		<details class="bg-white dark:bg-slate-900 ring-1 ring-black/5 dark:ring-white/10 shadow-lg p-6 rounded-lg">
			<summary class="text-sm leading-6 text-slate-900 dark:text-white font-semibold select-none">
				Metadata <em>(click to expand)</em>
			</summary>
			<div class="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400">
				<dl>
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
		<caption style="width: 100em" class="hidden p-5 text-lg font-semibold text-left text-gray-900 bg-white dark:text-white dark:bg-gray-800">
			<dl>
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
		</caption>
		<Table obj={jsonObject[THRIFT.FIELDS.PAYLOAD]} {jsonPath}/>
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

