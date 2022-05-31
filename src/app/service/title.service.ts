import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Title } from "../model/title";
import { HttpClient } from '@angular/common/http';
import { environment } from "src/environments/environment";
@Injectable({
  providedIn: 'root'
})
export class TitleService {
  private apiServerUrl = environment.apiBaseUrl + "/title";
  constructor(private http: HttpClient) {

  }

  public getTitles(): Observable<Title[]> {
    return this.http.get<any>(`${this.apiServerUrl}`)
  };

  public addTitle(title: Title): Observable<Title> {
    return this.http.post<Title>(`${this.apiServerUrl}`, title);
  }
  
  public updateTitle(title: Title): Observable<Title> {
    return this.http.put<Title>(`${this.apiServerUrl}`, title);
  }

  public deleteTitle(titleId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/${titleId}`);
  }
}
