import { success, error, type Result } from '$lib/modules/results/results';
import {
	FileSystem,
	type FileSystemEntityData,
	type DirectoryEntityData
} from '../../src/lib/modules/filesystem/filesystem';
import type { MockFileSystemEntity } from '../testdata/filesystemData';

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
