<script>
	import { THRIFT } from "./Types.js";

	export let obj;
	export let jsonPath;
	export let type = "rec";

	console.log("\n\n\n");
	console.log("vvv obj vvv");
	console.log(obj);
	console.log("^^^");
	console.log({ type, jsonPath });
</script>

{#if ["rec", "lst", "map"].includes(type)}
	<table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
		<thead class="text-xs text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
			<tr>
				{#if type === "rec"}
					{#each Object.entries(obj) as column}
						<th scope="col"
							class="px-6 py-3"
							data-type="{Object.keys(column[1])[0]}"
							data-json-path="{`${jsonPath}[${column[0]}]`}">
							{column[0]}
							<em>({THRIFT.DATA_TYPES[Object.keys(column[1])[0]].name})</em>
						</th>
					{/each}
				{:else if type === "map"}
					<th scope="col" class="px-6 py-3">Key</th>
					<th scope="col" class="px-6 py-3">Value</th>
				{:else if type === "lst"}
					<th scope="col" class="px-6 py-3">
						index
					</th>
					<th scope="col"
						class="px-6 py-3"
						data-type="{obj[0]}"
						data-json-path="{jsonPath}">
						<em>({THRIFT.DATA_TYPES[obj[0]].name})</em>
					</th>
				{:else}
					<th scope="col" class="px-6 py-3">
						UNDEFINED {type}
					</th>
				{/if}
			</tr>
		</thead>
		<tbody data-obj="{JSON.stringify(obj)}">
			{#if type === "rec"}
				<tr class="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
					{#each Object.entries(obj) as field}
						{@const entry = Object.entries(field[1])[0]}
						{@const key = entry[0]}
						{@const value = entry[1]}
						{@const subpath = `${jsonPath}[${field[0]}][${key}]`}
						<td class="px-6 py-4"
							data-type="{type}"
							data-json-path="{subpath}">
							{#if THRIFT.DATA_TYPES[key].is_complex}
								<svelte:self obj={value} jsonPath={subpath} type={key} />
							{:else}
								{value}
							{/if}
						</td>
					{/each}
				</tr>
			{:else if type === "map"}
				{#each Object.entries(obj[3]) as row}
					{@const subpath = `${jsonPath}[3][${row[0]}]` }
					{@const key = row[0]}
					{@const value = row[1]}
					<tr class="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
						<th class="px-6 py-4">
							{key}
						<td class="px-6 py-4"
							data-type="{type}"
							data-json-path="{subpath}">
							{#if THRIFT.DATA_TYPES[obj[1]].is_complex}
								<svelte:self obj={value} jsonPath={subpath} type={key} />
							{:else}
								{value}
							{/if}
						</td>
					</tr>
				{/each}
			{:else if type === "lst"}
				{#each obj.slice(2) as item, i}
					{@const sub = `${jsonPath}`}
					<tr class="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
						<th class="px-6 py-4">
							{i}
						</th>
						{#each Object.entries(item) as field}
							{@const subpath = `${sub}[${i+2}]`}
							{@const entry = field}
							{@const key = entry[0]}
							{@const value = entry[1]}
							<td class="px-6 py-4"
								data-type="{type}"
								data-key="{key}"
								data-thrift-type="{obj[0]}"
								data-json-path="{subpath}">
								{#if THRIFT.DATA_TYPES[obj[0]].is_complex}
									<svelte:self obj={value} jsonPath={subpath} type={key} />
								{:else}
									{value}
								{/if}
							</td>
						{/each}
					</tr>
				{/each}
			{:else}
				<p>OBJECT FIELD NOT IMPLEMENTED</p>
				<p>{type}</p>
			{/if}
		</tbody>
	</table>
{:else}
	<p>OBJECT TYPE NOT IMPLEMENTED</p>
	<p>{type} - {JSON.stringify(obj)}</p>
{/if}
