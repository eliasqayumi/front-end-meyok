import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Department } from 'src/app/model/department';
import { DepartmentService } from 'src/app/service/department.service';
@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit {
  public departments: Department[];
  public editDepartment: Department;
  public deleteDepartment: Department;

  constructor(private departmentService: DepartmentService) { }

  ngOnInit() {
    this.getDepartments();
  }

  public getDepartments(): void {
    this.departmentService.getDepartments().subscribe(
      (response: Department[]) => {
        this.departments = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onAddDepartment(addForm: NgForm): void {
    console.log(addForm.value)
    document.getElementById('add-Department-form').click();
    this.departmentService.addDepartment(addForm.value).subscribe(
      (response: Department) => {
        console.log(response);
        this.getDepartments();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }

  public onUpdateDepartment(department: Department): void {
    console.log(department)
    this.departmentService.updateDepartment(department).subscribe(
      (response: Department) => {
        console.log(response);
        this.getDepartments();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  public onDeleteDepartment(departmentId: string): void {
    this.departmentService.deleteDepartment(departmentId).subscribe(
      (response: void) => {
        console.log(response);
        this.getDepartments();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public search(key: string): void {
    console.log(key);
    const results: Department[] = [];
    for (const department of this.departments) {
      if (
        department.departmentName.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
        department.id.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
        department.departmentDetails.toLowerCase().indexOf(key.toLowerCase()) !== -1
      ) {
        results.push(department);
      }
    }
    this.departments = results;
    // if (results.length === 0 || !key) {
    if (!key) {
      this.getDepartments();
    }
  }


  public onOpenModal(department: any, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');

    if (mode === 'add') {
      button.setAttribute('data-target', '#addDepartmentModal');
    }
    if (mode === 'edit') {
      this.editDepartment = department;
      button.setAttribute('data-target', '#updateDepartmentModal');
    }
    if (mode === 'delete') {
      this.deleteDepartment = department;
      button.setAttribute('data-target', '#deleteDepartmentModal');
    }
    container != null ? container.appendChild(button) : null;
    button.click();
    console.log(mode)
  }
}