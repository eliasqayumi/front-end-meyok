import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Expertise } from "../model/expertise";
import { HttpClient } from '@angular/common/http';
import { environment } from "src/environments/environment";
@Injectable({
  providedIn: 'root'
})
export class ExpertiseService {

  private apiServerUrl = environment.apiBaseUrl + "/expertise";
  constructor(private http: HttpClient) {

  }

  public getExpertises(): Observable<Expertise[]> {
    return this.http.get<any>(`${this.apiServerUrl}`)
  };

  public addExpertise(expertise: Expertise): Observable<Expertise> {
    return this.http.post<Expertise>(`${this.apiServerUrl}`, expertise);
  }
  public updateExpertise(expertise: Expertise): Observable<Expertise> {
    return this.http.put<Expertise>(`${this.apiServerUrl}`, expertise);
  }

  public deleteExpertise(expertiseId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/${expertiseId}`);
  }
}