<script>
	import ThriftObjectDisplay from '$components/json-visualizer/Thrift/ThriftObjectDisplay.svelte';

	let userInput = '';
</script>

<main>
	<h1 class="text-2xl font-bold text-center text-gray-800 dark:text-gray-100 md:text-3xl">Thrift Message Visualizer</h1>

	<form class="my-6">
		<div class="flex flex-col text-sm mb-2">
			<label for="thriftObject" class="font-bold mb-2 text-gray-800 dark:text-gray-100">Input Message</label>
			<textarea bind:value={userInput} name="thriftObject" rows="8"
				class="appearance-none border border-gray-200 p-2 focus:outline-none focus:border-gray-500 shadow-lg rounded-lg"
			></textarea>
		</div>
	</form>

	<hr />

	<p>
	{#if userInput}
		<ThriftObjectDisplay json={userInput} />
	{/if}
	</p>
</main>
