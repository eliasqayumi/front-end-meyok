import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Task } from "../model/task";
import { HttpClient } from '@angular/common/http';
import { environment } from "src/environments/environment";
@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private apiServerUrl = environment.apiBaseUrl+"/task";
  constructor(private http: HttpClient) {

  }

  public getTasks(): Observable<Task[]> {
      return this.http.get<any>(`${this.apiServerUrl}`)
  };

  public addTask(task: Task): Observable<Task> {
      return this.http.post<Task>(`${this.apiServerUrl}`, task);
  }
  public updateTask(task: Task): Observable<Task> {
      return this.http.put<Task>(`${this.apiServerUrl}`, task);
  }
  
  public deleteTask(taskId: string): Observable<void> {
      return this.http.delete<void>(`${this.apiServerUrl}/${taskId}`);
  }
}