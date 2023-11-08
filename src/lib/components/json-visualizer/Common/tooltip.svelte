<script>

	/** @type {string} */
	export let hint;
	
	/** @type {any} */
	export let props;
</script>

{#if hint}
	<div class="hint hint--top" data-hint="{hint}" {...props}>
		<slot />
	</div>
{:else}
	<slot />
{/if}

<style>
/* Kudos to Miron from StackOverflow for the following styling! (Adapted to our desire)
 * https://stackoverflow.com/a/47431328
 */
.hint {
  position: relative;
  display: inline-block;
  /*margin-top: 40px;*/
}

.hint:before,
.hint:after {
  position: absolute;
  opacity: 0;
  transition: 0.1s ease;
  -webkit-transition: 0.1s ease;
  -moz-transition: 0.1s ease;
  pointer-events: none;
}

.hint:hover:before,
.hint:hover:after {
  opacity: 1;
}

.hint:before {
  content: '';
  position: absolute;
  background: rgba(0, 0, 0, 1);
  width: 6px;
  height: 6px;
  transform: translateX(-50%) rotate(45deg);
  z-index: 2;
}

.hint:after {
  content: attr(data-hint);
  background: rgba(0, 0, 0, 1);
  /*border-bottom-left-radius: 20px;*/
  /*border-top-right-radius: 20px;*/
  color: white;
  padding: 8px 10px;
  font-size: 16px;
  font-style: italic;
  white-space: nowrap;
  box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.4);
  transform: translateX(-50%);
  z-index: 1;
}


/* top mouse-icon*/

.hint--top:before {
    bottom: 100%;
    left: 50%;
    margin: 0 0 -12px 0;
}

.hint--top:after {
  bottom: 100%;
  left: 50%;
  margin: 0 0 -6px -10px;
}


/*arrow key*/

.hint--top:hover:before {
    margin-bottom: 0px;
    /* border-width: 2px; */
    width: 24px;
    height: 24px;
    /* margin-left: -56px; */
    border-color: #62BA46;
    border-width: 0 2px 2px 0;
    border-top-left-radius: 100%;
    box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.4);
    /* border-top-color: rgba(0, 0, 0, 0.8); */
}

.hint--top:hover:after {
  margin-bottom: 12px;
  /*border-width: 10px;*/
  /*margin-left: -50px;*/
  /*border-top-color: rgba(0, 0, 0, 0.8);*/
  border-bottom: 2px solid #62BA46;
}
</style>
