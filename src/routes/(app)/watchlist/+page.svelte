<script lang="ts">
	import EventCard from '$lib/components/cards/EventCard.svelte';
	let { data } = $props();
	const watchlistEvents = data.watchlistEvents.filter((event) => event.watchedEvents !== null);
	let selectedEvent = $state(watchlistEvents[0]);
	let tableModel: {
		header: string;
		prop: keyof (typeof watchlistEvents)[0]['watchedEvents'][0];
	}[] = [
		{ header: 'title', prop: 'title' },
		{ header: 'state', prop: 'state' },
		{ header: 'event date', prop: 'eventDate' },
		{ header: 'average', prop: 'averagePrice' }
	];
	const handleClick = (selectedId: number) => {
		selectedEvent = watchlistEvents.find(({ eventId }) => eventId === selectedId) ?? selectedEvent;
	};
</script>

<div class="flex flex-col w-full">
	<h1 class="text-3xl font-bold text-gray-300 mb-8">My Watchlist</h1>
	<div class="grid grid-cols-5 gap-12 w-full">
		<div class="overflow-x-auto col-span-3 card bg-base-200 h-min">
			<table class="table table-lg">
				<thead class="bg-neutral text-lg text-neutral-content">
					<tr>
						{#each tableModel as { header }}
							<th class="capitalize text-gray-300">{header}</th>
						{/each}
					</tr>
				</thead>
				<tbody>
					{#each watchlistEvents as event}
						{#if event.watchedEvents}
							<tr
								class="hover:bg-base-300 text-gray-200 {selectedEvent.eventId === event.eventId
									? 'bg-base-300'
									: ''}"
							>
								{#each tableModel as { prop }}
									<td onclick={() => handleClick(event.eventId)} class="text-left"
										>{event.watchedEvents[0][prop]}</td
									>
								{/each}
							</tr>
						{/if}
					{/each}
				</tbody>
			</table>
		</div>
		<div class="col-span-2">
			<EventCard event={selectedEvent.watchedEvents[0]} />
		</div>
	</div>
</div>
