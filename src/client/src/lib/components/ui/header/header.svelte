<script lang="ts">
	import type { Profile } from '$lib/server/aria/aria.generated';

	export let profile: Profile;
</script>

<nav class="fixed top-0 z-50 w-full bg-secondary border-b border-slate-700">
	<div class="px-3 py-3 lg:px-5 lg:pl-3">
		<div class="flex items-center justify-between">
			<div class="flex items-center justify-start">
				<img src="https://flowbite.com/docs/images/logo.svg" class="h-8 mr-3" alt="FlowBite Logo" />
				<span
					class="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white"
				/>
				<h1 class="scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-3xl">Aria</h1>
			</div>
			<div class="flex items-center">
				<div class="flex items-center ml-3">Hello, {profile.username}</div>
			</div>
		</div>
	</div>
</nav>
