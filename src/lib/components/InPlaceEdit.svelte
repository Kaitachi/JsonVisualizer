<script>
	// Code adapted from Svelte REPL -- thanks!
	// https://svelte.dev/repl/29c1026dda3c47a187bd21afa0782df1?version=4.2.1
	import { createEventDispatcher, onMount } from 'svelte'

	/** @type {string} */
	export let value;

	/** @type {boolean} */
	export let required = true;

	const dispatch = createEventDispatcher();

	/** @type {boolean} */
	let editing = false;

	/** @type {string} */
	let original;

	onMount(() => {
		original = value;
	})

	function edit() {
		editing = true
	}

	function submit() {
		if (value != original) {
			dispatch('submit', value)
		}
		
		editing = false
	}

	function keydown(event) {
		if (event.key == 'Escape') {
			event.preventDefault()
			value = original
			editing = false
		}
	}
	
	function focus(element) {
		element.focus()
	}
</script>

{#if editing}
	<form on:submit|preventDefault={submit} on:keydown={keydown}>
		<input bind:value on:blur={submit} {required} use:focus/>
	</form>
{:else}
	<div on:click={edit} role="textbox" tabindex="0">
	{#if value !== ""}
		{value}
	{:else}
		<em class="text-gray-600">empty</em>
	{/if}
	</div>
{/if}

<style>
	input {
		border: none;
		background: none;
		font-size: inherit;
		color: inherit;
		font-weight: inherit;
		text-align: inherit;
		box-shadow: none;
	}
</style>

