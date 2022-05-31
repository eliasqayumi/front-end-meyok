import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Term } from "../model/term";
import { HttpClient } from '@angular/common/http';
import { environment } from "src/environments/environment";
@Injectable({
  providedIn: 'root'
})
export class TermService {

  private apiServerUrl = environment.apiBaseUrl + "/term";

  constructor(private http: HttpClient) {
    
  }

  public getTerms(): Observable<Term[]> {
    return this.http.get<any>(`${this.apiServerUrl}`)
  };

  public addTerm(term: Term): Observable<Term> {
    return this.http.post<Term>(`${this.apiServerUrl}`, term);
  }
  public updateTerm(term: Term): Observable<Term> {
    return this.http.put<Term>(`${this.apiServerUrl}`, term);
  }

  public deleteTerm(termId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/${termId}`);
  }
}