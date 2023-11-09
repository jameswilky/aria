<script lang="ts">
	import Header from '$lib/components/ui/header/header.svelte';
	import Sidebar from '$lib/components/ui/sidebar/sidebar.svelte';
	import { Button } from '$lib/components/ui/button';
	import * as Dialog from '$lib/components/ui/dialog';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';

	import { Settings as SettingsIcon } from 'lucide-svelte';
	import { getSavedSettings, saveSettings, type Settings } from '$lib/stores/settingsStore';
	import { onMount } from 'svelte';

	let settings: Settings;
	let dialogOpen = false;

	onMount(() => {
		settings = getSavedSettings();
	});

	function save() {
		saveSettings(settings);
		dialogOpen = false;
	}

	function openStateChanged(open: boolean | undefined) {
		if (!open) {
			settings = getSavedSettings();
		}
	}

	function closeButtonClicked(e: Event) {
		if (JSON.stringify(getSavedSettings()) !== JSON.stringify(settings)) {
			if (confirm('You have unsaved changes, would you like to save them before continuing?')) {
				save();
			}
		}
	}

	export let data;
</script>

<Header profile={data.profile} />
<Sidebar>
	<Dialog.Root
		slot="settings"
		bind:open={dialogOpen}
		closeOnOutsideClick={false}
		onOpenChange={(open) => openStateChanged(open)}
	>
		<Dialog.Trigger class="flex items-center space-x-3 text-m font-medium">
			<SettingsIcon />
			<span>Settings</span></Dialog.Trigger
		>
		<Dialog.Content class="sm:max-w-[600px]" on:closeButtonClicked={closeButtonClicked}>
			<Dialog.Header>
				<Dialog.Title>Settings</Dialog.Title>
				<Dialog.Description>
					Supply the required API Keys here. None of this data is EVER sent to on our servers, its
					all stored locally in your browser.
				</Dialog.Description>
			</Dialog.Header>
			<div class="grid gap-4 py-4">
				<div class="grid grid-cols-4 items-center gap-4">
					<Label class="text-right">Github API Key</Label>
					<Input
						type="password"
						id="github_key"
						bind:value={settings.githubApiKey}
						class="col-span-3"
					/>
				</div>
				<div class="grid grid-cols-4 items-center gap-4">
					<Label class="text-right">OpenAI API Key</Label>
					<Input
						type="password"
						id="openai_key"
						bind:value={settings.openAiApiKey}
						class="col-span-3"
					/>
				</div>
			</div>
			<Dialog.Footer>
				<Button type="submit" on:click={save}>Save changes</Button>
			</Dialog.Footer>
		</Dialog.Content>
	</Dialog.Root>
</Sidebar>
<slot />
