<script>
	import Comment from "./Comment.svelte";
	import Field from "./Field.svelte";


	export let exception;

</script>

<details class="my-6 overflow-hidden rounded-md bg-zinc-900 shadow-md dark:ring-1 dark:ring-white/10">
	<summary class="flex min-h-[calc(theme(spacing.12)+1px)] flex-wrap items-center gap-x-4 border-b border-zinc-700 text-white bg-zinc-800 px-4 py-4 dark:border-zinc-800 dark:bg-transparent cursor-pointer">
		Exception <span class="font-mono text-zinc-400">{exception.name.value}</span>
	</summary>

	<div class="group dark:bg-zinc-800">
		<div class="gap-2 border-y border-b-white/7.5 border-t-transparent bg-white/2.5 p-4 dark:border-b-white/5 dark:bg-white/2.5">
			<Comment contents={exception.comments} />
		</div>
		<div class="gap-2 border-y border-b-white/7.5 border-t-transparent bg-white/2.5 p-4 dark:border-b-white/5 dark:bg-white/2.5">
			<h2 class="font-semibold">Fields</h2>
			<ul class="divide-y divide-white/5">
				{#if exception.fields.length}
					{#each exception.fields as field}
						<li class="">
							<Field data={field} />
						</li>
					{/each}
				{:else}
					<em>No fields defined in this exception!</em>
				{/if}
			</ul>
		</div>
	</div>
</details>
