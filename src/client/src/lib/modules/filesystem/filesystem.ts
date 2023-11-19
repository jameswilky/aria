import { Tree, TreeNode } from './tree';
import type { Result } from '../results/results';
import { success, error } from '../results/results';

export class File implements FileSystemEntity {
	public readonly name: string;
	public readonly path: string;
	public readonly byteSize: number;
	private loadCallback: () => Promise<Result<string>>;
	public isLoaded: boolean = false;
	public fileContents: string = '';

	constructor(
		name: string,
		path: string,
		byteSize: number,
		loadCallback: () => Promise<Result<string>>
	) {
		this.name = name;
		this.path = path;
		this.byteSize = byteSize;
		this.loadCallback = loadCallback;
	}

	public async load(): Promise<boolean> {
		const result = await this.loadCallback();
		if (result.success) {
			this.fileContents = result.value;
			this.isLoaded = true;
			return true;
		}
		return false;
	}
}
export class Directory implements FileSystemEntity {
	public name: string;
	public path: string;

	constructor(name: string, path: string) {
		this.name = name;
		this.path = path;
	}
}

export abstract class FileSystemEntity {
	public name: string;
	public path: string;

	constructor(name: string, path: string) {
		this.name = name;
		this.path = path;
	}
}

export class FileSystem {
	public tree: Tree<FileSystemEntity>;

	constructor(rootData: FileSystemEntity) {
		this.tree = new Tree<FileSystemEntity>(rootData);
	}

	addEntity(entity: FileSystemEntity, parent?: FileSystemEntity) {}
}

export interface FileEntityData {
	name: string;
	path: string;
	size: number;
	getFileContents: (data: FileEntityData) => Promise<Result<string>>;
	type: 'file';
}

export interface DirectoryEntityData {
	name: string;
	path: string;
	type: 'dir';
}

export type FileSystemEntityData = FileEntityData | DirectoryEntityData;

const populateNode = async (
	entities: FileSystemEntityData[],
	getDirectoryContents: (data: FileSystemEntityData) => Promise<Result<FileSystemEntityData[]>>,
	parentNode?: TreeNode<FileSystemEntity>
) => {
	for (const entity of entities) {
		if (entity.type === 'file') {
			const fileEntity = entity as FileEntityData;
			const load = async () => {
				return fileEntity.getFileContents(fileEntity);
			};
			parentNode?.addChild(
				new TreeNode(new File(fileEntity.name, fileEntity.path, fileEntity.size, load))
			);
		} else {
			const dirEntity = entity as DirectoryEntityData;
			const data = await getDirectoryContents(dirEntity);
			if (data.success) {
				await populateNode(data.value, getDirectoryContents, parentNode);
			} else {
				// Handle failure
			}
		}
	}
};

export const createFileSystem = async (
	getEntities: () => Promise<Result<FileSystemEntityData[]>>,
	getDirectoryContents: (entity: FileSystemEntityData) => Promise<Result<FileSystemEntityData[]>>,
	root: string
): Promise<FileSystem> => {
	var fileSystem = new FileSystem(new Directory(root, root));
	const entities = await getEntities();
	if (entities.success) {
		await populateNode(entities.value, getDirectoryContents, fileSystem.tree.root);
	} else {
		// ?
	}
	return fileSystem;
};
