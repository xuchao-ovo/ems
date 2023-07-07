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

    get_role() {
        return this.http.get<IRoles[]>(this.api);
    }

    get_role_id(id: string): Observable<IRoles | response_error> {
        return this.http.get<IRoles | response_error>(`${this.api}/${id}`);
    }

    post_role(date: IRoles){
        return this.http.post<IRoles | response_error>(this.api, date);
    }

    patch_role(id: string, data: IRoles){
        return this.http.patch<IRoles| response_error>(`${this.api}/${id}`, data);
    }

    delete_role(id: string){
        return this.http.delete<number | response_error>(`${this.api}/${id}`);
    }

}
