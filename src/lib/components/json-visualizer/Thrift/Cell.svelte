<script>
	import { fieldUpdates } from "../../../../stores";
	import InPlaceEdit from "./InPlaceEdit.svelte";


	/** @type {[string, any]} */
	export let entry;

	/** @type {string} */
	export let path;

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

	let props = {
		"title": helpers[0]
	};

	function submit(field) {
		return ({detail: newValue}) => {
			$fieldUpdates.push({
				path: field,
				type: type,
				value: newValue
			});
			$fieldUpdates = $fieldUpdates;

			console.log(`updating ${field}: "${newValue}".`);
		}
	}
</script>

{#if false}
	<span title={helpers[0]} data-type={type} data-value={value} data-path={path}>{value}</span>
{:else if false}
	<input type="text" bind:value={value} data-path={path} />
{/if}

<InPlaceEdit bind:value={value} on:submit={submit(`${path}`)} props={props} />

