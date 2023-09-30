<script lang="ts">
	import Header from '$lib/components/ui/header/header.svelte';
	import Sidebar from '$lib/components/ui/sidebar/sidebar.svelte';

	export let data;
</script>

<Header profile={data.profile} />
<Sidebar />
<slot />
