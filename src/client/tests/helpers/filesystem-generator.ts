import { success, type Result } from '$lib/modules/results/results';
import {
	FileSystem,
	createFileSystem,
	type FileSystemEntityData
} from '../../src/lib/modules/filesystem/filesystem';

// const getFileContents = (data: any): Promise<Result<string>> => {
// 	return Promise.resolve(success(data.contents));
// };

const getDirectoryContents = (data: any): Promise<Result<FileSystemEntityData[]>> => {
	const x = data.map;
	return Promise.resolve(success(data));
};

const getRootContents = (data: any): Promise<Result<FileSystemEntityData[]>> => {
	return Promise.resolve(success(data));
};

export async function buildFileSystem(data: any): Promise<FileSystem> {
	return createFileSystem(() => getRootContents(data), getDirectoryContents, 'data');
}
