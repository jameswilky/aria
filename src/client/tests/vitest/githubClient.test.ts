import { createFileSystem, type FileSystemEntityData } from '$lib/modules/filesystem/filesystem';
import { GitHubClient } from '$lib/modules/github/GithubClient';
import { assert, describe, expect, it, test } from 'vitest';

describe('[Discovery] GitHubClient', () => {
	const path = import.meta.env.VITE_GITHUB_TEST_URL || '';
	const auth = import.meta.env.VITE_GITHUB_API_KEY || '';

	it.skip('It should return return a file system object reflecting the file/directory contents of the repo', async () => {
		const client = new GitHubClient(auth);
		const urlSegments = new URL(path).pathname.split('/');
		const owner = urlSegments[1];
		const repo = urlSegments[2];

		const fs = await createFileSystem(
			() => client.getRepoContents(repo, owner),
			client.getDirectoryContents(owner, repo),
			repo
		);

		const x = fs.tree.root.children[0].data;

		//@ts-ignore
		await x.load();
	}, 100000);
});
