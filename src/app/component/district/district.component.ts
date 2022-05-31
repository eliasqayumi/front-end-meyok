import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { City } from 'src/app/model/city';
import { District } from 'src/app/model/district';
import { CityService } from 'src/app/service/city.service';
import { DistrictService } from 'src/app/service/district.service';
@Component({
  selector: 'app-district',
  templateUrl: './district.component.html',
  styleUrls: ['./district.component.css']
})
export class DistrictComponent implements OnInit {

  public districts: District[];
  public cities: City[];
  public editDistrict: District;
  public deleteDistrict: District;
  public selectedCity = null;

  constructor(private districtService: DistrictService,
    private cityService: CityService
  ) { }

  ngOnInit() {
    this.getDistricts();
    this.getCities();
  }


  public getCities() {
    this.cityService.getCities().subscribe(
      (response: City[]) => {
        this.cities = response;
        this.cities.sort(function(a:any,b:any){
          return a.id - b.id;
        });
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  public getDistricts(): void {
    this.districtService.getDistricts().subscribe(
      (response: District[]) => {
        console.log(response)
        this.districts = response;
        this.districts.sort(function(a:any,b:any){
          return a.id - b.id;
        });
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onAddDistrict(addForm: NgForm): void {
    console.log(addForm.value)
    document.getElementById('add-District-form').click();
    this.districtService.addDistrict(addForm.value).subscribe(
      (response: District) => {
        console.log(response);
        this.getDistricts();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }

  public onUpdateDistrict(District: District): void {
    console.log(District)
    this.districtService.updateDistrict(District).subscribe(
      (response: District) => {
        console.log(response);
        this.getDistricts();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  public onDeleteDistrict(DistrictId: string): void {
    this.districtService.deleteDistrict(DistrictId).subscribe(
      (response: void) => {
        console.log(response);
        this.getDistricts();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public search(key: string): void {
    console.log(key);
    const results: District[] = [];
    for (const district of this.districts) {
      if (district.id.toLowerCase().indexOf(key.toLowerCase()) !== -1||
      district.districtName.toLowerCase().indexOf(key.toLowerCase()) !== -1||
      district.city.id.toLowerCase().indexOf(key.toLowerCase()) !== -1||
      district.city.cityName.toLowerCase().indexOf(key.toLowerCase()) !== -1
      ) {
        results.push(district);
      }
    }
    this.districts = results;
    // if (results.length === 0 || !key) {
    if ( !key) {
      this.getDistricts();
    }
  }


  public onOpenModal(district: any, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');

    if (mode === 'add') {
      button.setAttribute('data-target', '#addDistrictModal');
    }
    if (mode === 'edit') {
      this.editDistrict = district;
      this.selectedCity =this.editDistrict.city;
      button.setAttribute('data-target', '#updateDistrictModal');
    }
    if (mode === 'delete') {
      this.deleteDistrict = district;
      button.setAttribute('data-target', '#deleteDistrictModal');
    }
    container != null ? container.appendChild(button) : null;
    button.click();
    console.log(mode)
  }
}
