import { GitHubClient } from '$lib/github/GithubClient';
import { describe, expect, it, test } from 'vitest';

describe('GitHubClient', () => {
	const path = import.meta.env.VITE_GITHUB_TEST_URL || '';
	const auth = import.meta.env.VITE_GITHUB_API_KEY || '';

	it('should', async () => {
		const client = new GitHubClient(auth);

		const res = await client.getRepoFiles(path);

		console.log(res);
	});
});
