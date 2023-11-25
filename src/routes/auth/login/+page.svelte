<script lang="ts">
	import { enhance } from '$app/forms';
	const { data } = $props();
</script>

<div class="container flex justify-center h-[100vh] place-items-center">
	<div class="flex flex-col card bg-base-300 h-fit w-fit px-24 py-12 justify-items-center">
		<h1 class="text-4xl text-center text-gray-200 font-bold">Login</h1>
		<div class="card-body justify-center mx-auto mt-2 max-w-md card rounded-xl p-8">
			<form action="?/signin" method="POST" class="auth-form" use:enhance>
				<label class="label" for="email">Email</label>
				<input class="input input-bordered rounded-3xl" name="email" value="" />
				<label class="label" for="password">Password</label>
				<input
					class="input input-bordered rounded-3xl"
					type="password"
					name="password"
					autocomplete="off"
				/>
				<input hidden name="pathAttempted" value={data.url} />
				<div class="flex place-content-around p-4 mt-4">
					<button class="btn btn-base variant-filled-primary" type="submit">Sign In</button>
					<a href="/auth/register">
						<button class="btn btn-base variant-filled-tertiary">Register</button>
					</a>
				</div>
			</form>
		</div>
	</div>
</div>
