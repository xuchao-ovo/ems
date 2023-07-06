import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { response_error } from '../../../auth/register/register.interface';
import { Observable } from 'rxjs';
import { IAlterUser, IUsers } from '../interface/users.interface';



@Injectable({
    providedIn: 'root',
})
export class UserService {
    private api: string = `/api/users`;
    constructor(private http: HttpClient) { }

    get_user() {
        return this.http.get<IUsers[]>(this.api);
    }

    get_user_id(id: string): Observable<IUsers | response_error> {
        return this.http.get<IUsers | response_error>(`${this.api}/${id}`);
    }

    post_user(date: IUsers){
        return this.http.post<IUsers | response_error>(this.api, date);
    }

    patch_user(id: string, data: IUsers){
        return this.http.patch<IUsers| response_error>(`${this.api}/${id}`, data);
    }

    alter_user(data: IAlterUser){
        return this.http.patch<response_error>(this.api, data);
    }

    delete_user(id: string){
        return this.http.get<number | response_error>(`${this.api}/${id}`);
    }

}
