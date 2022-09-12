import { error } from '@sveltejs/kit'
import type { Canteen, CanteenDay, CanteenID, Meal } from './types.js'

export const BASE_URL = 'https://openmensa.org/api/v2'

async function api<T>(
	method: string,
	resource: string,
	data?: Record<string, unknown>
): Promise<T> {
	const response = await fetch(`${BASE_URL}/${resource}`, {
		method,
		headers: {
			'content-type': 'application/json'
		},
		body: data && JSON.stringify(data)
	})

	if (response.status >= 300) throw error(response.status)

	return (await response.json()) as Promise<T>
}

export const API = {
	canteens: {
		list: async (): Promise<Canteen[]> => {
			return api('GET', '/canteens')
		},
		get: async (canteen_id: CanteenID): Promise<Canteen> => {
			return api('GET', `/canteens/${canteen_id}`)
		}
	},
	days: {
		list: async (canteen_id: CanteenID): Promise<CanteenDay[]> => {
			return api('GET', `/canteens/${canteen_id}/days`)
		}
	},
	meals: {
		list: async (canteen_id: CanteenID, date: string): Promise<Meal[]> => {
			return api('GET', `/canteens/${canteen_id}/days/${date}/meals`)
		}
	}
}
