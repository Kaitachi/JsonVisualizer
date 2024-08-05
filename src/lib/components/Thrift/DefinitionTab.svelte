<script>
	import { service as selectedService } from "../../../stores.js";
	import { document, source } from "$lib/Thrift/IDL/stores.js";
	import Service from "./IDL/Service.svelte";

	/** @type {import("@creditkarma/thrift-parser").ServiceDefinition[]} */
	let available_services = [];
	
	$: {
		available_services = /** @type {import("@creditkarma/thrift-parser").ServiceDefinition[]} */ 
							($document?.body.filter(item => item.type === "ServiceDefinition"));
	}

</script>
<form class="my-6">
	<fieldset>
		<div class="flex flex-col text-sm mb-2">
			<label for="source" class="font-bold mb-2 text-gray-800 dark:text-gray-100">Thrift Definition File</label>
			<textarea bind:value={$source} name="source" rows="12"
				class="appearance-none border border-gray-200 p-2 focus:outline-none focus:border-gray-500 shadow-lg rounded-lg"
			></textarea>
		</div>
		<div class="bg-jimmy-lite-100 dark:bg-jimmy-night-700 shadow-lg p-6 rounded-lg">
			<div class="text-sm leading-6 text-slate-900 dark:text-gray-100 font-semibold select-none">
				Document Options
			</div>
			<div class="mt-3 text-sm leading-6 text-slate-600 dark:text-gray-100">
				<dl class="divide-y divide-gray-100">
					<div class="px-4 py-6 sm:grid sm:grid-cols-6 sm:gap-4 sm:px-0">
						<dt class="text-sm font-medium leading-6"><label for="selectedService">Selected Service</label></dt>
						<dd class="mt-1 text-sm leading-6 text-gray-500 sm:col-span-5 sm:mt-0 font-normal dark:text-gray-400">
							<select id="selectedService" bind:value={$selectedService} class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6">
								{#if available_services}
									{#each available_services as svc}
										<option selected={$selectedService === svc.name.value}>{svc.name.value}</option>
									{/each}
								{:else}
									<option disabled>No services available</option>
								{/if}
							</select>
						</dd>
					</div>
				</dl>
			</div>
		</div>
	</fieldset>
</form>

<hr>

<div class="mt-3 dark:text-gray-400">
	<Service />
</div>
