<script lang="ts">
	import Header from '$lib/components/ui/header/header.svelte';
	import Sidebar from '$lib/components/ui/sidebar/sidebar.svelte';
	import type { Load } from '@sveltejs/kit';
</script>

<Header />
<Sidebar />
<slot />
