import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { response_error } from '../../../auth/register/register.interface';
import { Observable } from 'rxjs';
import { ISalary } from '../interface/salary.interface';



@Injectable({
    providedIn: 'root',
})
export class SalaryService {
    private api: string = `/api/salaries`;
    constructor(private http: HttpClient) { }

    get_salary() {
        return this.http.get<ISalary[]>(this.api);
    }

    get_salary_id(id: string): Observable<ISalary | response_error> {
        return this.http.get<ISalary | response_error>(`${this.api}/${id}`);
    }

    post_salary(date: ISalary){
        return this.http.post<ISalary | response_error>(this.api, date);
    }

    patch_salary(id: string, data: ISalary){
        return this.http.patch<ISalary| response_error>(`${this.api}/${id}`, data);
    }

    delete_salary(id: string){
        return this.http.get<number | response_error>(`${this.api}/${id}`);
    }

}
