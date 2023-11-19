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
	}, 100000);
});
