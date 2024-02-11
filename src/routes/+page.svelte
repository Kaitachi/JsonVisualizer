<script>
	import ThriftObjectDisplay from '$components/json-visualizer/Thrift/ThriftObjectDisplay.svelte';
	import { selectedThriftService, payload } from '../stores';

</script>

<main>
	<h1 class="text-2xl font-bold text-center text-gray-800 dark:text-gray-100 md:text-3xl">Thrift Message Visualizer</h1>

	<form class="my-6">
		<fieldset class="flex">
			<div class="flex flex-col w-1/3 text-sm mb-2">
				<label for="selectedThriftService" class="font-bold mb-2 text-gray-800 dark:text-gray-100">Thrift Definition File</label>
				<select bind:value={$selectedThriftService} name="selectedThriftService">
					<option value="">- NONE -</option>
					<option value="testService">testService</option>
					<option value="MultiplicationService">MultiplicationService</option>
					<!-- TODO: add collection of existing Thrift services! -->
				</select>
			</div>
			<div class="flex flex-col w-2/3 text-sm mb-2 ml-5">
				<span class="font-bold mb-2 text-gray-800 dark:text-gray-100">Edit Thrift Files...</span>
			</div>
		</fieldset>
		<fieldset>
			<div class="flex flex-col text-sm mb-2">
				<label for="payload" class="font-bold mb-2 text-gray-800 dark:text-gray-100">Message</label>
				<textarea bind:value={$payload} name="payload" rows="8"
					class="appearance-none border border-gray-200 p-2 focus:outline-none focus:border-gray-500 shadow-lg rounded-lg"
				></textarea>
			</div>
		</fieldset>
	</form>

	<hr />
	
	<p>
	{#if $payload}
		<ThriftObjectDisplay service={$selectedThriftService} json={$payload} />
	{/if}
	</p>
</main>
