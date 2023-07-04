import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RegisterForm, departments, response_error, response_reg_info, response_reg_user } from './register.interface';


@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  constructor(private http: HttpClient) {}

  async reg_user(registerForm: RegisterForm){
    return await this.http.post<response_reg_user | response_error>(`http://localhost:3000/api/auth/register`, registerForm);
  }

  async reg_info(registerForm: RegisterForm){
    return await this.http.post<response_reg_info | response_error>(`http://localhost:3000/api/auth/employee_info`, registerForm);
  }

  async load_department(){
    return await this.http.get<departments[]>(`http://localhost:3000/api/auth/load_department`);
  }
}
