import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { CollegeDepartmentEmployee } from "../model/college-department-employee";
import { HttpClient } from '@angular/common/http';
import { environment } from "src/environments/environment";
@Injectable({
    providedIn: 'root'
})
export class CollegeDepartmentEmployeeService {

    private apiServerUrl = environment.apiBaseUrl + "/college/department/employee";
    constructor(private http: HttpClient) {

    }

    public getCollegeDepartmentEmployee(): Observable<CollegeDepartmentEmployee[]> {
        return this.http.get<any>(`${this.apiServerUrl}`)
    };

    public addCollegeDepartmentEmployee(collegeDepartmentEmployee: CollegeDepartmentEmployee): Observable<CollegeDepartmentEmployee> {
        return this.http.post<CollegeDepartmentEmployee>(`${this.apiServerUrl}`, collegeDepartmentEmployee);
    }
    public updateCollegeDepartmentEmployee(collegeDepartmentEmployee: CollegeDepartmentEmployee): Observable<CollegeDepartmentEmployee> {
        return this.http.put<CollegeDepartmentEmployee>(`${this.apiServerUrl}`, collegeDepartmentEmployee);
    }

    public deleteCollegeDepartmentEmployee(collegeDepartmentEmployeeId: string): Observable<void> {
        return this.http.delete<void>(`${this.apiServerUrl}/${collegeDepartmentEmployeeId}`);
    }
}