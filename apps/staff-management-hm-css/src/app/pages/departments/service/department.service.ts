import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { response_error } from '../../../auth/register/register.interface';
import { Observable } from 'rxjs';
import { IDepartments } from '../interface/departments.interface';



@Injectable({
    providedIn: 'root',
})
export class DepartmentService {
    private api: string = `/api/departments`;
    constructor(private http: HttpClient) { }

    get_department() {
        return this.http.get<IDepartments[]>(this.api);
    }

    get_department_id(id: string): Observable<IDepartments | response_error> {
        return this.http.get<IDepartments | response_error>(`${this.api}/${id}`);
    }

    post_department(date: IDepartments){
        return this.http.post<IDepartments | response_error>(this.api, date);
    }

    patch_department(id: string, data: IDepartments){
        return this.http.patch<IDepartments| response_error>(`${this.api}/${id}`, data);
    }

    delete_department(id: string){
        return this.http.delete<response_error>(`${this.api}/${id}`);
    }

}
