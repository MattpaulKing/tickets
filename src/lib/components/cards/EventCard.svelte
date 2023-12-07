<script lang="ts">
	import WatchlistButton from '$lib/components/watchlist/WatchlistButton.svelte';
	import type { Tables } from '$lib/types/types';
	let { event } = $props<{
		event: Partial<Tables<'sgEventsUpcoming'>> & { eventId: number };
	}>();
</script>

<article class="card w-96 bg-base-300 shadow-2xl rounded-xl">
	<div class="card-body">
		<div class="grid grid-cols-5 gap-2 place-content-baseline">
			<h3 class="col-span-4 card-title text-left tooltip truncate" data-tip={event.title}>
				{event.title}
			</h3>
			<WatchlistButton eventId={event.eventId} />
		</div>
		<span class="text-base text-gray-300 text-left capitalize"
			>{event.eventType?.replaceAll('_', ' ')} in {event.state} - {event.eventDate}</span
		>
		<div class="flex flex-wrop flex-wrap gap-x-4">
			<span>Average: {event.averagePrice ?? '-'}</span>
			<span>Max: {event.highestPrice ?? '-'}</span>
			<span>Low: {event.lowestPrice ?? '-'}</span>
			<span>Listings: {event.listingCount ?? '-'}</span>
			<span>Score: {event.eventScore?.toFixed(3) ?? '-'}</span>
			<span>Popularity: {event.eventPopularity?.toFixed(3) ?? '-'}</span>
		</div>
	</div>
</article>
