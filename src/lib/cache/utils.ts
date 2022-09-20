import { DateTime, type Duration } from 'luxon'
import type { CacheItem } from './types.js'

export function isValid<T>(cacheItem: CacheItem<T>, interval: Duration): boolean {
	return (
		cacheItem.data !== undefined &&
		cacheItem.timestamp !== undefined &&
		DateTime.now() <= cacheItem.timestamp.plus(interval)
	)
}
