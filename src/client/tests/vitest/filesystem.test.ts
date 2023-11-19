import { assert, describe, expect, it, test } from 'vitest';
import { simpleRepoWithMultipleDirectoriesAndAFiles } from '../testdata/filesystemData';
import { buildFileSystem } from '../helpers/filesystem-generator';
import { Directory, File } from '$lib/modules/filesystem/filesystem';

describe('Filesystem Tests', () => {
	it('It should build a filesystem matching the provioded input data', async () => {
		const fs = await buildFileSystem(simpleRepoWithMultipleDirectoriesAndAFiles);

		const readme = fs.root.children[0].data;
		expect(readme instanceof File).toBe(true);
		if (readme instanceof File) {
			expect(readme.name).toBe('README.md');
			expect(readme.path).toBe('README.md');
			await readme.load();
			expect(readme.isLoaded).toBe(true);
			expect(readme.contents).toBe('Hello World');
		}

		const modulesNode = fs.root.children[1].children[1].children[0];
		expect(modulesNode.data instanceof Directory).toBe(true);
		if (modulesNode.data instanceof Directory) {
			expect(modulesNode.data.name).toBe('modules');
			expect(modulesNode.data.path).toBe('src/lib/modules');
			expect(modulesNode.children.length).toBe(2);
			expect(modulesNode.children[0].data.name).toBe('filesystem');
			expect(modulesNode.children[1].data.name).toBe('github');
		}
	});

	it('It should return the correct file when searching by path', async () => {
		const fs = await buildFileSystem(simpleRepoWithMultipleDirectoriesAndAFiles);

		const githubFileRequest = fs.getNodeByPath('src/lib/modules/github/GithubClient.ts');
		if (!githubFileRequest.success) assert.fail(githubFileRequest.error);
		if (!(githubFileRequest.value.data instanceof File)) assert.fail('Not a file');
		const file = githubFileRequest.value.data;
		expect(file.name).toBe('GithubClient.ts');
		expect(file.path).toBe('src/lib/modules/github/GithubClient.ts');
	});
	it('It should return the correct directory when searching by path', async () => {
		const fs = await buildFileSystem(simpleRepoWithMultipleDirectoriesAndAFiles);

		const githubFolderRequest = fs.getNodeByPath('src/lib/modules/github');
		if (!githubFolderRequest.success) assert.fail(githubFolderRequest.error);
		if (!(githubFolderRequest.value.data instanceof Directory)) assert.fail('Not a directory');
		const file = githubFolderRequest.value.data;
		expect(file.name).toBe('github');
		expect(file.path).toBe('src/lib/modules/github');
	});
	it('should return an error when searching for a path that does not exist', async () => {
		const fs = await buildFileSystem(simpleRepoWithMultipleDirectoriesAndAFiles);

		const githubFolderRequest = fs.getNodeByPath('src/lib/modules/github/doesnotexist');
		if (githubFolderRequest.success) assert.fail('Expected error');
		expect(githubFolderRequest.error).toBe('Path not found.');
	});
	it('should return a list of files matching a regex pattern', async () => {
		const fs = await buildFileSystem(simpleRepoWithMultipleDirectoriesAndAFiles);

		const request = fs.getNodesByPattern(/.*\.ts$/);
		if (!request.success) assert.fail(request.error);
		expect(request.value.length).toBe(3);
		expect(request.value[0].data.name).toBe('index.ts');
		expect(request.value[1].data.name).toBe('filesystem.ts');
		expect(request.value[2].data.name).toBe('GithubClient.ts');
	});
});
