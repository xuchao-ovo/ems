import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { response_error } from "../../../auth/register/register.interface";
import { Observable } from "rxjs";
import { IAttendance } from "../interface/attendance.interface";

@Injectable({
  providedIn: "root",
})
export class AttendanceService {
  private api: string = `/api/attendances`;
  constructor(private http: HttpClient) {}

  get_attendance() {
    return this.http.get<IAttendance[]>(this.api);
  }

  get_attendance_by_date(date: string) {
    return this.http.get<IAttendance[]>(`/api/attendances?start_at=${date}`);
  }

  get_attendance_id(id: string): Observable<IAttendance | response_error> {
    return this.http.get<IAttendance | response_error>(`${this.api}/${id}`);
  }

  post_attendance(date: IAttendance) {
    return this.http.post<IAttendance | response_error>(this.api, date);
  }

  patch_attendance(id: string, data: IAttendance) {
    return this.http.patch<IAttendance | response_error>(
      `${this.api}/${id}`,
      data
    );
  }

  delete_attendance(id: string) {
    return this.http.delete<response_error>(`${this.api}/${id}`);
  }
}
