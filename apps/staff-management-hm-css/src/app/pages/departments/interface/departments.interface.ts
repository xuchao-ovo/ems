export interface IDepartments {
    id: string,
    name: string,
    description: string,
    parent_id: string,
}

export interface IDepartments_tree{
    id: string,
    name: string,
    description: string,
    children: IDepartments_tree[]
}