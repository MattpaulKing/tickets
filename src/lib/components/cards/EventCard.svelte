<script lang="ts">
	import type { Tables } from '$lib/types/db';
	import WatchlistButton from '$lib/components/watchlist/WatchlistButton.svelte';
	let { event } = $props<{
		event: Tables<'sgEventsUpcoming'>;
	}>();
</script>

<article class="card w-96 bg-base-300 shadow-2xl rounded-xl">
	<div class="card-body">
		<div class="flex flex-nowrap justify-between w-60">
			<h3 class="card-title text-left tooltip tooltip-info w-min truncate" data-tip={event.title}>
				{event.title?.replaceAll('_', ' ')}
			</h3>
			<WatchlistButton eventId={event.eventId} />
		</div>
		<span class="text-base text-gray-300 text-left capitalize"
			>{event.eventType.replaceAll('_', ' ')} in {event.state}</span
		>
		<div class="flex flex-wrop flex-wrap gap-x-4">
			<span>Average: {event.averagePrice ?? '-'}</span>
			<span>Max: {event.highestPrice ?? '-'}</span>
			<span>Low: {event.lowestPrice ?? '-'}</span>
			<span>Listings: {event.listingCount ?? '-'}</span>
			<span>Score: {event.eventScore.toFixed(3) ?? '-'}</span>
			<span>Popularity: {event.eventPopularity?.toFixed(3) ?? '-'}</span>
		</div>
	</div>
</article>
