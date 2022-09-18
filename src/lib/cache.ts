import { DateTime, Duration } from 'luxon'

export type CacheItem<T> = {
	data: T | undefined
	timestamp: DateTime | undefined
}

export type FetchFunction<T> = () => Promise<T>

export function createCache<T>(
	name: string,
	fetch: FetchFunction<T>,
	cacheInterval: Duration
): FetchFunction<T> {
	const cache: CacheItem<T> = {
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
			cache.data = data
			cache.timestamp = DateTime.now()
			return data
		}
	}
}
