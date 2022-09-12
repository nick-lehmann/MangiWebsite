<script lang="ts">
	import { API } from '$lib/api.js'
	import type { CanteenDay, Meal } from '$lib/types.js'
	import type { PageData } from './$types'

	export let data: PageData

	const { canteen, days: allDays } = data

	/// Seems like `closed` is actually open 🧐
	let days = allDays.filter((day) => day.closed == false)

	let day: CanteenDay | undefined = days.length > 0 ? days[0] : undefined

	$: meals = day ? API.meals.list(canteen.id, day.date) : ([] as Meal[])
</script>

<h1>{canteen.name}</h1>

<p>Days</p>

{#if days.length > 0}
	<select bind:value={day}>
		{#each days.filter((d) => d.closed !== true) as day}
			<option value={day}>{day.date}</option>
		{/each}
	</select>
{/if}

{#await meals}
	<p>Loading...</p>
{:then data}
	<ul>
		{#each data as meal}
			<li>{meal.name}</li>
		{/each}
	</ul>
{/await}
