import { writable, type Writable } from 'svelte/store'

/// A writable svelte store that backs up its contents to localstorage if possible.
///
/// It has the advantage of the builtin `writable` store that data also survives a reload.
export class LocalStorageStore<T> {
	private readonly store: Writable<T>

	constructor(
		private readonly localstorageKey: string,
		private readonly encode: (value: T) => string,
		private readonly decode: (value: string) => T,
		private readonly defaultValue: () => T
	) {
		this.store = writable(defaultValue())

		if (this.hasLocalstorage()) {
			const stringData = localStorage.getItem(this.localstorageKey)
			if (stringData) {
				const data = this.decode(stringData)
				this.store.set(data)
			}
		}
	}

	/// Part of the svelte store interface.
	subscribe(run: (value: T) => void, invalidate?: (value?: T) => void): () => void {
		return this.store.subscribe(run, invalidate)
	}

	/// Part of the svelte store interface.
	set(value: T) {
		this.store.set(value)
		if (this.hasLocalstorage()) {
			const stringData = this.encode(value)
			localStorage.setItem(this.localstorageKey, stringData)
		}
	}

	/// Checks if the current environment supports local storage.
	///
	/// When we render on the server, this is not the case. Accessing `localStorage` without checking would then result in a visual error.
	private hasLocalstorage(): boolean {
		return typeof localStorage !== 'undefined'
	}
}
