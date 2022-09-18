import { Duration } from 'luxon'
import { API } from '../lib/api.js'
import { createCache } from '../lib/cache.js'
import type { PageServerLoad } from './$types'

const fetchCanteens = createCache(
	'canteens',
	API.canteens.list,
	Duration.fromObject({ minutes: 10 })
)

export const load: PageServerLoad = async () => {
	return {
		canteens: await fetchCanteens()
	}
}
