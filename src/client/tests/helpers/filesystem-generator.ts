import { success, error, type Result } from '$lib/modules/results/results';
import {
	FileSystem,
	type FileSystemEntityData,
	type DirectoryEntityData
} from '../../src/lib/modules/filesystem/filesystem';

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

function findObjectByPath(
	entities: MockFileSystemEntity[],
	targetPath: string
): Result<MockFileSystemEntity> {
	for (const entity of entities) {
		// Check if the current entity's path matches the target path
		if (entity.path === targetPath) {
			return success(entity);
		}

		// If the entity has children, search recursively in the children
		if ('children' in entity && entity.children.length > 0) {
			const found = findObjectByPath(entity.children, targetPath);
			if (found.success) {
				return success(found.value);
			}
		}
	}

	return error('Failed To Find Entity');
}

const getDirectoryContentsCallback = (
	data: MockFileSystemEntity[]
): ((entity: DirectoryEntityData) => Promise<Result<any>>) => {
	return (entity: DirectoryEntityData) => {
		const directory = findObjectByPath(data, entity.path);
		if (directory.success === false) {
			throw new Error(directory.error as string);
		}
		if (directory.value.type !== 'dir') {
			throw new Error('Path does not point to a directory.');
		}
		return Promise.resolve(success(directory.value.children));
	};
};

const getRootContents = (data: MockFileSystemEntity[]): Promise<Result<FileSystemEntityData[]>> => {
	// @ts-ignore
	return Promise.resolve(success(data));
};

function addFunctionToFiles(entity: any) {
	if (entity.type === 'file') {
		entity.getFileContents = (data: any) => Promise.resolve(success(data.contents));
	}

	if (entity.children && entity.children.length > 0) {
		entity.children.forEach((child: any) => addFunctionToFiles(child));
	}
}

export async function buildFileSystem(data: MockFileSystemEntity[]): Promise<FileSystem> {
	data.forEach((entity: any) => addFunctionToFiles(entity));
	return FileSystem.create(() => getRootContents(data), getDirectoryContentsCallback(data), 'data');
}

// Helper function to generate a random string
function randomString(length: number): string {
	const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	let result = '';
	for (let i = 0; i < length; i++) {
		result += characters.charAt(Math.floor(Math.random() * characters.length));
	}
	return result;
}

// Function to create a mock file system entity with random data
function createRandomMockEntity(
	currentPath: string,
	depth: number,
	width: number
): MockFileSystemEntity {
	if (depth === 0) {
		// At the deepest level, create only files
		const name = randomString(10) + '.txt';
		const contents = randomString(50);
		return {
			name,
			path: currentPath + '/' + name,
			type: 'file',
			size: contents.length,
			contents
		};
	} else {
		// Create directories with recursive calls
		const name = randomString(10);
		const newPath = currentPath + (currentPath ? '/' : '') + name;
		const children = [];
		for (let i = 0; i < width; i++) {
			children.push(createRandomMockEntity(newPath, depth - 1, width));
		}
		return {
			name,
			path: newPath,
			type: 'dir',
			children
		};
	}
}

// Generate a file system with a specified depth and width
export function generateRandomFileSystem(depth: number, width: number): MockFileSystemEntity[] {
	return [createRandomMockEntity('', depth - 1, width)]; // Adjusting depth for the root
}
