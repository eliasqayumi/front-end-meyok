
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { District } from "../model/district";
import { HttpClient } from '@angular/common/http';
import { environment } from "src/environments/environment";
@Injectable({
  providedIn: 'root'
})
export class DistrictService {
  private apiServerUrl = environment.apiBaseUrl+"/district";
  constructor(private http: HttpClient) {

  }

  public getDistricts(): Observable<District[]> {
      return this.http.get<any>(`${this.apiServerUrl}`)
  };
  // get all district by city id
  public getAllDistrictsByCityId(cityId:string): Observable<District[]> {
      return this.http.get<any>(`${this.apiServerUrl}/${cityId}`)
  };

  public addDistrict(district: District): Observable<District> {
    
      return this.http.post<District>(`${this.apiServerUrl}`, district);
  }
  public updateDistrict(district: District): Observable<District> {
      return this.http.put<District>(`${this.apiServerUrl}`, district);
  }
  
  public deleteDistrict(districtId: string): Observable<void> {
      return this.http.delete<void>(`${this.apiServerUrl}/${districtId}`);
  }
}