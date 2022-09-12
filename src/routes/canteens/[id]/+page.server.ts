import { API } from '$lib/api.js'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ params }) => {
	const canteen_id = Number.parseInt(params.id)

	const [canteen, days] = await Promise.all([
		API.canteens.get(canteen_id),
		API.days.list(canteen_id)
	])

	return {
		canteen,
		days
	}
}
