import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { response_error } from '../../../auth/register/register.interface';
import { Observable } from 'rxjs';
import { IAttendance } from '../interface/attendance.interface';



@Injectable({
    providedIn: 'root',
})
export class AttendanceService {
    private api: string = `/api/attendances`;
    constructor(private http: HttpClient) { }

    get_employee() {
        return this.http.get<IAttendance[]>(this.api);
    }

    get_employee_id(id: string): Observable<IAttendance | response_error> {
        return this.http.get<IAttendance | response_error>(`${this.api}/${id}`);
    }

    post_employee(date: IAttendance){
        return this.http.post<IAttendance | response_error>(this.api, date);
    }

    patch_employee(id: string, data: IAttendance){
        return this.http.patch<IAttendance| response_error>(`${this.api}/${id}`, data);
    }

    delete_employee(id: string){
        return this.http.get<number | response_error>(`${this.api}/${id}`);
    }

}
