import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { CollegeDepartment } from "../model/college-department";
import { HttpClient } from '@angular/common/http';
import { environment } from "src/environments/environment";
@Injectable({
  providedIn: 'root'
})
export class CollegeDepartmentService {
  private apiServerUrl = environment.apiBaseUrl + "/college/department";
  constructor(private http: HttpClient) {
  }

  public getCities(): Observable<CollegeDepartment[]> {
    return this.http.get<any>(`${this.apiServerUrl}`)
  };

  public addCollegeDepartment(collegeDepartment: CollegeDepartment): Observable<CollegeDepartment> {
    return this.http.post<CollegeDepartment>(`${this.apiServerUrl}`, collegeDepartment);
  }
  public updateCollegeDepartment(collegeDepartment: CollegeDepartment): Observable<CollegeDepartment> {
    return this.http.put<CollegeDepartment>(`${this.apiServerUrl}`, collegeDepartment);
  }

  public deleteCollegeDepartment(collegeDepartmentId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/${collegeDepartmentId}`);
  }
}