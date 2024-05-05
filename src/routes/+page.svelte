<script>
	import ThriftObjectDisplay from '$components/ThriftObjectDisplay.svelte';
	import { json } from '../stores';
	import { source, document, service } from '$lib/Thrift/IDL/stores.js';

	let activeTab = "Debug";

	function setActiveTab(/** @type {string} */ selectedTab) {
		activeTab = selectedTab;
	}

	let activeTabClass = "inline-block p-4 text-blue-600 bg-gray-100 rounded-t-lg active dark:bg-gray-800 dark:text-gray-100";
	let inactiveTabClass = "inline-block p-4 rounded-t-lg hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300";
</script>

<!-- Breadcrumb -->
<nav class="flex px-5 py-3 text-gray-700 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700" aria-label="Breadcrumb">
  <ol class="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
    <li class="inline-flex items-center">
      <a href="#" class="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white">
        <svg class="w-3 h-3 me-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
          <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z"/>
        </svg>
        Home
      </a>
    </li>
    <li>
      <div class="flex items-center">
        <svg class="rtl:rotate-180 block w-3 h-3 mx-1 text-gray-400 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"/>
        </svg>
        <a href="projects/" class="ms-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ms-2 dark:text-gray-400 dark:hover:text-white">Projects</a>
      </div>
    </li>
    <li aria-current="page">
      <div class="flex items-center">
        <svg class="rtl:rotate-180  w-3 h-3 mx-1 text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"/>
        </svg>
        <span class="ms-1 text-sm font-medium text-gray-500 md:ms-2 dark:text-gray-400">Thrift Message Visualizer</span>
      </div>
    </li>
  </ol>
</nav>


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
					></textarea>
				</div>
			</fieldset>
		</form>

		<hr />

		{#if $json}
			<ThriftObjectDisplay json={$json} />
		{/if}
	{:else if activeTab === "Definition"}
		<form class="my-6">
			<fieldset>
				<div class="flex flex-col text-sm mb-2">
					<label for="source" class="font-bold mb-2 text-gray-800 dark:text-gray-100">Thrift Definition File</label>
					<textarea bind:value={$source} name="source" rows="12"
						class="appearance-none border border-gray-200 p-2 focus:outline-none focus:border-gray-500 shadow-lg rounded-lg"
					></textarea>
				</div>
			</fieldset>
		</form>

		<hr>

		<div class="mt-3 dark:text-gray-400">
			Definition Table Display coming soon&trade;!
		</div>
	{:else if activeTab === "Debug"}
		<div class="my-6 dark:text-gray-400">
			document: {JSON.stringify($document)}
			<hr />
			service: {JSON.stringify($service)}
		</div>
	{/if}

</main>

