import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CollegeDepartmentEmployee } from 'src/app/model/college-department-employee';
import { CollegeEmployee } from 'src/app/model/college-employee';
import { Department } from 'src/app/model/department';
import { Expertise } from 'src/app/model/expertise';
import { CollegeDepartmentEmployeeService } from 'src/app/service/college-department-employee.service';
import { CollegeEmployeeService } from 'src/app/service/college-employee.service';
import { DepartmentService } from 'src/app/service/department.service';
import { ExpertiseService } from 'src/app/service/expertise.service';
@Component({
  selector: 'app-college-department-employee',
  templateUrl: './college-department-employee.component.html',
  styleUrls: ['./college-department-employee.component.css']
})
export class CollegeDepartmentEmployeeComponent implements OnInit {
  public collegeDepartmentEmployees: CollegeDepartmentEmployee[];
  public editCollegeDepartmentEmployee: CollegeDepartmentEmployee;
  public deleteCollegeDepartmentEmployee: CollegeDepartmentEmployee;
  public collegeEmployees: CollegeEmployee[];
  public expertises: Expertise[];
  public departments: Department[];
  public selectedExpertise = null;
  public selectedDepartment = null;
  public selectedCollegeEmployee = null;

  constructor(
    private collegeDepartmentEmployeeService: CollegeDepartmentEmployeeService,
    private collegeEmployeeService: CollegeEmployeeService,
    private departmentService: DepartmentService,
    private expertiseService: ExpertiseService
  ) { }

  ngOnInit() {
    this.getCollegeDepartmentEmployees();
    this.getDepartments();
    this.getExpertises();
    this.getCollegeEmployees();
  }

  public getCollegeDepartmentEmployees(): void {
    this.collegeDepartmentEmployeeService.getCollegeDepartmentEmployee().subscribe(
      (response: CollegeDepartmentEmployee[]) => {
        this.collegeDepartmentEmployees = response;
        this.collegeDepartmentEmployees.sort(function (a: any, b: any) {
          return a.id - b.id;
        });
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public getDepartments(): void {
    this.departmentService.getDepartments().subscribe(
      (response: Department[]) => {
        this.departments = response;
        this.departments.sort(function (a: any, b: any) {
          return a.id - b.id;
        });
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }
  public getExpertises(): void {
    this.expertiseService.getExpertises().subscribe(
      (response: Expertise[]) => {
        this.expertises = response;
        this.expertises.sort(function (a: any, b: any) {
          return a.id - b.id;
        });
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }
  public getCollegeEmployees(): void {
    this.collegeEmployeeService.getCollegeEmployee().subscribe(
      (response: CollegeEmployee[]) => {
        this.collegeEmployees = response;
        this.collegeEmployees.sort(function (a: any, b: any) {
          return a.id - b.id;
        });
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  public onAddCollegeDepartmentEmployee(addForm: NgForm): void {
    console.log(addForm.value)
    document.getElementById('add-CollegeDepartmentEmployee-form').click();
    this.collegeDepartmentEmployeeService.addCollegeDepartmentEmployee(addForm.value).subscribe(
      (response: CollegeDepartmentEmployee) => {
        console.log(response);
        this.getCollegeDepartmentEmployees();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }

  public onUpdateCollegeDepartmentEmployee(collegeDepartmentEmployee: CollegeDepartmentEmployee): void {
    console.log(collegeDepartmentEmployee)
    this.collegeDepartmentEmployeeService.updateCollegeDepartmentEmployee(collegeDepartmentEmployee).subscribe(
      (response: CollegeDepartmentEmployee) => {
        console.log(response);
        this.getCollegeDepartmentEmployees();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  public onDeleteCollegeDepartmentEmployee(collegeDepartmentEmployeeId: string): void {
    this.collegeDepartmentEmployeeService.deleteCollegeDepartmentEmployee(collegeDepartmentEmployeeId).subscribe(
      (response: void) => {
        console.log(response);
        this.getCollegeDepartmentEmployees();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public search(key: string): void {
    console.log(key);
    const results: CollegeDepartmentEmployee[] = [];
    for (const collegeDepartmentEmployee of this.collegeDepartmentEmployees) {
      if (
        collegeDepartmentEmployee.id.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
        collegeDepartmentEmployee.employeeNo.tcNo.id.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
        collegeDepartmentEmployee.employeeNo.tcNo.name.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
        collegeDepartmentEmployee.employeeNo.tcNo.email.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
        collegeDepartmentEmployee.employeeNo.tcNo.contactNo.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
        collegeDepartmentEmployee.department.id.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
        collegeDepartmentEmployee.department.departmentName.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
        collegeDepartmentEmployee.department.departmentDetails.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
        collegeDepartmentEmployee.expertise.id.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
        collegeDepartmentEmployee.expertise.expertisePart.toLowerCase().indexOf(key.toLowerCase()) !== -1
        ) {
        results.push(collegeDepartmentEmployee);
      }
    }
    this.collegeDepartmentEmployees = results;
    // if (results.length === 0 || !key) {
    if (!key) {
      this.getCollegeDepartmentEmployees();
    }
  }


  public onOpenModal(collegeDepartmentEmployee: any, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');

    if (mode === 'add') {
      button.setAttribute('data-target', '#addCollegeDepartmentEmployeeModal');
    }
    if (mode === 'edit') {
      this.editCollegeDepartmentEmployee = collegeDepartmentEmployee;
      this.selectedDepartment = this.editCollegeDepartmentEmployee.department;
      this.selectedExpertise = this.editCollegeDepartmentEmployee.expertise
      this.selectedCollegeEmployee = this.editCollegeDepartmentEmployee.employeeNo;
      button.setAttribute('data-target', '#updateCollegeDepartmentEmployeeModal');
    }
    if (mode === 'delete') {
      this.deleteCollegeDepartmentEmployee = collegeDepartmentEmployee;
      button.setAttribute('data-target', '#deleteCollegeDepartmentEmployeeModal');
    }
    container != null ? container.appendChild(button) : null;
    button.click();
    console.log(mode)
  }
}