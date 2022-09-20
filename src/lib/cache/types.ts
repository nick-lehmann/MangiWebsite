import type { DateTime } from 'luxon'

export type CacheItem<T> = {
	data: T | undefined
	timestamp: DateTime | undefined
}
