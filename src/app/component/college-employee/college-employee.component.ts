
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { College } from 'src/app/model/college';
import { CollegeEmployee } from 'src/app/model/college-employee';
import { Employee } from 'src/app/model/employee';
import { CollegeEmployeeService } from 'src/app/service/college-employee.service';
import { CollegeService } from 'src/app/service/college.service';
import { EmployeeService } from 'src/app/service/employee.service';
@Component({
  selector: 'app-college-employee',
  templateUrl: './college-employee.component.html',
  styleUrls: ['./college-employee.component.css']
})
export class CollegeEmployeeComponent implements OnInit {

  public collegeEmployees: CollegeEmployee[];
  public editCollegeEmployee: CollegeEmployee;
  public deleteCollegeEmployee: CollegeEmployee;
  public colleges: College[];
  public employees: Employee[];
  public selectedCollege = null;
  public selectedEmployee = null;

  constructor(
    private collegeEmployeeService: CollegeEmployeeService,
    private employeeService: EmployeeService,
    private collegeService: CollegeService
  ) { }

  ngOnInit() {
    this.getCollegeEmployees();
    this.getCollege();
    this.getEmployees();
  }

  public getEmployees(): void {
    this.employeeService.getEmployees().subscribe(
      (response: Employee[]) => {
        this.employees = response;
        this.employees.sort(function (a: any, b: any) {
          return a.id - b.id;
        });
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  public getCollege(): void {
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
    );
  }

  public onAddCollegeEmployee(addForm: NgForm): void {
    console.log(addForm.value)
    document.getElementById('add-CollegeEmployee-form').click();
    this.collegeEmployeeService.addCollegeEmlpoyee(addForm.value).subscribe(
      (response: CollegeEmployee) => {
        console.log(response);
        this.getCollegeEmployees();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }

  public onUpdateCollegeEmployee(collegeEmployee: CollegeEmployee): void {
    console.log(collegeEmployee)
    this.collegeEmployeeService.updateCollegeEmlpoyee(collegeEmployee).subscribe(
      (response: CollegeEmployee) => {
        console.log(response);
        this.getCollegeEmployees();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  public onDeleteCollegeEmployee(collegeEmployeeId: string): void {
    this.collegeEmployeeService.deleteCollegeEmlpoyee(collegeEmployeeId).subscribe(
      (response: void) => {
        console.log(response);
        this.getCollegeEmployees();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public search(key: string): void {
    console.log(key);
    const results: CollegeEmployee[] = [];
    for (const collegeEmployee of this.collegeEmployees) {
      if (
        collegeEmployee.id.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
        collegeEmployee.tcNo.name.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
        collegeEmployee.tcNo.surname.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
        collegeEmployee.college.collegeName.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
        collegeEmployee.entranceDate.toString().indexOf(key.toLowerCase()) !== -1 ||
        collegeEmployee.task.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
        collegeEmployee.title.toLowerCase().indexOf(key.toLowerCase()) !== -1
      ) {
        results.push(collegeEmployee);
      }
    }
    this.collegeEmployees = results;
    // if (results.length === 0 || !key) {
    if (!key) {
      this.getCollegeEmployees();
    }
  }


  public onOpenModal(collegeEmployee: any, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');

    if (mode === 'add') {
      button.setAttribute('data-target', '#addCollegeEmployeeModal');
    }
    if (mode === 'edit') {
      this.editCollegeEmployee = collegeEmployee;
      this.selectedCollege = this.editCollegeEmployee.college;
      this.selectedEmployee = this.editCollegeEmployee.tcNo
      button.setAttribute('data-target', '#updateCollegeEmployeeModal');
    }
    if (mode === 'delete') {
      this.deleteCollegeEmployee = collegeEmployee;
      button.setAttribute('data-target', '#deleteCollegeEmployeeModal');
    }
    container != null ? container.appendChild(button) : null;
    button.click();
    console.log(mode)
  }
}