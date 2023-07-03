import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { FailResponse, LoginForm, LoginResponse, RegisterForm } from './login.interface';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient) {}

  login(loginForm: LoginForm) {
    return this.http.post<LoginResponse | FailResponse>(`http://localhost:3000/api/auth/login`, loginForm);
  }

  register(registerForm: RegisterForm){
    return this.http.post<LoginResponse | FailResponse>(`http://localhost:3000/api/auth/register`, registerForm);
  }
}
