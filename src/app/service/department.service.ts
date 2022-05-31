import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Department } from "../model/department";
import { HttpClient } from '@angular/common/http';
import { environment } from "src/environments/environment";
@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
  private apiServerUrl = environment.apiBaseUrl+"/department";
  constructor(private http: HttpClient) {

  }

  public getDepartments(): Observable<Department[]> {
      return this.http.get<any>(`${this.apiServerUrl}`)
  };

  public addDepartment(department: Department): Observable<Department> {
      return this.http.post<Department>(`${this.apiServerUrl}`, department);
  }
  public updateDepartment(department: Department): Observable<Department> {
      return this.http.put<Department>(`${this.apiServerUrl}`, department);
  }
  
  public deleteDepartment(departmentId: string): Observable<void> {
      return this.http.delete<void>(`${this.apiServerUrl}/${departmentId}`);
  }
}