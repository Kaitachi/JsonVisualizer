<script>
	import { method as current_method } from "$lib/Thrift/Message/stores.js";
	import Comment from "./Comment.svelte";
	import Field from "./Field.svelte";

	/** @type {import("@creditkarma/thrift-parser").FunctionDefinition} */
	export let method;

	let is_current = $current_method?.toLowerCase() === method.name.value.toLowerCase();

	let selected_border = (is_current) ? "border-2 border-green-600" : "";
</script>

<details open={is_current}
		class="my-6 overflow-hidden rounded-2xl bg-zinc-900 shadow-md dark:ring-1 dark:ring-white/10 {selected_border}">
	<summary class="flex min-h-[calc(theme(spacing.12)+1px)] flex-wrap items-center gap-x-4 border-b border-zinc-700 text-white bg-zinc-800 px-4 py-4 dark:border-zinc-800 dark:bg-transparent">
		Function <span class="font-mono text-zinc-400">{method.name.value}</span>
	</summary>
	<div class="group dark:bg-zinc-700">
		<div class="gap-2 border-y border-b-white/7.5 border-t-transparent bg-white/2.5 p-4 dark:border-b-white/5 dark:bg-white/2.5">
			<Comment contents={method.comments} />
		</div>
		{#if method.fields.length}
			<div class="gap-2 border-y border-b-white/7.5 border-t-transparent bg-white/2.5 p-4 dark:border-b-white/5 dark:bg-white/2.5">
				<h2 class="font-semibold">Parameters</h2>
				<ul class="divide-y divide-white/5">
					{#each method.fields as field}
						<li class="">
							<Field data={field} />
						</li>
					{/each}
				</ul>
			</div>
		{/if}
		{#if method.returnType}
			<div class="gap-2 border-y border-b-white/7.5 border-t-transparent bg-white/2.5 p-4 dark:border-b-white/5 dark:bg-white/2.5">
				<h2 class="font-semibold">Returns</h2>
				<ul class="divide-y divide-white/5">
					<li class="">
						<em>{method.returnType?.value}</em>
					</li>
				</ul>
			</div>
		{/if}
		{#if method.throws.length}
			<div class="gap-2 border-y border-b-white/7.5 border-t-transparent bg-white/2.5 p-4 dark:border-b-white/5 dark:bg-white/2.5">
				<h2 class="font-semibold">Throws</h2>
				<ul class="divide-y divide-white/5">
					{#each method.throws as field}
						<li class="">
							<Field data={field} />
						</li>
					{/each}
				</ul>
			</div>
		{/if}
		{#if true}
			<div class="gap-2 border-y border-b-white/7.5 border-t-transparent bg-white/2.5 p-4 dark:border-b-white/5 dark:bg-white/2.5">
				<h2 class="font-semibold">Examples</h2>
				<ul class="divide-y divide-white/5">
					<li class="">
						<em>Placeholder Examples</em>
					</li>
				</ul>
			</div>
		{/if}
	</div>
</details>
