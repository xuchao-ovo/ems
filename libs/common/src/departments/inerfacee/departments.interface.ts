export interface IDepartments {
    id: string,
    name: string,
    description: string,
    parent_id: string,
}

export interface IDepartments_tree extends TreeNode<string>{
    id: string,
    name: string,
    description: string,
    // children: IDepartments_tree[]
}

export interface TreeNode<T>{
    id: T;
    parent_id: T;
    children?: TreeNode<T>[];
  }
  