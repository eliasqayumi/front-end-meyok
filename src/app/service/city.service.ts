import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { City } from "../model/city";
import { HttpClient } from '@angular/common/http';
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})
export class CityService {
    private apiServerUrl = environment.apiBaseUrl+"/city";
    constructor(private http: HttpClient) {

    }

    // get all cities
    public getCities(): Observable<City[]> {
        return this.http.get<any>(`${this.apiServerUrl}`)
    };
    // get city by id
    public getCityById(cityId:string): Observable<City> {
        return this.http.get<City>(`${this.apiServerUrl}/${cityId}`)
    };

    public addCity(city: City): Observable<City> {
        return this.http.post<City>(`${this.apiServerUrl}`, city);
    }
    public updateCity(city: City): Observable<City> {
        return this.http.put<City>(`${this.apiServerUrl}`, city);
    }
    
    public deleteCity(cityId: string): Observable<void> {
        return this.http.delete<void>(`${this.apiServerUrl}/${cityId}`);
    }
}