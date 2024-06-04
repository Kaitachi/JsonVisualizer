<script>
	import { THRIFT } from "$lib/Thrift/Types";

	/** @type {import("@creditkarma/thrift-parser").FieldDefinition?} */
	export let data = null;

	/** @type {string?} */
	export let container = null;

	/** @type {string?} */
	export let index = null;

	/** @type {string?} */
	export let type = null;

	$: {
		if (container) {
			console.info(`>> component field data=${JSON.stringify(data)}; container=${container}; index=${index}; type=${type};`);
		}
	}

</script>


{#if container && type}
	{#if container === "key"}
		{@const value = (data?.value) ? ` - ${data?.value}` : ``}
		Key
		<em>({THRIFT.DATA_TYPES[type]?.name}{value})</em>
	{:else if container === "value"}
		{@const value = (data?.value) ? ` - ${data?.value}` : ``}
		Value
		<em>({THRIFT.DATA_TYPES[type]?.name}{value})</em>
	{/if}
{:else if data}
	{@const field_type = data.fieldType?.type}

	{data.fieldID?.value}:
	<span class="font-mono px-1 m-1 text-sm ring-1 ring-zinc-400 rounded bg-zinc-400 text-black">{data.name?.value}</span>

	{#if field_type === "ListType"}
		<em>({THRIFT.DATA_TYPES["lst"]?.name})</em>
	{:else if field_type === "SetType"}
		<em>({THRIFT.DATA_TYPES["set"]?.name})</em>
	{:else if field_type === "MapType"}
		<em>({THRIFT.DATA_TYPES["map"]?.name})</em>
	{:else if field_type?.includes("Keyword")}
		{@const native_type = THRIFT.CK_TYPES[field_type]}
		
		<em>({THRIFT.DATA_TYPES[native_type]?.name})</em>
	{:else}
		<em>({data.fieldType?.value})</em>
	{/if}
{:else if index && type}
	{@const data_type = THRIFT.DATA_TYPES[type]?.name}

	{index} <em>({data_type})</em>
{:else}
	{index} <em>({type})</em>
{/if}
