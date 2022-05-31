import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { CollegeEmployee } from "../model/college-employee";
import { HttpClient } from '@angular/common/http';
import { environment } from "src/environments/environment";
@Injectable({
  providedIn: 'root'
})
export class CollegeEmployeeService {

  private apiServerUrl = environment.apiBaseUrl + "/college/employee";
  constructor(private http: HttpClient) {
  }

  public getCollegeEmployee(): Observable<CollegeEmployee[]> {
    return this.http.get<any>(`${this.apiServerUrl}`)
  };

  public addCollegeEmlpoyee(collegeEmlpoyee: CollegeEmployee): Observable<CollegeEmployee> {
    return this.http.post<CollegeEmployee>(`${this.apiServerUrl}`, collegeEmlpoyee);
  }
  public updateCollegeEmlpoyee(collegeEmlpoyee: CollegeEmployee): Observable<CollegeEmployee> {
    return this.http.put<CollegeEmployee>(`${this.apiServerUrl}`, collegeEmlpoyee);
  }

  public deleteCollegeEmlpoyee(collegeEmlpoyeeId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/${collegeEmlpoyeeId}`);
  }
}