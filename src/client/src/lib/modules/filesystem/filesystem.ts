import { Tree, TreeNode } from './tree';
import type { Result } from '../results/results';
import { success, error } from '../results/results';

export class File implements FileSystemEntity {
	public readonly name: string;
	public readonly path: string;
	public readonly byteSize: number;
	private loadCallback: () => Promise<Result<string>>;
	public isLoaded: boolean = false;
	public contents: string = '';

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
			this.contents = result.value;
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
	private _tree: Tree<FileSystemEntity>;
	private _table: Map<string, TreeNode<FileSystemEntity>>;

	constructor(rootData: FileSystemEntity) {
		this._tree = new Tree<FileSystemEntity>(rootData);
		this._table = new Map<string, TreeNode<FileSystemEntity>>();
	}

	public get root(): TreeNode<FileSystemEntity> {
		return this._tree.root;
	}

	public addEntities = async (
		entities: FileSystemEntityData[],
		getDirectoryContents: (data: DirectoryEntityData) => Promise<Result<any>>,
		parentNode?: TreeNode<FileSystemEntity>
	) => {
		for (const entity of entities) {
			if (entity.type === 'file') {
				const fileEntity = entity as FileEntityData;
				const load = async () => {
					return fileEntity.getFileContents(fileEntity);
				};
				var fileNode = new TreeNode(
					new File(fileEntity.name, fileEntity.path, fileEntity.size, load)
				);
				this._table.set(fileEntity.path, fileNode);
				parentNode?.addChild(fileNode);
			} else {
				const dirEntity = entity as DirectoryEntityData;
				const directoryNode = new TreeNode(new Directory(dirEntity.name, dirEntity.path));
				this._table.set(dirEntity.path, directoryNode);
				parentNode?.addChild(directoryNode);
				const data = await getDirectoryContents(dirEntity);
				if (data.success) {
					await this.addEntities(data.value, getDirectoryContents, directoryNode);
				} else {
					// Handle failure
				}
			}
		}
	};

	public static create = async (
		getEntities: () => Promise<Result<FileSystemEntityData[]>>,
		getDirectoryContents: (data: DirectoryEntityData) => Promise<Result<any>>,
		root: string
	): Promise<FileSystem> => {
		var fileSystem = new FileSystem(new Directory(root, root));
		const entities = await getEntities();
		if (entities.success) {
			await fileSystem.addEntities(entities.value, getDirectoryContents, fileSystem.root);
		} else {
			// ?
		}
		return fileSystem;
	};

	public getNodeByPath(path: string): Result<TreeNode<File> | TreeNode<Directory>, string> {
		const node = this._table.get(path);
		if (node) {
			if (node.data instanceof File) {
				return success(node as TreeNode<File>);
			} else if (node.data instanceof Directory) {
				return success(node as TreeNode<Directory>);
			} else {
				return error('Path is an invalid file type');
			}
		}
		return error('Path not found.');
	}

	public getNodesByPattern(
		regex: RegExp
	): Result<(TreeNode<File> | TreeNode<Directory>)[], string> {
		var matches = [];
		for (const [path, node] of this._table) {
			if (regex.test(path)) {
				if (node.data instanceof File) {
					matches.push(node as TreeNode<File>);
				} else if (node.data instanceof Directory) {
					matches.push(node as TreeNode<Directory>);
				} else {
					return error('Path is an invalid file type');
				}
			}
		}
		if (matches.length > 0) {
			return success(matches);
		}
		return error('Path not found.');
	}

	// public getEntitiesFrom(path: string) {}
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
