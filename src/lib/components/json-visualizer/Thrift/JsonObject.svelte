<script>
	import { THRIFT } from "./Types.js";
	import Table from "../Common/Table.svelte";

	export let jsonData;

	let jsonObject;
	let isValid;

	function validate(thing) {
		try {
			jsonObject = JSON.parse(thing);
		} catch (e) {
			return false;
		}
		return true;
	}

	$: isValid = validate(jsonData);
</script>

{#if isValid}
	<p class="bg-green-200">
		Valid JSON object!
	</p>
	
	<p class="my-6">
		<dl>
			<dt>Thrift Version:</dt>
			<dd>{jsonObject[THRIFT.FIELDS.VERSION]}</dd>

			<dt>Endpoint:</dt>
			<dd>{jsonObject[THRIFT.FIELDS.ENDPOINT]}</dd>

			<dt>Message Type:</dt>
			<dd>{jsonObject[THRIFT.FIELDS.TRANSACTION]} -
				({THRIFT.TRANSACTION_TYPES[jsonObject[THRIFT.FIELDS.TRANSACTION]]})</dd>

			<dt>Payload Type:</dt>
			<dd>{jsonObject[THRIFT.FIELDS.PAYLOAD_TYPE]} -
				({THRIFT.PAYLOAD_TYPES(jsonObject[THRIFT.FIELDS.PAYLOAD_TYPE])})</dd>

			<dt>Payload:</dt>
			<dd>
				<code>
					{jsonData}
				</code>
			</dd>
		</dl>

	<p class="my-6">
		<Table />
	</p>
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
	margin-bottom: 0.6em;
}
</style>
