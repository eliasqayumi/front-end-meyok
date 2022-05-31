import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { City } from 'src/app/model/city';
import { CityService } from 'src/app/service/city.service';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.css']
})
export class CityComponent implements OnInit {
  public cities: City[];
  public editCity: City;
  public deleteCity: City;

  constructor(
    private cityService: CityService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.getCities();
  }

  public getCities(): void {
    this.cityService.getCities().subscribe(
      (response: City[]) => {
        this.cities = response;
        this.cities.sort(function (a: any, b: any) {
          return a.id - b.id;
        });
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onAddCity(addForm: NgForm): void {
    console.log(addForm.value)
    document.getElementById('add-city-form').click();
    this.cityService.addCity(addForm.value).subscribe(
      (response: City) => {
        console.log(response);
        this.getCities();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }

  public onUpdateCity(city: City): void {
    console.log(city)
    this.cityService.updateCity(city).subscribe(
      (response: City) => {
        console.log(response);
        this.getCities();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  public onDeleteCity(cityId: string): void {
    this.cityService.deleteCity(cityId).subscribe(
      (response: void) => {
        console.log(response);
        this.getCities();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public search(key: string): void {
    console.log(key);
    const results: City[] = [];
    for (const city of this.cities) {
      if (city.cityName.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
        city.id.toLowerCase().indexOf(key.toLowerCase()) !== -1
      ) {
        results.push(city);
      }
    }
    this.cities = results;
    // if (results.length === 0 || !key) {
    if (!key) {
      this.getCities();
    }
  }


  public onOpenModal(city: any, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addCityModal');
    }
    if (mode === 'edit') {
      this.editCity = city;
      button.setAttribute('data-target', '#updateCityModal');
    }
    if (mode === 'delete') {
      this.deleteCity = city;
      button.setAttribute('data-target', '#deleteCityModal');
    }
    container != null ? container.appendChild(button) : null;
    button.click();
    console.log(mode)
  }
  public onSelect(city) {
    this.router.navigate([city.id], { relativeTo: this.activatedRoute })
  }

}
