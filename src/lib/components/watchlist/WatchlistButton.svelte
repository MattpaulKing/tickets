<script lang="ts">
	import { enhance } from '$app/forms';
	import { getContext } from 'svelte';
	import type { WatchlistState } from './watchlistState.svelte';
	import type { ActionResult } from '@sveltejs/kit';
	import WatchedIcon from '$lib/icons/WatchedIcon.svelte';

	const { eventId } = $props<{
		eventId: number;
	}>();
	let watchlist = getContext('watchlist') as WatchlistState;
	let watchlistIdx = watchlist.ids.indexOf(eventId);
	let isWatched = $state(watchlistIdx > -1 ? true : false);
</script>

<!--HACK: grid gets around the button flying off position -->
<div class="grid grid-cols-1 grid-rows-1 h-8 w-32">
	<div class="h-8 col-span-1 row-span-1 w-32">
		<form
			method="POST"
			action={isWatched ? '/watchlist?/remove' : '/watchlist?/add'}
			use:enhance={() => {
				return async ({ result }: { result: ActionResult}) => {
          if (result.type === 'success') {
            if (result.data?.action === "add") {
              isWatched = true
              watchlist.ids.push(eventId)
            } else if (result.data?.action === "remove") {
              isWatched = false
              watchlist.ids.splice(watchlistIdx, 1)
            }
          }
        };
			}}
		>
			<input type="hidden" name="eventId" value={eventId} />
			<button
				class="btn btn-sm btn-accent {isWatched
					? ''
					: 'btn-outline fill-base-content hover:fill-black'}"
			>
				<WatchedIcon />
			</button>
		</form>
	</div>
</div>
