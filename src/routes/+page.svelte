<script>
	import ThriftObjectDisplay from '$components/ThriftObjectDisplay.svelte';
	import { json } from '../stores';
	import { document, service } from '$lib/Thrift/IDL/stores.js';
	import DefinitionTab from '$components/Thrift/DefinitionTab.svelte';

	let activeTab = "Message";

	function setActiveTab(/** @type {string} */ selectedTab) {
		activeTab = selectedTab;
	}

	let activeTabClass = "inline-block p-4 text-blue-600 bg-gray-100 rounded-t-lg active dark:bg-gray-800 dark:text-gray-100";
	let inactiveTabClass = "inline-block p-4 rounded-t-lg hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300";
</script>

<main class="mt-5">
	<h1 class="text-2xl font-bold text-center text-gray-800 dark:text-gray-100 md:text-3xl">Thrift Message Visualizer</h1>



	<ul class="flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400">
		<li class="me-2">
			<button type="button"
					on:click={() => setActiveTab("Message")}
					class={(activeTab === "Message") ? activeTabClass : inactiveTabClass}>Message</button>
		</li>
		<li class="me-2">
			<button type="button"
					on:click={() => setActiveTab("Definition")}
					class={(activeTab === "Definition") ? activeTabClass : inactiveTabClass}>Definition File</button>
		</li>
		<li class="me-2">
			<button type="button"
					on:click={() => setActiveTab("Debug")}
					class={(activeTab === "Debug") ? activeTabClass : inactiveTabClass}>Debug</button>
		</li>
	</ul>

	{#if activeTab === "Message"}
		<form class="my-6">
			<fieldset class="mt-6">
				<div class="flex flex-col text-sm mb-2">
					<label for="json" class="font-bold mb-2 text-gray-800 dark:text-gray-100">Message</label>
					<textarea bind:value={$json} name="json" rows="8"
						class="appearance-none border border-gray-200 p-2 focus:outline-none focus:border-gray-500 shadow-lg rounded-lg"
						placeholder="Paste Thrift Message Payload Here!"
					></textarea>
				</div>
			</fieldset>
		</form>

		<hr />

		{#if $json}
			<ThriftObjectDisplay json={$json} />
		{/if}
	{:else if activeTab === "Definition"}
		<DefinitionTab />
	{:else if activeTab === "Debug"}
		<div class="my-6 dark:text-gray-400">
			document: {JSON.stringify($document)}
			<hr />
			service: {JSON.stringify($service)}
		</div>
	{/if}

</main>

