import { createFileSystem, type FileSystemEntityData } from '$lib/modules/filesystem/filesystem';
import { GitHubClient } from '$lib/modules/github/GithubClient';
import { assert, describe, expect, it, test } from 'vitest';
import { simpleRepoWithMultipleDirectoriesAndAFiles } from '../testdata/filesystemData';

describe('Filesystem Tests', () => {
	const path = import.meta.env.VITE_GITHUB_TEST_URL || '';
	const auth = import.meta.env.VITE_GITHUB_API_KEY || '';

	it.skip('It should return return a file system object reflecting the file/directory contents of the repo', async () => {
		const fs = await createFileSystem(
			() => Promise.resolve({ success: true, value: data }),
			client.getDirectoryContents(owner, repo),
			'data'
		);
		const x = fs.tree.root.children[0].data;

		//@ts-ignore
		await x.load();
	}, 100000);
});
