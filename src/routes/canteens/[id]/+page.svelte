<script lang="ts">
	import { API } from '$lib/api.js'
	import type { Meal } from '$lib/types.js'
	import type { PageData } from './$types'
	import type { DayString } from '$lib/types.js'
	import { isValid, type CacheItem } from '$lib/cache.js'
	import { DateTime, Duration } from 'luxon'

	export let data: PageData

	let { canteen, days, meals: initialMeals } = data

	// Cases:
	// Backend fetches meals => use those
	// User changes days:
	// 1) Present in cache and still valid => reuse
	// 2) Not present in cache or invalid => fetch

	const cache: Partial<Record<DayString, CacheItem<Meal[]>>> = {}
	const cacheInterval = Duration.fromObject({ minutes: 1 })

	async function getMeals(date: DayString): Promise<Meal[]> {
		const cacheItem = cache[date]
		if (cacheItem && isValid(cacheItem, cacheInterval)) {
			console.debug(`[CanteenDetail] Cache hit for ${date}`)
			return cacheItem.data!
		} else {
			console.debug(`[CanteenDetail] Cache miss for ${date}`)
			const meals = await API.meals.list(canteen.id, selectedDate)
			cache[date] = {
				data: meals,
				timestamp: DateTime.now()
			}
			return meals
		}
	}

	async function updateMeals() {
		mealsFetch = await getMeals(selectedDate)
	}

	let selectedDate: string = days.length > 0 ? days[0].date : ''

	let mealsFetch: Promise<Meal[]> | Meal[] = initialMeals
</script>

<h1>{canteen.name}</h1>

{#if days.length > 0}
	<select bind:value={selectedDate} on:change={updateMeals}>
		{#each days.filter((d) => d.closed !== true) as d, i}
			<option value={d.date}>{d.date}</option>
		{/each}
	</select>
{/if}

{#await mealsFetch}
	<p>Loading...</p>
{:then meals}
	{#if meals.length > 0}
		<ul>
			{#each meals as meal}
				<li>{meal.name}</li>
			{/each}
		</ul>
	{:else}
		<p>No meals found</p>
	{/if}
{/await}
