import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { College } from 'src/app/model/college';
import { CollegeDepartment } from 'src/app/model/college-department';
import { Department } from 'src/app/model/department';
import { CollegeDepartmentService } from 'src/app/service/college-department.service';
import { CollegeService } from 'src/app/service/college.service';
import { DepartmentService } from 'src/app/service/department.service';
import { ActivatedRoute, Router } from '@angular/router'
@Component({
  selector: 'app-college-department',
  templateUrl: './college-department.component.html',
  styleUrls: ['./college-department.component.css']
})
export class CollegeDepartmentComponent implements OnInit {

  public collegeDepartments: CollegeDepartment[];
  public editCollegeDepartment: CollegeDepartment;
  public deleteCollegeDepartment: CollegeDepartment;
  public departments: Department[];
  public colleges: College[];
  public selectedDepartment = null;
  public selectedCollege = null;
  public selectedRadioButton = null;

  constructor(
    private collegeDepartmentService: CollegeDepartmentService,
    private collegeService: CollegeService,
    private departmentService: DepartmentService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.getCollegeDepartments();
    this.getCollege();
    this.getDepartment();
  }
  public getCollege(): void {
    this.collegeService.getColleges().subscribe(
      (response: College[]) => {
        this.colleges = response;
        this.colleges.sort(function(a:any,b:any){
          return a.id - b.id;
        });
      }, (error: HttpErrorResponse) => {
        alert(error.message)
      }
    )
  }
  public getDepartment(): void {
    this.departmentService.getDepartments().subscribe(
      (resposne: Department[]) => {
        this.departments = resposne;
        this.departments.sort(function(a:any,b:any){
          return a.id - b.id;
        });
      }, (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  public getCollegeDepartments(): void {
    this.collegeDepartmentService.getCities().subscribe(
      (response: CollegeDepartment[]) => {
        this.collegeDepartments = response;
        this.collegeDepartments.sort(function(a:any,b:any){
          return a.id - b.id;
        });
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onAddCollegeDepartment(addForm: NgForm): void {
    console.log(addForm.value)
    document.getElementById('add-CollegeDepartment-form').click();
    this.collegeDepartmentService.addCollegeDepartment(addForm.value).subscribe(
      (response: CollegeDepartment) => {
        console.log(response);
        this.getCollegeDepartments();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }

  public onUpdateCollegeDepartment(collegeDepartment: CollegeDepartment): void {
    console.log(collegeDepartment)
    this.collegeDepartmentService.updateCollegeDepartment(collegeDepartment).subscribe(
      (response: CollegeDepartment) => {
        console.log(response);
        this.getCollegeDepartments();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  public onDeleteCollegeDepartment(collegeDepartmentId: string): void {
    this.collegeDepartmentService.deleteCollegeDepartment(collegeDepartmentId).subscribe(
      (response: void) => {
        console.log(response);
        this.getCollegeDepartments();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public search(key: string): void {
    console.log(key);
    const results: CollegeDepartment[] = [];
    for (const College of this.collegeDepartments) {
      if (College.department.departmentName.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        results.push(College);
      }
    }
    this.collegeDepartments = results;
    if (results.length === 0 || !key) {
      this.getCollegeDepartments();
    }
  }


  public onOpenModal(collegeDepartment: any, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');

    if (mode === 'add') {
      button.setAttribute('data-target', '#addCollegeDepartmentModal');
    }
    if (mode === 'edit') {
      this.editCollegeDepartment = collegeDepartment;
      this.selectedCollege = this.editCollegeDepartment.college
      this.selectedDepartment = this.editCollegeDepartment.department
      button.setAttribute('data-target', '#updateCollegeDepartmentModal');
    }
    if (mode === 'delete') {
      this.deleteCollegeDepartment = collegeDepartment;
      button.setAttribute('data-target', '#deleteCollegeDepartmentModal');
    }
    container != null ? container.appendChild(button) : null;
    button.click();
    console.log(mode)
  }
  public onSelect(collegeDepartment) {
    // this.router.navigate(['/college/department/', collegeDepartment.college.id])
    this.router.navigate([collegeDepartment.college.id], { relativeTo: this.activatedRoute })
  }
}