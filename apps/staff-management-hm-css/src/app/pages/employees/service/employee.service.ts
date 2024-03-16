import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ICreateEmployee, IEmployee } from "../interface/employee.interface";
import { response_error } from "../../../auth/register/register.interface";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class EmployeeService {
  private api: string = `/api/employees`;
  constructor(private http: HttpClient) {}

  get_employee() {
    return this.http.get<IEmployee[]>(this.api);
  }
  get_employee_by_search(search: any) {
    const { name, month, position, less, more, age } = search;

    let queryParams = "";

    if (name) {
      queryParams += `name=${name}&`;
    }
    if (month) {
      queryParams += `month=${month}&`;
    }
    if (position) {
      queryParams += `position=${position}&`;
    }

    if (less) {
      queryParams += `less=${less}&`;
    }

    if (more) {
      queryParams += `more=${more}&`;
    }

    if (age) {
      queryParams += `age=${age}&`;
    }

    // 移除最后一个 "&"
    if (queryParams.endsWith("&")) {
      queryParams = queryParams.slice(0, -1);
    }
    return this.http.get<IEmployee[]>(`/api/employees?${queryParams}`);
  }

  get_employee_id(id: string): Observable<IEmployee | response_error> {
    return this.http.get<IEmployee | response_error>(`${this.api}/${id}`);
  }

  post_employee(date: ICreateEmployee) {
    return this.http.post<IEmployee | response_error>(this.api, date);
  }

  patch_employee(id: string, data: IEmployee) {
    return this.http.patch<IEmployee | response_error>(
      `${this.api}/${id}`,
      data
    );
  }

  delete_employee(id: string) {
    return this.http.delete<number | response_error>(`${this.api}/${id}`);
  }
}
