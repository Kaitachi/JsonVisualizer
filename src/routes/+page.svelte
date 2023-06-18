<script>
	import ThriftObjectDisplay from '$components/json-visualizer/Thrift/ThriftObjectDisplay.svelte';

	let userInput = '';
</script>

<main>
	<h1 class="text-2xl font-bold text-center text-gray-800 md:text-3xl">Thrift Object Visualizer</h1>

	<form class="my-6">
		<div class="flex flex-col text-sm mb-2">
			<label for="thriftObject" class="font-bold mb-2 text-gray-800">Input Object</label>
			<textarea bind:value={userInput} name="thriftObject"
				class="appearance-none shadow-sm border border-gray-200 p-2 focus:outline-none focus:border-gray-500 rounded-lg"
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
