import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { response_error } from '../../../auth/register/register.interface';
import { Observable } from 'rxjs';
import { IRoles } from '../interface/roles.interface';



@Injectable({
    providedIn: 'root',
})
export class RoleService {
    private api: string = `/api/roles`;
    constructor(private http: HttpClient) { }

    get_employee() {
        return this.http.get<IRoles[]>(this.api);
    }

    get_employee_id(id: string): Observable<IRoles | response_error> {
        return this.http.get<IRoles | response_error>(`${this.api}/${id}`);
    }

    post_employee(date: IRoles){
        return this.http.post<IRoles | response_error>(this.api, date);
    }

    patch_employee(id: string, data: IRoles){
        return this.http.patch<IRoles| response_error>(`${this.api}/${id}`, data);
    }

    delete_employee(id: string){
        return this.http.get<number | response_error>(`${this.api}/${id}`);
    }

}
