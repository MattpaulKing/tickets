<script lang="ts">
	import WatchedIcon from '$lib/icons/WatchedIcon.svelte';
	import '../../app.css';
	import { createWatchlist } from '$lib/components/watchlist/watchlistState.svelte.js';
	import { setContext } from 'svelte';
	let { data } = $props();
	let watchlist = createWatchlist(data.watchlist);
	setContext('watchlist', watchlist);
	//TODO: active state for links
</script>

<div class="navbar bg-base-200 py-4 px-10">
	<div class="flex-1">
		<ul class="menu menu-horizontal rounded-box place-items-center">
			<li>
				<span class="text-3xl font-bold text-gray-200">Tickets</span>
			</li>
			<li>
				<a href="/">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-8 w-8"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						><path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
						/></svg
					>
					<span class="text-lg">Home</span>
				</a>
			</li>
			<li>
				<a href="/watchlist">
					<WatchedIcon />
					<span class="text-lg">Watchlist</span>
				</a>
			</li>
			<li>
				<a href="/performers">
					<span class="text-lg">Performers</span>
				</a>
			</li>
		</ul>
	</div>
	<div class="flex-none gap-4">
		<div class="form-control">
			<input
				type="text"
				placeholder="Search..."
				class="input input-bordered rounded-3xl w-24 md:w-auto"
			/>
		</div>
		<div class="dropdown dropdown-end">
			<div
				tabindex="0"
				role="button"
				class="btn btn-neutral btn-circle avatar online inline-grid place-items-center pt-2 h-14 w-14"
			>
				<div class="placeholder">
					<span class="text-xl">MK</span>
				</div>
			</div>
			<ul
				class="top-0 z-[1] bg-base-300 p-2 shadow menu menu-sm dropdown-content no-animation rounded-box w-52 transition-transform translate-y-12 duration-500"
			>
				<li>
					<a href="/profile" class="justify-between">
						Profile
						<span class="badge">New</span>
					</a>
				</li>
				<li>
					<a href="/settings">Settings</a>
				</li>
				<li>
					<form method="POST" action="/signout">
						<button>Logout</button>
					</form>
				</li>
			</ul>
		</div>
	</div>
</div>
<div class="flex mt-12 mx-24">
	<slot />
</div>
