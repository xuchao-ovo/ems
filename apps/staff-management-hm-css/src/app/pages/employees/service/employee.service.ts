import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IEmployee } from '../interface/employee.interface';
import { response_error } from '../../../auth/register/register.interface';
import { Observable } from 'rxjs';



@Injectable({
    providedIn: 'root',
})
export class EmployeeService {
    private api: string = `/api/employees`;
    constructor(private http: HttpClient) { }

    get_employee() {
        return this.http.get<IEmployee[]>(this.api);
    }

    get_employee_id(id: string): Observable<IEmployee | response_error> {
        return this.http.get<IEmployee | response_error>(`${this.api}/${id}`);
    }

    post_employee(date: IEmployee){
        return this.http.post<IEmployee | response_error>(this.api, date);
    }

    patch_employee(id: string, data: IEmployee){
        return this.http.patch<IEmployee| response_error>(`${this.api}/${id}`, data);
    }

    delete_employee(id: string){
        return this.http.get<number | response_error>(`${this.api}/${id}`);
    }

}
