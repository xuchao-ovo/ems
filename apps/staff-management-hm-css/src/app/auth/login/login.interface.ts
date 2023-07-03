export interface LoginForm {
  username: string;
  password: string;
}

export interface RegisterForm{
  username: string;
  password: string;
  name: string;
  age: string;
  gender: string;
  position: string;
  department_id: string;
  is_leader: string;
}

export interface LoginResponse{
  id: string,
  access_token: string
}

export interface FailResponse{
  code: number,
  message: string
}