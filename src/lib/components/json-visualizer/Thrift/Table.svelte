<script>
	import { THRIFT } from "./Types.js";

	export let obj;
	export let type = "rec";
</script>

{#if type === "rec" || type === "lst"}
	<table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
		<thead class="text-xs text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
			<tr>
				{#if type === "rec"}
					{#each Object.entries(obj) as column}
						<th scope="col" class="px-6 py-3">
							{column[0]}
							<em>({THRIFT.DATA_TYPES[Object.keys(column[1])[0]].name})</em>
						</th>
					{/each}
				{:else}
					<th scope="col" class="px-6 py-3">
						index
					</th>
					<th scope="col" class="px-6 py-3">
						<em>({THRIFT.DATA_TYPES[obj[0]].name})</em>
					</th>
				{/if}
			</tr>
		</thead>
		<tbody>
			{#if type === "rec"}
				<tr class="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
					{#each Object.entries(obj) as field}
						{@const entry = Object.entries(field[1])[0]}
						{@const key = entry[0]}
						{@const value = entry[1]}
						<td class="px-6 py-4">
							{#if THRIFT.DATA_TYPES[key].is_complex}
								<svelte:self obj={value} type={key} />
							{:else}
								{value}
							{/if}
						</td>
					{/each}
				</tr>
			{:else}
				{#each obj.slice(2) as item, i}
					<tr class="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
						<th class="px-6 py-4">
							{i}
						</th>
						{#each Object.entries(item) as field}
							{@const entry = field}
							{@const key = entry[0]}
							{@const value = entry[1]}
							<td class="px-6 py-4">
								{#if THRIFT.DATA_TYPES[key].is_complex}
									<svelte:self obj={value} type={key} />
								{:else}
									{value}
								{/if}
							</td>
						{/each}
					</tr>
				{/each}
			{/if}
		</tbody>
	</table>
{:else}
	<p>OBJECT TYPE NOT IMPLEMENTED</p>
	<p>{type} - {JSON.stringify(obj)}</p>
{/if}
