<script>
	/** @type {import("@creditkarma/thrift-parser").Comment[]} */
	export let contents;
</script>


{#each contents as block}
	{#if block.type === "CommentBlock"}
		{#each block.value as paragraph}
			{#if paragraph === "*"}
				<p>&nbsp;</p>
			{:else}
				<p>
					{paragraph}
				</p>
			{/if}
		{/each}
	{/if}
{/each}
