<script>

	/** @type {[string, any]} */
	export let entry;

	/** @type {string} */
	let type = entry[0];

	/** @type {any} */
	let value = entry[1];

	/** @type {string[]} */
	let helpers = [];

	if (type === "i32" || type === "i64") {
		// Since there's a chance we're interpreting an integer as a date,
		// let's do a conversion to show it when hovering over this number
		let timestamp = Number(value);
		if (timestamp || timestamp === 0) {
			helpers.push(new Date(timestamp).toUTCString());
		}
	}
</script>

{#if helpers.length == 1}
	<span title={helpers[0]}>{value}</span>
{:else}
	{value}
{/if}

