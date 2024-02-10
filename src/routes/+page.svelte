<script>
	import ThriftObjectDisplay from '$components/json-visualizer/Thrift/ThriftObjectDisplay.svelte';
	import { THRIFT } from '$components/json-visualizer/Thrift/Types';
	import { payload, fieldUpdates } from '../stores';
	
	$fieldUpdates = [];

	fieldUpdates.subscribe((currentValue) => {
		if (currentValue && currentValue.length) {
			console.log(`> Received new fieldUpdate entry... ${JSON.stringify(currentValue)}`);

			let inputObject = THRIFT.VALIDATE_THRIFT_MESSAGE($payload);

			currentValue.forEach((item) => {
				console.log(`>> Applying entry: ${item.path} = ${item.value} (${item.type})`);
				
				if (!THRIFT.DATA_TYPES[item.type] || !THRIFT.DATA_TYPES[item.type].is_unquoted) {
					item.value = `"${item.value}"`;
				}

				let replace = `${item.path.replace("$", "inputObject")} = ${item.value}`;
				console.log(`>> replace: ${replace}`);
				eval(replace);

				payload.set(JSON.stringify(inputObject));
				console.log(`>> result: ${JSON.stringify(inputObject)}`);
			});

			$fieldUpdates = [];
		}
	})
</script>

<main>
	<h1 class="text-2xl font-bold text-center text-gray-800 dark:text-gray-100 md:text-3xl">Thrift Message Visualizer</h1>

	<form class="my-6">
		<div class="flex flex-col text-sm mb-2">
			<label for="thriftObject" class="font-bold mb-2 text-gray-800 dark:text-gray-100">Input Message</label>
			<textarea bind:value={$payload} name="thriftObject" rows="8"
				class="appearance-none border border-gray-200 p-2 focus:outline-none focus:border-gray-500 shadow-lg rounded-lg"
			></textarea>
		</div>
	</form>

	<hr />
	
	{#each $fieldUpdates as update }
		{update.path} - {update.value}<br />
	{/each}

	<hr />

	<p>
	{#if $payload}
		<ThriftObjectDisplay json={$payload} />
	{/if}
	</p>
</main>
