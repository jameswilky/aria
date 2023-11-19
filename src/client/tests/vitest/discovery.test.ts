import { type FileSystemEntityData, FileSystem } from '$lib/modules/filesystem/filesystem';
import { githubClient } from '$lib/modules/github/GithubClient';
import { assert, describe, expect, it, test } from 'vitest';
import { generateRandomFileSystem } from '../helpers/filesystem-generator';

// Disabled, just used as a playground to test the GitHubClient. Not in CI
describe.skip('[Discovery]', () => {
	// const path = import.meta.env.VITE_GITHUB_TEST_URL || '';
	// const auth = import.meta.env.VITE_GITHUB_API_KEY || '';

	it('It should return return a file system object reflecting the file/directory contents of the repo', async () => {
		// const client = githubClient(auth);
		// const { owner, repo } = client.getOwnerAndRepo(path);
		// const fs = await FileSystem.create(
		// 	() => client.getRepoContents(repo, owner),
		// 	client.getDirectoryContents(owner, repo),
		// 	repo
		// );
		// const x = fs.root.children[0].data;
		// //@ts-ignore
		// await x.load();
	}, 100000);

	it('should generate fake data', async () => {
		const a = await generateRandomFileSystem(5, 10);

		console.log(a);
	}, 100000);
});
