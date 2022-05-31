import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { StudentsTakeSubject } from "../model/students-take-subject";
import { HttpClient } from '@angular/common/http';
import { environment } from "src/environments/environment";
@Injectable({
  providedIn: 'root'
})
export class StudentsTakeSubjectService {

  private apiServerUrl = environment.apiBaseUrl + "students/take/subject";
  constructor(private http: HttpClient) {

  }

  public getStudentsTakeSubjects(): Observable<StudentsTakeSubject[]> {
    return this.http.get<any>(`${this.apiServerUrl}`)
  };

  public addStudentsTakeSubject(studentsTakeSubject: StudentsTakeSubject): Observable<StudentsTakeSubject> {
    return this.http.post<StudentsTakeSubject>(`${this.apiServerUrl}`, studentsTakeSubject);
  }
  public updateStudentsTakeSubject(studentsTakeSubject: StudentsTakeSubject): Observable<StudentsTakeSubject> {
    return this.http.put<StudentsTakeSubject>(`${this.apiServerUrl}`, studentsTakeSubject);
  }

  public deleteStudentsTakeSubject(studentsTakeSubjectId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/${studentsTakeSubjectId}`);
  }
}


