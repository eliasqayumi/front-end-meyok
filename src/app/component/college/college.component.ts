import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { College } from 'src/app/model/college';
import { District } from 'src/app/model/district';
import { Kind } from 'src/app/model/kind';
import { CollegeService } from 'src/app/service/college.service';
import { DistrictService } from 'src/app/service/district.service';
import { KindService } from 'src/app/service/Kind.service';

@Component({
  selector: 'app-college',
  templateUrl: './college.component.html',
  styleUrls: ['./college.component.css']
})
export class CollegeComponent implements OnInit {

  public colleges: College[];
  public editCollege: College;
  public deleteCollege: College;
  public kinds: Kind[];
  public districts: District[];
  public selectedDistrict = null;
  public selectedKind = null;


  constructor(
    private collegeService: CollegeService,
    private kindService: KindService,
    private districtService: DistrictService
  ) { }

  ngOnInit() {
    this.getColleges();
    this.getKinds();
    this.getDistricts();
  }
  public getKinds(): void {
    this.kindService.getKinds().subscribe(
      (response: Kind[]) => {
        this.kinds = response;
        this.kinds.sort(function (a: any, b: any) {
          return a.id - b.id;
        });
      }, (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }
  public getDistricts(): void {
    this.districtService.getDistricts().subscribe(
      (response: District[]) => {
        this.districts = response;
        this.districts.sort(function (a: any, b: any) {
          return a.id - b.id;
        });
      }, (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  public getColleges(): void {
    this.collegeService.getColleges().subscribe(
      (response: College[]) => {
        this.colleges = response;
        this.colleges.sort(function (a: any, b: any) {
          return a.id - b.id;
        });
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onAddCollege(addForm: NgForm): void {
    console.log(addForm.value)
    document.getElementById('add-College-form').click();
    this.collegeService.addCollege(addForm.value).subscribe(
      (response: College) => {
        console.log(response);
        this.getColleges();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }

  public onUpdateCollege(college: College): void {
    console.log(college)
    this.collegeService.updateCollege(college).subscribe(
      (response: College) => {
        console.log(response);
        this.getColleges();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  public onDeleteCollege(collegeId: string): void {
    this.collegeService.deleteCollege(collegeId).subscribe(
      (response: void) => {
        console.log(response);
        this.getColleges();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public search(key: string): void {
    console.log(key);
    const results: College[] = [];
    for (const College of this.colleges) {
      if (
        College.id.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
        College.collegeName.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
        College.kind.kind.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
        College.district.id.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
        College.district.districtName.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
        College.createDate.toString().indexOf(key.toLowerCase()) !== -1
      ) {
        results.push(College);
      }
    }
    this.colleges = results;
    // if (results.length === 0 || !key) {
    if (!key) {
      this.getColleges();
    }
  }

  public onOpenModal(college: any, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addCollegeModal');
    }
    if (mode === 'edit') {
      this.editCollege = college;
      this.selectedKind = this.editCollege.kind;
      this.selectedDistrict = this.editCollege.district;
      button.setAttribute('data-target', '#updateCollegeModal');
    }
    if (mode === 'delete') {
      this.deleteCollege = college;
      button.setAttribute('data-target', '#deleteCollegeModal');
    }
    container != null ? container.appendChild(button) : null;
    button.click();
    console.log(mode)
  }
}