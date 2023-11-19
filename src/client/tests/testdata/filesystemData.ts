export type MockFile = {
	name: string;
	path: string;
	type: 'file';
	size: number;
	contents: string;
};

export type MockDirectory = {
	name: string;
	path: string;
	type: 'dir';
	size?: number | 0;
	children: MockFileSystemEntity[];
};

export type MockFileSystemEntity = MockFile | MockDirectory;

export const simpleRepoWithMultipleDirectoriesAndAFiles: MockFileSystemEntity[] = [
	{
		name: 'README.md',
		path: 'README.md',
		type: 'file',
		size: 5,
		contents: 'Hello World'
	},
	{
		name: 'src',
		path: 'src',
		type: 'dir',
		size: 0,
		children: [
			{
				name: 'index.ts',
				path: 'src/index.ts',
				type: 'file',
				size: 10,
				contents: 'console.log(Hello World)'
			},
			{
				name: 'lib',
				path: 'src/lib',
				type: 'dir',
				children: [
					{
						name: 'modules',
						path: 'src/lib/modules',
						type: 'dir',
						children: [
							{
								name: 'filesystem',
								path: 'src/lib/modules/filesystem',
								type: 'dir',
								children: [
									{
										name: 'filesystem.ts',
										path: 'src/lib/modules/filesystem/filesystem.ts',
										type: 'file',
										size: 15,
										contents: `
                                        const Filesystem = () => {};
                                        `
									}
								]
							},
							{
								name: 'github',
								path: 'src/lib/modules/github',
								type: 'dir',
								children: [
									{
										name: 'GithubClient.ts',
										path: 'src/lib/modules/github/GithubClient.ts',
										type: 'file',
										size: 10,
										contents: `
                                        const GithubClient = () => {};
                                        `
									}
								]
							}
						]
					}
				]
			}
		]
	}
];
