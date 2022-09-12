<script lang="ts">
	import type { PageData } from './$types'

	export let data: PageData

	const { canteen, days } = data
</script>

<h1>{canteen.name}</h1>

<p>Days</p>
<ul>
	{#each data.days as day}
		<li>{day.date} {day.closed ? 'close' : 'open'}</li>
	{/each}
</ul>
