export interface IUsers {
    id: string;
    username: string;
    password: string;
    roleId: number;
}


export interface IAlterUser{
    password: string;
    new_password: string;
    re_password: string;
}