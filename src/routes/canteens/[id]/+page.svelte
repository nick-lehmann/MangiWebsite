<script lang="ts">
	import { API } from '$lib/api.js'
	import type { CanteenDay, Meal } from '$lib/types.js'
	import type { PageData } from './$types'

	export let data: PageData

	const { canteen, days } = data

	let day: CanteenDay | undefined

	$: meals = day ? API.meals.list(canteen.id, day.date) : ([] as Meal[])
</script>

<h1>{canteen.name}</h1>

<p>Days</p>

<select bind:value={day}>
	<!-- <option value={undefined}>-------</option> -->
	{#each days.filter((d) => d.closed !== true) as day}
		<option value={day}>{day.date}</option>
	{/each}
</select>

{#await meals}
	<p>Loading...</p>
{:then data}
	<ul>
		{#each data as meal}
			<li>{meal.name}</li>
		{/each}
	</ul>
{/await}
