<script lang="ts">
	import type { Canteen } from '../lib/types.js'
	import type { PageData } from './$types'

	export let data: PageData

	let canteens: Canteen[] = []
	$: canteens = getList(data.canteens, { city })

	$: cities = Array.from(new Set(data.canteens.map((c) => c.city))).sort()
	let city: string | undefined = undefined

	type CanteenFilter = {
		city: string | undefined
	}

	function getList(all: Canteen[], filter: CanteenFilter): Canteen[] {
		let canteens = Array.from(all)

		if (filter.city) canteens = canteens.filter((c) => c.city === filter.city)

		canteens.sort((a, b) => a.name.localeCompare(b.name))
		return canteens
	}
</script>

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
