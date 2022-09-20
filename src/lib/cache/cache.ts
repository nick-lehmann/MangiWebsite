import { DateTime, type Duration } from 'luxon'
import type { CacheItem } from './types.js'

export type FetchFunction<T> = () => Promise<T>

export function createCache<T>(
	name: string,
	fetch: FetchFunction<T>,
	cacheInterval: Duration
): FetchFunction<T> {
	let cache: CacheItem<T> = {
		data: undefined,
		timestamp: undefined
	}
	return async () => {
		if (
			cache.data !== undefined &&
			cache.timestamp !== undefined &&
			DateTime.now() <= cache.timestamp.plus(cacheInterval)
		) {
			console.debug(`[Cache] Use cached ${name}`)
			return cache.data
		} else {
			console.debug(`[Cache] Renew ${name}`)
			const data = await fetch()
			cache = {
				data,
				timestamp: DateTime.now()
			}
			return data
		}
	}
}
