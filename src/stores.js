import { browser } from "$app/environment";
import { writable } from "svelte/store";


	/**
	 * Retrieve value from localstorage.
	 * @param {string} key - name of value to be retrieved
	 * @param {any} fallback - fallback value if no corresponding entry is found
	 */
export function fromLocalStorage(key, fallback) {
	if (browser) {
		const value = window.localStorage.getItem(key);

		if (value !== "undefined" && value !== null) {
			return (typeof fallback === "object")
				? JSON.parse(value)
				: value;
		}
	}

	return fallback;
}


	/**
	 * Persist value (from store) in localstorage.
	 * @param {string} key - name of value to be persisted
	 * @param {import("svelte/store").Writable<any>} store - SvelteKit store to be persisted
	 */
export function toLocalStorage(key, store) {
	if (browser) {
		store.subscribe(value => {
			let storageValue = (typeof value === "object")
				? JSON.stringify(value)
				: value;

			window.localStorage.setItem(key, storageValue);
		});
	}
}


	/**
	 * Sync Svelte store with localstorage.
	 * @param {string} key - name of value to be retrieved
	 * @param {any} fallback - fallback value if no corresponding entry is found
	 */
function syncWritable(key, fallback) {
	const localStorageStore = writable(fromLocalStorage(key, fallback));
	toLocalStorage(key, localStorageStore);
	return localStorageStore
}

export const payload = syncWritable("payload", "");
export const thriftServices = syncWritable("thrift.services", {});
export const selectedThriftService = syncWritable("thrift.selected", "");



// window.localStorage.setItem("thrift.services.MultiplicationService", `namespace java tutorial
// namespace py tutorial
//
// /*
//  C like comments are supported
// */
// // This is also a valid comment
//
// typedef i32 int // We can use typedef to get pretty names for the types we are using
// service MultiplicationService
// {
//         int multiply(1:int n1, 2:int n2),
// }`);

