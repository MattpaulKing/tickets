<script lang="ts">
	import EventCard from '$lib/components/cards/EventCard.svelte';
	import KpiCard from '$lib/components/cards/KpiCard.svelte';
	import LineChart from '$lib/components/cards/LineChart.svelte';
	let { data } = $props();
</script>

<div class="flex flex-col">
	<h1 class="text-3xl font-bold text-gray-300 mb-8">Event Types</h1>
	<div class="grid grid-cols-2 gap-8">
		<div class="grid grid-cols-2 gap-8">
			{#each Object.keys(data.eventTypeAggs) as eventType}
				<KpiCard title={eventType} chartData={data.eventTypeAggs[eventType]} />
			{/each}
		</div>
		<div class="card bg-base-300 justify-self-end w-full">
			<div class="card-body">
				<h2 class="text-2xl text-gray-200">Event Types</h2>
				<LineChart chartData={data.eventTypeAggs} />
			</div>
		</div>
		<div class="flex flex-wrap gap-8 col-span-2">
			{#await data.streamed.newEventDetails}
				<div class="h-48 w-64 placeholder-gray-500 animate-pulse" />
			{:then newEventDetails}
				{#each newEventDetails as newEvent}
					<EventCard event={newEvent} />
				{/each}
			{/await}
		</div>
	</div>
</div>
