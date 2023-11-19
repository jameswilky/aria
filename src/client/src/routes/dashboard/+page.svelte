<script lang="ts">
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import * as Card from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button';
	import { ZodError, z } from 'zod';
	//import { getRepoFiles } from '$lib/modules/github/GithubClient';
	import { getSettings } from '$lib/stores/settingsStore';
	import { githubClient } from '$lib/modules/github/GithubClient';

	let errorMessage: string;

	let repoUrl: string = 'https://github.com/';
	let repo: string;
	let owner: string;

	const validateRepo = async () => {
		try {
			const githubApiKey = getSettings().githubApiKey;
			const client = githubClient(githubApiKey);
			const apiKeyValid = await client.validateApiKey();
			const data = await client.validateRepoExists(owner, repo);
			// Redirect to new page with fetched data
		} catch (error) {
			if (error instanceof ZodError) {
				errorMessage = error.issues[0].message;
			}
		}
	};
</script>

<div class="flex w-[100%] justify-center items-center">
	<Card.Root class="justify-around w-[600px] mb-40">
		<Card.Header>
			<Card.Title>Specify a GitHub Repository</Card.Title>
			<Card.Description>
				Enter a Github URL to load that repository and provide it as context
			</Card.Description>
		</Card.Header>
		<Card.Content>
			<div>
				<Label>Repository Owner</Label>
				<Input bind:value={owner} type="search" placeholder="Search..." />
				<div class=" h-2">
					{#if errorMessage}
						<p class="text-destructive text-sm">{errorMessage}</p>
					{/if}
				</div>
			</div>
			<div>
				<Label>Repository Name</Label>
				<Input bind:value={repo} type="search" placeholder="Search..." />
				<div class=" h-2">
					{#if errorMessage}
						<p class="text-destructive text-sm">{errorMessage}</p>
					{/if}
				</div>
			</div>
		</Card.Content>
		<Card.Footer class="flex justify-end">
			<Button on:click={validateRepo}>Start</Button>
		</Card.Footer>
	</Card.Root>
</div>
