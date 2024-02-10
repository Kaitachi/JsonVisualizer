<script>
	import ThriftObjectDisplay from '$components/json-visualizer/Thrift/ThriftObjectDisplay.svelte';
	import { payload } from '../stores';
</script>

<main>
	<h1 class="text-2xl font-bold text-center text-gray-800 dark:text-gray-100 md:text-3xl">Thrift Message Visualizer</h1>

	<form class="my-6">
		<fieldset>
			<div class="flex flex-col text-sm mb-2">
				<label for="payload" class="font-bold mb-2 text-gray-800 dark:text-gray-100">Input Message</label>
				<textarea bind:value={$payload} name="payload" rows="8"
					class="appearance-none border border-gray-200 p-2 focus:outline-none focus:border-gray-500 shadow-lg rounded-lg"
				></textarea>
			</div>
		</fieldset>
	</form>

	<hr />
	
	<p>
	{#if $payload}
		<ThriftObjectDisplay json={$payload} />
	{/if}
	</p>
</main>
