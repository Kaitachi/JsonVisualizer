<script>
	import { service, enums, exceptions, structs } from "$lib/Thrift/IDL/stores";
	import Enum from "./Enum.svelte";
	import Exception from "./Exception.svelte";
	import Method from "./Method.svelte";
	import Struct from "./Struct.svelte";

	const thriftNameSortFunc = (a, b) => {
		return (a.name.value < b.name.value) ? -1 : 1;
	};

	/** @type {import("@creditkarma/thrift-parser").FunctionDefinition[]} */
	let methods = [];

	$: {
		methods = $service?.functions.toSorted(thriftNameSortFunc) || [];
	}

	let displayEnums = $enums?.toSorted(thriftNameSortFunc) || [];
	let displayExceptions = $exceptions?.toSorted(thriftNameSortFunc) || [];
	let displayStructs = $structs?.toSorted(thriftNameSortFunc) || [];

</script>

<div class="grid grid-cols-3 items-start gap-4 px-0 py-6">
	<div class="col-span-2 [&>:first-child]:mt-0 [&>:last-child]:mb-0">
		<h3 class="overflow-hidden">METHODS</h3>
		{#if methods.length}
			{#each methods as method}
				<Method {method} />
			{/each}
		{:else}
			<em>No methods defined.</em>
		{/if}
	</div>
	<div class="sticky top-10">
		<div>
			<h3 class="overflow-hidden">ENUMS</h3>
			{#if displayEnums}
				{#each displayEnums as item}
					<Enum definition={item} />
				{/each}
			{:else}
				<em>No enums defined.</em>
			{/if}
		</div>
		<div>
			<h3 class="overflow-hidden mt-14">EXCEPTIONS</h3>
			{#if displayExceptions}
				{#each displayExceptions as item}
					<Exception exception={item} />
				{/each} 
			{:else}
				<em>No exceptions defined.</em>
			{/if}
		</div>
		<div>
			<h3 class="overflow-hidden mt-14">STRUCTS</h3>
			{#if displayStructs}
				{#each displayStructs as item}
					<Struct struct={item} />
				{/each}
			{:else}
				<em>No structs defined.</em>
			{/if}
		</div>
	</div>
</div>

<style>
/* Add horizontal line to headers */
h3:after {
 background-color: darkorange;
 content: "";
 display: inline-block;
 height: 2px;
 position: relative;
 vertical-align: middle;
 width: 100%;
 left: 0.5em;
 margin-right: -50%;
}
</style>
