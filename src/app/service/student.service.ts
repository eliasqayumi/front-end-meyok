import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Student } from "../model/student";
import { HttpClient } from '@angular/common/http';
import { environment } from "src/environments/environment";
@Injectable({
  providedIn: 'root'
})
export class StudentService {


  private apiServerUrl = environment.apiBaseUrl+"/student";
  constructor(private http: HttpClient) {

  }

  public getStudents(): Observable<Student[]> {
      return this.http.get<any>(`${this.apiServerUrl}`)
  };

  public addStudent(student: Student): Observable<Student> {
      return this.http.post<Student>(`${this.apiServerUrl}`, student);
  }
  public updateStudent(student: Student): Observable<Student> {
      return this.http.put<Student>(`${this.apiServerUrl}`, student);
  }
  
  public deleteStudent(studentId: string): Observable<void> {
      return this.http.delete<void>(`${this.apiServerUrl}/${studentId}`);
  }
}
