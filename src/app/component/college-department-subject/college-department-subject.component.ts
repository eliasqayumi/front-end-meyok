import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CollegeDepartmentSubject } from 'src/app/model/college-department-subject';
import { CollegeDepartmentSubjectService } from 'src/app/service/college-department-subject.service';
@Component({
  selector: 'app-college-department-subject',
  templateUrl: './college-department-subject.component.html',
  styleUrls: ['./college-department-subject.component.css']
})
export class CollegeDepartmentSubjectComponent implements OnInit {
  public collegeDepartmentSubjects: CollegeDepartmentSubject[];
  public editCollegeDepartmentSubject: CollegeDepartmentSubject;
  public deleteCollegeDepartmentSubject: CollegeDepartmentSubject;

  constructor(private collegeDepartmentSubjectService: CollegeDepartmentSubjectService) { }

  ngOnInit() {
    this.getCollegeDepartmentSubjects();
  }

  public getCollegeDepartmentSubjects(): void {
    this.collegeDepartmentSubjectService.getCities().subscribe(
      (response: CollegeDepartmentSubject[]) => {
        this.collegeDepartmentSubjects = response;
        this.collegeDepartmentSubjects.sort(function(a:any,b:any){
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
    document.getElementById('add-CollegeDepartmentSubject-form').click();
    this.collegeDepartmentSubjectService.addCollegeDepartmentSubject(addForm.value).subscribe(
      (response: CollegeDepartmentSubject) => {
        console.log(response);
        this.getCollegeDepartmentSubjects();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }

  public onUpdateCollegeDepartmentSubject(collegeDepartmentSubject: CollegeDepartmentSubject): void {
    console.log(collegeDepartmentSubject)
    this.collegeDepartmentSubjectService.updateCollegeDepartmentSubject(collegeDepartmentSubject).subscribe(
      (response: CollegeDepartmentSubject) => {
        console.log(response);
        this.getCollegeDepartmentSubjects();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  public onDeleteCollege(collegeDepartmentSubjectId: string): void {
    this.collegeDepartmentSubjectService.deleteCollegeDepartmentSubject(collegeDepartmentSubjectId).subscribe(
      (response: void) => {
        console.log(response);
        this.getCollegeDepartmentSubjects();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public search(key: string): void {
    console.log(key);
    const results: CollegeDepartmentSubject[] = [];
    for (const College of this.collegeDepartmentSubjects) {
      if (College.subject.subjectName.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        results.push(College);
      }
    }
    this.collegeDepartmentSubjects = results;
    if (results.length === 0 || !key) {
      this.getCollegeDepartmentSubjects();
    }
  }


  public onOpenModal(collegeDepartmentSubject: any, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');

    if (mode === 'add') {
      button.setAttribute('data-target', '#addCollegeDepartmentSubjectModal');
    }
    if (mode === 'edit') {
      this.editCollegeDepartmentSubject = collegeDepartmentSubject;
      button.setAttribute('data-target', '#updateCollegeDepartmentSubjectModal');
    }
    if (mode === 'delete') {
      this.deleteCollegeDepartmentSubject = collegeDepartmentSubject;
      button.setAttribute('data-target', '#deleteCollegeDepartmentSubjectModal');
    }
    container != null ? container.appendChild(button) : null;
    button.click();
    console.log(mode)
  }
}