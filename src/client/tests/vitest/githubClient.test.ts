import { type FileSystemEntityData, FileSystem } from '$lib/modules/filesystem/filesystem';
import { GitHubClient } from '$lib/modules/github/GithubClient';
import { assert, describe, expect, it, test } from 'vitest';

// Disabled, just used as a playground to test the GitHubClient. Not in CI
describe.skip('[Discovery] GitHubClient', () => {
	const path = import.meta.env.VITE_GITHUB_TEST_URL || '';
	const auth = import.meta.env.VITE_GITHUB_API_KEY || '';

	it('It should return return a file system object reflecting the file/directory contents of the repo', async () => {
		const client = new GitHubClient(auth);
		const urlSegments = new URL(path).pathname.split('/');
		const owner = urlSegments[1];
		const repo = urlSegments[2];

		const fs = await FileSystem.create(
			() => client.getRepoContents(repo, owner),
			client.getDirectoryContents(owner, repo),
			repo
		);

		const x = fs.root.children[0].data;

		//@ts-ignore
		await x.load();
	}, 100000);
});
