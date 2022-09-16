<script lang="ts">
	import type { Canteen } from '../lib/types.js'
	import type { PageData } from './$types'

	export let data: PageData

	let needle: string = ''

	let canteens: Canteen[] = []
	$: canteens = getList(data.canteens, { city }, needle)

	$: cities = Array.from(new Set(data.canteens.map((c) => c.city))).sort()
	let city: string | undefined = undefined

	type CanteenFilter = {
		city: string | undefined
	}

	function getList(all: Canteen[], filter: CanteenFilter, needle: string): Canteen[] {
		let canteens = Array.from(all)

		if (filter.city) canteens = canteens.filter((c) => c.city === filter.city)

		if (needle !== '') {
			const searchTerm = needle.toLowerCase()
			canteens = canteens.filter((canteen) => canteen.name.toLowerCase().includes(searchTerm))
		}

		canteens.sort((a, b) => a.name.localeCompare(b.name))
		return canteens
	}
</script>

<input type="text" bind:value={needle} />

<p>
	City

	<select bind:value={city}>
		<option value={undefined}>-----</option>
		{#each Array.from(cities) as city}
			<option value={city}>
				{city}
			</option>
		{/each}
	</select>
</p>

<ul>
	{#each canteens as canteen}
		<li>
			<a href="canteens/{canteen.id}">
				{canteen.name} ({canteen.city})
			</a>
		</li>
	{/each}
</ul>
