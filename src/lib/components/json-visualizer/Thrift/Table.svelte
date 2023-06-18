<script>
	import { THRIFT } from "./Types.js";

	export let obj;
</script>

<thead class="text-xs text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
	<tr>
		{#each Object.entries(obj) as column}
			<th scope="col" class="px-6 py-3">
				{column[0]}
				<em>({Object.keys(column[1])[0]})</em>
			</th>
		{/each}
	</tr>
</thead>
<tbody>
	<tr class="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
		{#each Object.entries(obj) as field}
			{@const entry = Object.entries(field[1])[0]}
			{@const key = entry[0]}
			{@const value = entry[1]}
			<td class="px-6 py-4">
				{#if key == "map"}
					MAP OBJECT (WIP)
				{:else if key == "lst"}
					LIST OBJECT (WIP)
				{:else if key == "rec"}
					RECORD OBJECT (WIP)
				{:else}
					{value}
				{/if}
			</td>
		{/each}
	</tr>
</tbody>
