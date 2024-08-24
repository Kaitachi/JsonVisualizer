<script>
	import { service, enums, exceptions, structs } from "$lib/Thrift/IDL/stores";
	import Enum from "./Enum.svelte";
	import Exception from "./Exception.svelte";
	import Method from "./Method.svelte";
	import Struct from "./Struct.svelte";

	/** @type {import("@creditkarma/thrift-parser").FunctionDefinition[]} */
	let methods = [];

	$: {
		methods = $service?.functions || [];
	}
</script>

<div class="grid grid-cols-3 items-start gap-4 px-0 py-6">
	<div class="col-span-2 [&>:first-child]:mt-0 [&>:last-child]:mb-0">
		<h3>METHODS</h3>
		{#each methods as method}
			<Method {method} />
		{/each}
	</div>
	<div class="sticky top-10">
		<div>
			<h3>ENUMS</h3>
			{#if $enums}
				{#each $enums as item}
					<Enum definition={item} />
				{/each}
			{:else}
				<em>No enums defined.</em>
			{/if}
		</div>
		<div>
			<h3>EXCEPTIONS</h3>
			{#if $exceptions}
				{#each $exceptions as item}
					<Exception exception={item} />
				{/each} 
			{:else}
				<em>No exceptions defined.</em>
			{/if}
		</div>
		<div>
			<h3>STRUCTS</h3>
			{#if $structs}
				{#each $structs as item}
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
h3 {
 overflow: hidden;
}

h3:after {
 background-color: darkorange;
 content: "";
 display: inline-block;
 height: 2px;
 position: relative;
 vertical-align: middle;
 width: 100%;
}

h3:after {
 left: 0.5em;
 margin-right: -50%;
}
</style>
