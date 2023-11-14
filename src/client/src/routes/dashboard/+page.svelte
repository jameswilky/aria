<script lang="ts">
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import * as Card from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button';
	import { ZodError, z } from 'zod';
	import { getRepoFiles } from '$lib/github/GithubClient';
	import { getSettings } from '$lib/stores/settingsStore';

	let errorMessage: string;

	const githubUrlSchema = z
		.string()
		.url()
		.regex(/https:\/\/github\.com\/[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+/, 'Must be a valid GitHub URL');

	let repoUrl: string = 'https://github.com/';

	const validateAndFetchData = async () => {
		try {
			githubUrlSchema.parse(repoUrl);
			const data = await fetchData(repoUrl);
			// Redirect to new page with fetched data
		} catch (error) {
			if (error instanceof ZodError) {
				errorMessage = error.issues[0].message;
			}
		}
	};

	const fetchData = async (url: string): Promise<any> => {
		const apiKey = getSettings().githubApiKey;
		const response = await getRepoFiles(url, apiKey);
		return response;
	};
</script>

<div class="flex w-[100%] justify-center items-center">
	<Card.Root class="justify-around w-[600px] h-[260px] mb-40">
		<Card.Header>
			<Card.Title>Specify a GitHub Repository</Card.Title>
			<Card.Description>
				Enter a Github URL to load that repository and provide it as context
			</Card.Description>
		</Card.Header>
		<Card.Content>
			<div>
				<Label>Repository URL</Label>
				<Input bind:value={repoUrl} type="search" placeholder="Search..." />
				<div class=" h-2">
					{#if errorMessage}
						<p class="text-destructive text-sm">{errorMessage}</p>
					{/if}
				</div>
			</div>
		</Card.Content>
		<Card.Footer class="flex justify-end">
			<Button on:click={validateAndFetchData}>Start</Button>
		</Card.Footer>
	</Card.Root>
</div>
