<script>
	import Cell from "./Cell.svelte";
	import { THRIFT } from "../Thrift/Types.js";

	/** @type {any} */
	export let obj;

	/** @type {string} */
	export let jsonPath;

	/** @type {string} */
	export let type = "rec";

	/** @type {string?} */
	export let thriftType = null;

	/** @type {string} */
	export let thriftMetadata = "struct";

	/** @type {import("$lib/Thrift/IDL/Lexer/Parser").Field[]} */
	export let thriftFields = [];

	/** @type {string} */
	let warn = "";

	switch (type) {
		case "map":
			if (Object.entries(obj[3]).length != obj[2]) {
				warn = "MAP COUNT MISMATCH!";
			}
			break;

		case "lst":
			if (obj.length - 2 != obj[1]) {
				warn = "LIST COUNT MISMATCH!";
			}
			break;

		case "set":
			if (obj.length - 2 != obj[1]) {
				warn = "SET COUNT MISMATCH!";
			}
			break;
	}

	// Get list of fields for current node
	switch (thriftMetadata) {
		// Currently at top-level. Let's search our fields from the signature
		// Access current service function

		case "REQUEST":
		// If current payload is request, get function params (fields)
			break;

		case "RESPONSE":
		// If current payload is response, get output params (returns/throws)
			break;

		case "struct":
		// Currently NOT at top-level. Safe to search our fields from one of the defined structs
		// Search struct in definition list
			break;
	}

	/**
	 * @param {string} index
	 * @returns {string}
	 */
	function fieldName(index) {
		if (!thriftFields.length) {
			return "";
		}

		let field = thriftFields
				.find(field => field.id === +index)
				?.identifier;

		return (field) ? `: ${field}` : "";
	}

	/**
	 * @param {string} index
	 * @returns {string}
	 */
	function fieldType(index) {
		if (!thriftFields.length) {
			return "";
		}

		let t = thriftFields
				.find(field => field.id === +index)
				?.type;

		return (t) ? ` - type ${t}` : "";
	}
</script>


{#if ["rec", "lst", "map", "set"].includes(type)}
	<table class="w-full text-sm text-left text-gray-500 dark:text-gray-400 border-separate">
		<thead class="text-xs text-gray-200 bg-gray-800 dark:bg-neutral-700 dark:text-gray-100">
			{#if warn}
				<tr>
					<th colspan="2"
						class="px-6 py-3 bg-red-500 text-white">
						<em>{warn}</em>
					</th>
				</tr>
			{/if}
			<tr>
				{#if type === "rec"}
					{#each Object.entries(obj) as column}
						{@const cell_type = Object.keys(column[1])[0]}
						{@const subpath = `${jsonPath}[${column[0]}]`}
						{@const cell_type_name = THRIFT.DATA_TYPES[cell_type].name}


						<th scope="col"
							class="px-6 py-3"
							data-type="{cell_type}"
							data-json-path="{subpath}">
							{column[0]}{fieldName(column[0])}
							<em>({cell_type_name}{fieldType(column[0])})</em>
						</th>
					{/each}
				{:else if type === "map"}
					{@const map_key_type = obj[0]}
					{@const map_value_type = obj[1]}
					{@const map_count = obj[2]}
					{@const subpath = `${jsonPath}...`}

					<th scope="col"
						class="px-6 py-3"
						data-type="{map_key_type}">
						Key <em>({THRIFT.DATA_TYPES[map_key_type].name})</em>
					</th>
					<th scope="col"
						class="px-6 py-3"
						data-type="{map_value_type}"
						data-json-path="{subpath}">
						Value <em>({THRIFT.DATA_TYPES[map_value_type].name})
					</th>
				{:else if type === "lst"}
					{@const lst_type = obj[0]}
					{@const subpath = `${jsonPath}...`}

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
					{@const set_type = obj[0]}
					{@const subpath = `${jsonPath}...`}

					<th scope="col"
						class="px-6 py-3">
						Index
					</th>
					<th scope="col"
						class="px-6 py-3"
						data-type="{set_type}"
						data-json-path="{subpath}">
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
				<tr class="bg-slate-400 bg-opacity-25 border-b dark:bg-neutral-900 dark:border-gray-700 dark:bg-opacity-25">
					{#each Object.entries(obj) as field}
						{@const entry = Object.entries(field[1])[0]}
						{@const cell_type = entry[0]}
						{@const value = entry[1]}
						{@const subpath = `${jsonPath}[${field[0]}]['${cell_type}']`}

						<td class="px-6 py-4"
							data-type="{cell_type}"
							data-json-path="{subpath}">
							{#if THRIFT.DATA_TYPES[cell_type].is_container}
								<svelte:self obj={value} jsonPath={subpath} type={cell_type} />
							{:else}
								<Cell entry={entry} path={subpath} />
							{/if}
						</td>
					{/each}
				</tr>
			{:else if type === "map"}
				{@const map_key_type = obj[0]}
				{@const map_entry_type = obj[1]}
				{@const map_count = obj[2]}

				{#each Object.entries(obj[3]) as row}
					{@const key = row[0]}
					{@const entry = row[1]}
					{@const subpath = `${jsonPath}[3]['${key}']` }

					<tr class="bg-slate-400 bg-opacity-25 border-b dark:bg-neutral-900 dark:border-gray-700 dark:bg-opacity-25">
						<th scope="row"
							class="px-6 py-4">
							{key}
						</th>
						<td class="px-6 py-4"
							data-type="{type}"
							data-json-path="{subpath}">
							{#if THRIFT.DATA_TYPES[obj[1]].is_container}
								<svelte:self obj={entry} jsonPath={subpath} type={map_entry_type} />
							{:else}
								<Cell entry={[map_entry_type, entry]} path={subpath} />
							{/if}
						</td>
					</tr>
				{/each}
			{:else if type === "lst"}
				{@const lst_type = obj[0]}
				{@const lst_count = obj[1]}

				{#each obj.slice(2) as entry, i}
					{@const row = Object.entries(entry)}
					{@const subpath = `${jsonPath}[${i+2}]`}

					<tr class="bg-slate-400 bg-opacity-25 border-b dark:bg-neutral-900 dark:border-gray-700 dark:bg-opacity-25">
						<th scope="row"
							class="px-6 py-4">
							{i}
						</th>
						<td class="px-6 py-4"
							data-key="{i}"
							data-type="{lst_type}"
							data-json-path="{subpath}">
							{#if THRIFT.DATA_TYPES[lst_type].is_container}
								<svelte:self obj={entry} jsonPath={subpath} type={lst_type} />
							{:else}
								<Cell entry={[lst_type, entry]} path={subpath} />
							{/if}
						</td>
					</tr>
				{/each}
			{:else if type === "set"}
				{@const set_type = obj[0]}
				{@const set_count = obj[1]}

				{#each obj.slice(2) as entry, i}
					{@const row = Object.entries(entry)}
					{@const subpath = `${jsonPath}[${i+2}]`}

					<tr class="bg-slate-400 bg-opacity-25 border-b dark:bg-neutral-900 dark:border-gray-700 dark:bg-opacity-25">
						<th scope="row"
							class="px-6 py-4">
							{i}
						</th>
						<td class="px-6 py-4"
							data-key="{i}"
							data-type="{set_type}"
							data-json-path="{subpath}">
							{#if THRIFT.DATA_TYPES[set_type].is_container}
								<svelte:self obj={entry} jsonPath={subpath} type={set_type} />
							{:else}
								<Cell entry={[set_type, entry]} path={subpath} />
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
