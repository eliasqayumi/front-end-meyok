import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DepartmentStudents } from 'src/app/model/department-students';
import { DepartmentStudentsService } from 'src/app/service/department-students.service';
@Component({
  selector: 'app-department-student',
  templateUrl: './department-student.component.html',
  styleUrls: ['./department-student.component.css']
})
export class DepartmentStudentsStudentComponent implements OnInit {
  public departmentStudents: DepartmentStudents[];
  public editDepartmentStudents: DepartmentStudents;
  public deleteDepartmentStudents: DepartmentStudents;

  constructor(private departmentStudentsService: DepartmentStudentsService) { }

  ngOnInit() {
    this.getDepartmentStudentss();
  }

  public getDepartmentStudentss(): void {
    this.departmentStudentsService.getDepartmentStudents().subscribe(
      (response: DepartmentStudents[]) => {
        this.departmentStudents = response;
        this.departmentStudents.sort(function(a:any,b:any){
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
    document.getElementById('add-DepartmentStudents-form').click();
    this.departmentStudentsService.addDepartmentStudents(addForm.value).subscribe(
      (response: DepartmentStudents) => {
        console.log(response);
        this.getDepartmentStudentss();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }

  public onUpdateDepartmentStudents(DepartmentStudents: DepartmentStudents): void {
    console.log(DepartmentStudents)
    this.departmentStudentsService.updateDepartmentStudents(DepartmentStudents).subscribe(
      (response: DepartmentStudents) => {
        console.log(response);
        this.getDepartmentStudentss();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  public onDeleteCollege(DepartmentStudentsId: string): void {
    this.departmentStudentsService.deleteDepartmentStudents(DepartmentStudentsId).subscribe(
      (response: void) => {
        console.log(response);
        this.getDepartmentStudentss();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public search(key: string): void {
    console.log(key);
    const results: DepartmentStudents[] = [];
    for (const departmentStudent of this.departmentStudents) {
      if (departmentStudent.tcNo.name.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        results.push(departmentStudent);
      }
    }
    this.departmentStudents = results;
    if (results.length === 0 || !key) {
      this.getDepartmentStudentss();
    }
  }


  public onOpenModal(departmentStudents: any, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');

    if (mode === 'add') {
      button.setAttribute('data-target', '#addDepartmentStudentsModal');
    }
    if (mode === 'edit') {
      this.editDepartmentStudents = departmentStudents;
      button.setAttribute('data-target', '#updateDepartmentStudentsModal');
    }
    if (mode === 'delete') {
      this.deleteDepartmentStudents = departmentStudents;
      button.setAttribute('data-target', '#deleteDepartmentStudentsModal');
    }
    container != null ? container.appendChild(button) : null;
    button.click();
    console.log(mode)
  }
}