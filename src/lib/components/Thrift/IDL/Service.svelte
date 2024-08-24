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
			{/if}
		</div>
		<div>
			<h3>EXCEPTIONS</h3>
			{#if $exceptions}
				{#each $exceptions as item}
					<Exception exception={item} />
				{/each} 
			{/if}
		</div>
		<div>
			<h3>STRUCTS</h3>
			{#if $structs}
				{#each $structs as item}
					<Struct struct={item} />
				{/each}
			{/if}
		</div>
	</div>
</div>
