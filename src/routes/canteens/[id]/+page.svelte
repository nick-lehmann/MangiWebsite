<script lang="ts">
	import { API } from '$lib/api.js'
	import type { Meal } from '$lib/types.js'
	import type { PageData } from './$types'

	export let data: PageData

	let { canteen, days, meals: initialMeals } = data

	let date: string = days.length > 0 ? days[0].date : ''
	let mealsFetch: Promise<Meal[]> | Meal[] = initialMeals

	function updateMeals() {
		mealsFetch = API.meals.list(canteen.id, date)
	}
</script>

<h1>{canteen.name}</h1>

{#if days.length > 0}
	<select bind:value={date} on:change={updateMeals}>
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
