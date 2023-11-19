// Define the TreeNode class
export class TreeNode<T> {
	public data: T;
	public children: TreeNode<T>[];

	constructor(data: T) {
		this.data = data;
		this.children = [];
	}

	// Add a child node
	public addChild(child: TreeNode<T>): void {
		this.children.push(child);
	}
}

// Define the Tree class
export class Tree<T> {
	public root: TreeNode<T>;

	constructor(rootData: T) {
		this.root = new TreeNode(rootData);
	}

	// Add a node to the tree
	public addNode(data: T, toNodeData?: T): void {
		const newNode = new TreeNode(data);

		if (toNodeData === undefined) {
			// If no parent is specified, make this the root node
			if (!this.root) {
				this.root = newNode;
			} else {
				console.error('Root node already exists.');
			}
			return;
		}

		const parent = this.findNode(this.root, toNodeData);
		if (parent) {
			parent.addChild(newNode);
		} else {
			console.error('Parent node not found.');
		}
	}

	// Depth first search to find nodes in the tree
	public findNode(node: TreeNode<T> | null, data: T): TreeNode<T> | null {
		if (!node) {
			return null;
		}

		if (node.data === data) {
			return node;
		}

		for (const child of node.children) {
			const found = this.findNode(child, data);
			if (found) {
				return found;
			}
		}

		return null;
	}
}
