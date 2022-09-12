import { API } from '$lib/api.js'
import { openDays } from '../../../lib/utils.js'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ params }) => {
	const canteen_id = Number.parseInt(params.id)

	const [canteen, allDays] = await Promise.all([
		API.canteens.get(canteen_id),
		API.days.list(canteen_id)
	])

	const days = openDays(allDays)

	const meals = days.length > 0 ? await API.meals.list(canteen_id, days[0].date) : []

	return {
		canteen,
		days,
		meals
	}
}
