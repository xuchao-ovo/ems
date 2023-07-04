export interface Steps_Struct { index: number; title: string; status: string; }

export interface RegisterForm{
  id?: string;
  username: string;
  password: string;
  name: string;
  age: string;
  gender: string;
  position: string;
  department_id: string;
  role_id: string;
  is_leader: string;
}

export interface response_reg_user{
  code: number;
  id: string;
}

export interface response_reg_info{
  code: number;
  id: string;
  name: string;
}

export interface response_error{
  code: number;
  message: string;
}

export interface departments{
  id: string;
  name: string;
  description: string;
  parent_id: string;
  children: departments[];
}

 export interface node_department{
  key: string;
  title: string;
  children: node_department[];
 }