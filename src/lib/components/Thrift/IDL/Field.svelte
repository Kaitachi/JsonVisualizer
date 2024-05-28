<script>
	/** @type {import("@creditkarma/thrift-parser").FieldDefinition} */
	export let field;
</script>


{field.fieldID?.value}:
<span class="font-mono px-2 m-2 text-sm ring-1 ring-zinc-400 rounded bg-zinc-400 text-black">{field.name?.value}</span>
<em>({field.fieldType?.value})</em>
