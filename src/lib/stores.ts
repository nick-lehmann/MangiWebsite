import type { CacheItem } from './cache.js'
import { LocalStorageStore } from './localstorage.js'
import type { CanteenID, DayString, Meal } from './types.js'

type MealsPerDayCache = Partial<Record<DayString, CacheItem<Meal[]>>>
type DayCache = Partial<Record<CanteenID, MealsPerDayCache>>

export const daysStore = new LocalStorageStore<DayCache>(
	'days',
	(value) => JSON.stringify(value),
	(value) => JSON.parse(value),
	() => ({})
)
