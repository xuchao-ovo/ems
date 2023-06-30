import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { LoginForm } from './login.type';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient) {}

  login(loginForm: LoginForm) {
    return this.http.post(`/tokens`, loginForm);
  }
}
