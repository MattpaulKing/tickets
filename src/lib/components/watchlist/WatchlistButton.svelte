<script lang="ts">
	import { enhance } from '$app/forms';
	import { getContext } from 'svelte';
	import type { WatchlistState } from './watchlistState.svelte';
	const { eventId } = $props<{ eventId: number }>();
	let watchlist = getContext('watchlist') as WatchlistState;
	let isWatched = $derived(watchlist.has(eventId));

	const handleWatchlist = (eventId: number) => {
		if (!isWatched) {
			watchlist.add(eventId);
		} else {
			watchlist.remove(eventId);
		}
		return null;
	};
</script>

<!--HACK: grid gets around the button flying off position -->
<div class="grid grid-cols-1 grid-rows-1 h-8 w-32">
	<div class="h-8 col-span-1 row-span-1 w-32">
		<form
			method="POST"
			action={isWatched ? '/watchlist?/remove' : '/watchlist?/add'}
			use:enhance={() => {
				return async ({}) => {};
			}}
		>
			<input type="hidden" name="eventId" value={eventId} />
			<button
				class="btn btn-sm {isWatched
					? 'variant-filled-primary'
					: 'variant-filled-secondary'} transition-all"
				onclick={handleWatchlist(eventId)}>{isWatched ? '- ' : '+'} Watchlist</button
			>
		</form>
	</div>
</div>
