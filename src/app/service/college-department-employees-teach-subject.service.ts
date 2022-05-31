import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { CollegeDepartmentEmployeesTeachSubject } from "../model/college-department-employees-teach-subject";
import { HttpClient } from '@angular/common/http';
import { environment } from "src/environments/environment";
@Injectable({
    providedIn: 'root'
})
export class CollegeDepartmentEmployeesTeachSubjectService {
    private apiServerUrl = environment.apiBaseUrl+"/college/department/employees/teach/subject";
    constructor(private http: HttpClient) {

    }

    public getCollegeDepartmentEmployeesTeachSubject(): Observable<CollegeDepartmentEmployeesTeachSubject[]> {
        return this.http.get<any>(`${this.apiServerUrl}`)
    };

    public addCollegeDepartmentEmployeesTeachSubject(collegeDepartmentEmployeesTeachSubject: CollegeDepartmentEmployeesTeachSubject): Observable<CollegeDepartmentEmployeesTeachSubject> {
        return this.http.post<CollegeDepartmentEmployeesTeachSubject>(`${this.apiServerUrl}`, collegeDepartmentEmployeesTeachSubject);
    }
    public updateCollegeDepartmentEmployeesTeachSubject(collegeDepartmentEmployeesTeachSubject: CollegeDepartmentEmployeesTeachSubject): Observable<CollegeDepartmentEmployeesTeachSubject> {
        return this.http.put<CollegeDepartmentEmployeesTeachSubject>(`${this.apiServerUrl}`, collegeDepartmentEmployeesTeachSubject);
    }
    
    public deleteCollegeDepartmentEmployeesTeachSubject(collegeDepartmentEmployeesTeachSubjectId: string): Observable<void> {
        return this.http.delete<void>(`${this.apiServerUrl}/${JSON.stringify(collegeDepartmentEmployeesTeachSubjectId)}`);
    }
}