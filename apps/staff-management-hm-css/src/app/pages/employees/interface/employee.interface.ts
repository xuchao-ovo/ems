export interface IEmployee {
    id: string;
    name: string;
    gender: string;
    age: number;
    position: string;
    department_name: string;
    department_id: string;
    is_leader: boolean;
    role_id: string;
}

export interface ICreateEmployee {
    username: string;
    password: string;
    name: string;
    gender: string;
    age: number;
    position: string;
    department_id: string;
    department_name: string;
    is_leader: boolean;
}
