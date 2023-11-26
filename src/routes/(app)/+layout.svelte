<script lang="ts">
	import '../../app.css';
	import { slide } from 'svelte/transition';
</script>

<div class="navbar bg-base-200 py-4 px-10">
	<div class="flex-1">
		<a href="/" class="text-3xl font-bold text-gray-200">Tickets</a>
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
					<a class="justify-between">
						Profile
						<span class="badge">New</span>
					</a>
				</li>
				<li><a>Settings</a></li>
				<li><a>Logout</a></li>
			</ul>
		</div>
	</div>
</div>
<div class="flex mt-12 mx-24">
	<slot />
</div>
