<div class="navbar bg-base-300 px-12">
	<div class="flex-1">
		<a href="/" class="btn btn-ghost text-xl">Tickets</a>
	</div>
	<div class="flex-none gap-2">
		<div class="form-control">
			<input
				type="text"
				placeholder="Search"
				class="input input-bordered rounded-3xl h w-24 md:w-auto"
			/>
		</div>
		<details class="dropdown dropdown-end">
			<summary tabindex="0" class="btn btn-ghost btn-circle avatar online placeholder">
				<div class="bg-neutral text-neutral-content rounded-full w-16">
					<span class="text-xl">JO</span>
				</div>
			</summary>
			<ul
				tabindex="0"
				class="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-300 rounded-box w-52"
			>
				<li>
					<a href="/user" class="justify-between"> Profile </a>
				</li>
				<li><a href="/user/settings">Settings</a></li>
				<li><a href="/signout">Logout</a></li>
			</ul>
		</details>
	</div>
</div>
