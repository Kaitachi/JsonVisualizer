<script>
	import { THRIFT } from "./Types.js";
	import Table from "./Table.svelte";

	export let json;

	let jsonObject;
	$: jsonObject = THRIFT.VALIDATE_THRIFT_OBJ(json);
</script>

{#if jsonObject !== undefined}
	<p class="bg-green-200 my-6">
		Valid JSON object!
	</p>
	
	<div class="relative overflow-x-auto shadow-md sm:rounded-lg">
		<caption style="width: 100em" class="p-5 text-lg font-semibold text-left text-gray-900 bg-white dark:text-white dark:bg-gray-800">
			<dl>
				<dt class="mt-0">Thrift Version:</dt>
				<dd class="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">{jsonObject[THRIFT.FIELDS.VERSION]}</dd>

				<dt class="mt-6">Endpoint:</dt>
				<dd class="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">{jsonObject[THRIFT.FIELDS.ENDPOINT]}</dd>

				<dt class="mt-6">Message Type:</dt>
				<dd class="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">{jsonObject[THRIFT.FIELDS.TRANSACTION]} -
					({THRIFT.TRANSACTION_TYPES[jsonObject[THRIFT.FIELDS.TRANSACTION]]})</dd>

				<dt class="mt-6">Payload Type:</dt>
				<dd class="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">{jsonObject[THRIFT.FIELDS.PAYLOAD_TYPE]} -
					({THRIFT.PAYLOAD_TYPES(jsonObject[THRIFT.FIELDS.PAYLOAD_TYPE])})</dd>

				<dt class="mt-6">Payload:</dt>
				<dd class="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">
					<code>
						{JSON.stringify(jsonObject)}
					</code>
				</dd>
			</dl>
		</caption>
		<Table obj={jsonObject[THRIFT.FIELDS.PAYLOAD]} />
	</div>
{:else}
	<p class="bg-red-200">
		Invalid JSON detected!
	</p>
{/if}



<style>
dt {
	font-weight: bold;
}

dd {
	font-style: italic;
}
</style>
