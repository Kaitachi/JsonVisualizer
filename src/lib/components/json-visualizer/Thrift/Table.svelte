<script>
	import { THRIFT } from "./Types.js";

	export let obj;
	export let jsonPath;
	export let type = "rec";
</script>


{@debug jsonPath, type, obj}
{#if ["rec", "lst", "map", "set"].includes(type)}
	<table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
		<thead class="text-xs text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
			<tr>
				{#if type === "rec"}
					{#each Object.entries(obj) as column}
						{@const cell_type = Object.keys(column[1])[0]}
						{@const subpath = `${jsonPath}[${column[0]}]`}
						{@const cell_type_name = THRIFT.DATA_TYPES[cell_type].name}

						{@debug subpath, column, cell_type, cell_type_name}
						<th scope="col"
							class="px-6 py-3"
							data-type="{cell_type}"
							data-json-path="{subpath}">
							{column[0]}
							<em>({cell_type_name})</em>
						</th>
					{/each}
				{:else if type === "map"}
					{@const map_key_type = obj[0]}
					{@const map_value_type = obj[1]}
					{@const map_count = obj[2]}
					{@const subpath = `${jsonPath}...`}

					{@debug subpath, map_key_type, map_value_type, map_count}
					<th scope="col"
						class="px-6 py-3">
						Key <em>({THRIFT.DATA_TYPES[map_key_type].name})</em>
					</th>
					<th scope="col"
						class="px-6 py-3">
						Value <em>({THRIFT.DATA_TYPES[map_value_type].name})
					</th>
				{:else if type === "lst"}
					{@const lst_type = obj[0]}
					{@const subpath = `${jsonPath}...`}

					{@debug subpath, lst_type}
					<th scope="col"
						class="px-6 py-3">
						Index
					</th>
					<th scope="col"
						class="px-6 py-3"
						data-type="{lst_type}"
						data-json-path="{subpath}">
						<em>({THRIFT.DATA_TYPES[obj[0]].name})</em>
					</th>
				{:else if type === "set"}
					{@const subpath = `${jsonPath}...`}

					{@debug subpath}
					<th scope="col"
						class="px-6 py-3">
						Elements <em>({THRIFT.DATA_TYPES[obj[0]].name})</em>
					</th>
				{:else}
					<th scope="col"
						class="px-6 py-3">
						UNDEFINED {type}
					</th>
				{/if}
			</tr>
		</thead>
		<tbody data-obj="{JSON.stringify(obj)}">
			{#if type === "rec"}
				<tr class="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
					{@debug obj}

					{#each Object.entries(obj) as field}
						{@const entry = Object.entries(field[1])[0]}
						{@const cell_type = entry[0]}
						{@const value = entry[1]}
						{@const subpath = `${jsonPath}[${field[0]}][${cell_type}]`}

						{@debug subpath, entry}
						<td class="px-6 py-4"
							data-type="{cell_type}"
							data-json-path="{subpath}">
							{#if THRIFT.DATA_TYPES[cell_type].is_complex}
								<svelte:self obj={value} jsonPath={subpath} type={cell_type} />
							{:else}
								{value}
							{/if}
						</td>
					{/each}
				</tr>
			{:else if type === "map"}
				{@const map_key_type = obj[0]}
				{@const map_value_type = obj[1]}
				{@const map_count = obj[2]}
				{@debug map_key_type, map_value_type, map_count}

				{#each Object.entries(obj[3]) as row}
					{@const key = row[0]}
					{@const value = row[1]}
					{@const subpath = `${jsonPath}[3][${key}]` }

					<tr class="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
						<th class="px-6 py-4">
							{key}
						<td class="px-6 py-4"
							data-type="{type}"
							data-json-path="{subpath}">
							{#if THRIFT.DATA_TYPES[obj[1]].is_complex}
								<svelte:self obj={value} jsonPath={subpath} type={map_value_type} />
							{:else}
								{value}
							{/if}
						</td>
					</tr>
				{/each}
			{:else if type === "lst"}
				{@const lst_type = obj[0]}
				{@const lst_count = obj[1]}

				{#each obj.slice(2) as item, i}
					{@const subpath = `${jsonPath}[${i+2}]`}

					<tr class="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
						<th class="px-6 py-4">
							{i}
						</th>
						<td class="px-6 py-4"
							data-key="{i}"
							data-type="{lst_type}"
							data-json-path="{subpath}">
							{#if THRIFT.DATA_TYPES[lst_type].is_complex}
								<svelte:self obj={item} jsonPath={subpath} type={lst_type} />
							{:else}
								{item}
							{/if}
						</td>
					</tr>
				{/each}
			{:else if type === "set"}
				{@const set_type = obj[0]}
				{@const set_count = obj[1]}

				{#each obj.slice(2) as item, i}
					{@const subpath = `${jsonPath}[${i+2}]`}

					<tr class="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
						<td class="px-6 py-4"
							data-key="{i}"
							data-type="{set_type}"
							data-json-path="{subpath}">
							{#if THRIFT.DATA_TYPES[set_type].is_complex}
								<svelte:self obj={item} jsonPath={subpath} type={set_type} />
							{:else}
								{item}
							{/if}
						</td>
					</tr>
				{/each}
			{:else}
				<p>OBJECT FIELD NOT IMPLEMENTED</p>
				<p>{type} - {JSON.stringify(obj)}</p>
			{/if}
		</tbody>
	</table>
{:else}
	<p>OBJECT TYPE NOT IMPLEMENTED</p>
	<p>{type} - {JSON.stringify(obj)}</p>
{/if}
