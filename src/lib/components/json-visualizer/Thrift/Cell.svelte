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
	} else if (type === "str") {
		// If this string is a number, we could also attempt to show the date
		let timestamp = Number(value);
		if (!isNaN(timestamp)) {
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

<InPlaceEdit bind:value={value} on:submit={submit(`${path}`)} props={props} />

