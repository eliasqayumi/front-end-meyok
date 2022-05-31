import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Kind } from "../model/kind";
import { HttpClient } from '@angular/common/http';
import { environment } from "src/environments/environment";
@Injectable({
  providedIn: 'root'
})
export class KindService {
  private apiServerUrl = environment.apiBaseUrl + "/kind";
  constructor(private http: HttpClient) {

  }

  public getKinds(): Observable<Kind[]> {
    return this.http.get<any>(`${this.apiServerUrl}`);
  }

  public addKind(kind: Kind): Observable<Kind> {
    return this.http.post<Kind>(`${this.apiServerUrl}`, kind);
  }

  public updateKind(kind: Kind): Observable<Kind> {
    return this.http.put<Kind>(`${this.apiServerUrl}`, kind);
  }

  public deleteKind(kindId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/${kindId}`);
  }
}
