import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { CollegeDepartmentSubject } from "../model/college-department-subject";
import { HttpClient } from '@angular/common/http';
import { environment } from "src/environments/environment";
@Injectable({
  providedIn: 'root'
})
export class CollegeDepartmentSubjectService {
  private apiServerUrl = environment.apiBaseUrl + "/college/department/subject";
  constructor(private http: HttpClient) {

  }

  public getCities(): Observable<CollegeDepartmentSubject[]> {
    return this.http.get<any>(`${this.apiServerUrl}`);
  }

  public addCollegeDepartmentSubject(collegeDepartmentSubject: CollegeDepartmentSubject): Observable<CollegeDepartmentSubject> {
    return this.http.post<CollegeDepartmentSubject>(`${this.apiServerUrl}`, collegeDepartmentSubject);
  }

  public updateCollegeDepartmentSubject(collegeDepartmentSubject: CollegeDepartmentSubject): Observable<CollegeDepartmentSubject> {
    return this.http.put<CollegeDepartmentSubject>(`${this.apiServerUrl}`, collegeDepartmentSubject);
  }

  public deleteCollegeDepartmentSubject(collegeDepartmentSubjectId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/${collegeDepartmentSubjectId}`);
  }
}