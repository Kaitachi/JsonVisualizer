<script>
	import { payload } from "../../../../stores";
	import Tooltip from "../Common/tooltip.svelte";
	import { update } from "./Logic.js";
	import InPlaceEdit from "./InPlaceEdit.svelte";


	/** @type {[string, any]} */
	export let entry;

	/** @type {string} */
	export let path;

	/** @type {string} */
	let type = entry[0];

	/** @type {any} */
	let value = entry[1];

	/** @type {string} */
	let hint = "";

	if (type === "i32" || type === "i64") {
		// Since there's a chance we're interpreting an integer as a date,
		// let's do a conversion to show it when hovering over this number
		let timestamp = Number(value);
		if (timestamp || timestamp === 0) {
			hint = new Date(timestamp).toUTCString();
		}
	} else if (type === "str") {
		// If this string is a number, we could also attempt to show the date
		let timestamp = Number(value);
		if (!isNaN(timestamp)) {
			hint = new Date(timestamp).toUTCString();
		}
	}

	function submit(field) {
		return ({detail: newValue}) => {
			const changes = {
				path: field,
				type: type,
				value: newValue
			};

			$payload = update($payload, changes);
		}
	}
</script>

<Tooltip hint={hint}>
	<InPlaceEdit bind:value={value} on:submit={submit(`${path}`)} />
</Tooltip>

