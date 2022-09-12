import { API } from '../lib/api.js'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async () => {
	return {
		canteens: await API.canteens.list()
	}
}
