<script>
	import Cell from "./Cell.svelte";
	import { THRIFT } from "../Thrift/Types.js";
	import { getThriftStruct } from "$lib/Thrift/IDL/interact";
	import Field from "./Thrift/IDL/Field.svelte";

	/** @type {any} */
	export let obj;

	/** @type {string} */
	export let jsonPath;

	/** @type {string} */
	export let type = "rec";

	/** @type {import("@creditkarma/thrift-parser").FieldDefinition?} */
	export let key_definition = null;

	/** @type {import("@creditkarma/thrift-parser").FieldDefinition?} */
	export let value_definition = null;

	/** @type {string?} */
	export let struct = null;

	/** @type {number?} */
	export let messageType = null;

	/** @type {import("@creditkarma/thrift-parser").FieldDefinition[]} */
	let fields = getThriftStruct(struct, messageType);

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


	/**
	 * @param {string} i
	 * @returns {import("@creditkarma/thrift-parser").FieldDefinition | undefined}
	 */
	function getStruct(i) {
		console.warn(`> getStruct(${i}): [struct ${struct}]`);
		console.warn({fields});

		if (!struct || !fields) {
			return undefined;
		}

		return fields.find(field => field.fieldID?.value === +i);
	}


	/**
	 * @param {string} i
	 * @returns {string?}
	 */
	function getSubStruct(i) {
		let field = getStruct(i);

		if (!field) {
			return null;
		}

		switch (field.fieldType.type) {
			case "MapType":
			case "ListType":
			case "SetType":
				// TODO: Do something with nested value types or something
				return /** @type {import("@creditkarma/thrift-parser").SetType} */ (field.fieldType).valueType?.value;

			case "Identifier":
			default:
				return /** @type {import("@creditkarma/thrift-parser").Identifier} */ (field.fieldType).value;
		}
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

						<th scope="col"
							class="px-6 py-3"
							data-type="{cell_type}"
							data-json-path="{subpath}">
							<Field data={getStruct(column[0])} index={column[0]} type={cell_type} />
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
						<Field data={key_definition} container="key" type={map_key_type} />
					</th>
					<th scope="col"
						class="px-6 py-3"
						data-type="{map_value_type}"
						data-json-path="{subpath}">
						<Field data={value_definition} container="value" type={map_value_type} />
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
						<Field data={value_definition} container="value" type={lst_type} />
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
						<Field data={value_definition} container="value" type={set_type} />
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
						{@const sub_struct = getSubStruct(field[0])}
						{@const str = getStruct(field[0])}
						{@const key_def = str?.fieldType?.keyType}
						{@const value_def = str?.fieldType?.valueType}

						<td class="px-6 py-4"
							data-type="{cell_type}"
							data-json-path="{subpath}">
							{#if THRIFT.DATA_TYPES[cell_type].is_container}
								<svelte:self obj={value} jsonPath={subpath} type={cell_type} struct={sub_struct} key_definition={key_def} value_definition={value_def} />
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
							class="px-6 py-4 bg-gray-900">
							<em>{key}</em>
						</th>
						<td class="px-6 py-4"
							data-type="{type}"
							data-json-path="{subpath}">
							{#if THRIFT.DATA_TYPES[obj[1]].is_container}
								<svelte:self obj={entry} jsonPath={subpath} type={map_entry_type} struct={struct} />
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
							class="px-6 py-4 w-10 bg-gray-900">
							<em>{i}</em>
						</th>
						<td class="px-6 py-4"
							data-key="{i}"
							data-type="{lst_type}"
							data-json-path="{subpath}">
							{#if THRIFT.DATA_TYPES[lst_type].is_container}
								<svelte:self obj={entry} jsonPath={subpath} type={lst_type} struct={struct} />
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
							class="px-6 py-4 w-10 bg-gray-900">
							<em>{i}</em>
						</th>
						<td class="px-6 py-4"
							data-key="{i}"
							data-type="{set_type}"
							data-json-path="{subpath}">
							{#if THRIFT.DATA_TYPES[set_type].is_container}
								<svelte:self obj={entry} jsonPath={subpath} type={set_type} struct={struct} />
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

