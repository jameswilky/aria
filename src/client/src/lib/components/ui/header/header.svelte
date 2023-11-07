<script lang="ts">
	import type { Profile } from '$lib/server/backend-interface';

	export let profile: Profile;
</script>

<nav class="fixed top-0 z-50 w-full bg-primary-foreground border-b border-secondary">
	<div class="px-3 py-3 lg:px-5 lg:pl-3">
		<div class="flex items-center justify-between">
			<div class="flex items-center justify-start">
				<h1 class="scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-3xl">Aria</h1>
			</div>
			<div class="flex items-center">
				<div class="flex items-center ml-3">Hello, {profile.username}</div>
			</div>
		</div>
	</div>
</nav>
