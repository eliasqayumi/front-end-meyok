import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { DepartmentStudents } from "../model/department-students";
import { HttpClient } from '@angular/common/http';
import { environment } from "src/environments/environment";
@Injectable({
  providedIn: 'root'
})
export class DepartmentStudentsService {
  private apiServerUrl = environment.apiBaseUrl + "/department/students";
  constructor(private http: HttpClient) {

  }

  public getDepartmentStudents(): Observable<DepartmentStudents[]> {
    return this.http.get<any>(`${this.apiServerUrl}`)
  };

  public addDepartmentStudents(departmentStudent: DepartmentStudents): Observable<DepartmentStudents> {
    return this.http.post<DepartmentStudents>(`${this.apiServerUrl}`, departmentStudent);
  }
  public updateDepartmentStudents(departmentStudent: DepartmentStudents): Observable<DepartmentStudents> {
    return this.http.put<DepartmentStudents>(`${this.apiServerUrl}`, departmentStudent);
  }

  public deleteDepartmentStudents(departmentStudentId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/${departmentStudentId}`);
  }
}