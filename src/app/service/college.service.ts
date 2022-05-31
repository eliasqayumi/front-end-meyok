import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { College } from "../model/College";
import { HttpClient } from '@angular/common/http';
import { environment } from "src/environments/environment";
@Injectable({
  providedIn: 'root'
})
export class CollegeService {
    private apiServerUrl = environment.apiBaseUrl+"/college";
    constructor(private http: HttpClient) {

    }

    public getColleges(): Observable<College[]> {
        return this.http.get<any>(`${this.apiServerUrl}`)
    };

    public addCollege(College: College): Observable<College> {
        return this.http.post<College>(`${this.apiServerUrl}`, College);
    }
    public updateCollege(College: College): Observable<College> {
        return this.http.put<College>(`${this.apiServerUrl}`, College);
    }
    
    public deleteCollege(CollegeId: string): Observable<void> {
        return this.http.delete<void>(`${this.apiServerUrl}/${CollegeId}`);
    }
}