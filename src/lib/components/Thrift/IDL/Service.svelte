<script>
	import { service } from "$lib/Thrift/IDL/stores";
	import Method from "./Method.svelte";

	/** @type {import("@creditkarma/thrift-parser").FunctionDefinition[]} */
	let methods = [];

	$: {
		methods = $service?.functions || [];
	}
</script>

<div class="px-4 py-6 sm:grid sm:grid-cols-4 sm:gap-4 sm:px-0">
	<div class="sm:col-span-3">
		{#each methods as method}
				<Method definition={method} />
		{/each}
	</div>
	<div>
		SIDEBAR
	</div>
</div>
