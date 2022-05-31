import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Subject } from "../model/subject";
import { HttpClient } from '@angular/common/http';
import { environment } from "src/environments/environment";
@Injectable({
  providedIn: 'root'
})
export class SubjectService {
  private apiServerUrl = environment.apiBaseUrl+"/subject";
  constructor(private http: HttpClient) {

  }

  public getSubjects(): Observable<Subject[]> {
      return this.http.get<any>(`${this.apiServerUrl}`)
  };

  public addSubject(subject: Subject): Observable<Subject> {
      return this.http.post<Subject>(`${this.apiServerUrl}`, subject);
  }
  public updateSubject(subject: Subject): Observable<Subject> {
      return this.http.put<Subject>(`${this.apiServerUrl}`, subject);
  }
  
  public deleteSubject(subjectId: string): Observable<void> {
      return this.http.delete<void>(`${this.apiServerUrl}/${subjectId}`);
  }
}