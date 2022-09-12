import { error } from '@sveltejs/kit'
import { BASE_URL } from '../lib/api.js'
import type { Canteen } from '../lib/types.js'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async () => {
	const response = await fetch(`${BASE_URL}/canteens`)

	if (response.status != 200) throw error(response.status)

	return {
		canteens: (await response.json()) as Canteen[]
	}
}
