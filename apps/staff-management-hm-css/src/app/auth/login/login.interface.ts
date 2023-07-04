export interface LoginForm {
  username: string;
  password: string;
}

export interface LoginResponse{
  id: string,
  access_token: string
}

export interface FailResponse{
  code: number,
  message: string
}