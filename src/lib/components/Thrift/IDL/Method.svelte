<script>
	import { method } from "$lib/Thrift/Message/stores.js";

	/** @type {import("@creditkarma/thrift-parser").FunctionDefinition} */
	export let definition;

	let is_current = $method?.toLowerCase() === definition.name.value.toLowerCase();

	let selected_border = (is_current) ? "border-2 border-green-600" : "";
</script>

<details open={is_current}
		class="my-6 overflow-hidden rounded-2xl bg-zinc-900 shadow-md dark:ring-1 dark:ring-white/10 {selected_border}">
	<summary class="flex min-h-[calc(theme(spacing.12)+1px)] flex-wrap items-center gap-x-4 border-b border-zinc-700 bg-zinc-800 px-4 py-4 dark:border-zinc-800 dark:bg-transparent">
		Function <span class="font-mono text-zinc-400">{definition.name.value}</span>
	</summary>
	<div class="group dark:bg-zinc-700 p-4">
		Details for {definition.name.value}:
		{JSON.stringify(definition)}
	</div>
</details>
