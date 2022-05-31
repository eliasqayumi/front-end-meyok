import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subject } from 'src/app/model/Subject';
import { SubjectService } from 'src/app/service/Subject.service';
@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.css']
})
export class SubjectComponent implements OnInit {
  public subjects: Subject[];
  public editSubject: Subject;
  public deleteSubject: Subject;

  constructor(private subjectService: SubjectService) { }

  ngOnInit() {
    this.getSubjects();
  }

  public getSubjects(): void {
    this.subjectService.getSubjects().subscribe(
      (response: Subject[]) => {
        this.subjects = response;
        this.subjects.sort(function(a:any,b:any){
          return a.id - b.id;
        });
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onAddSubject(addForm: NgForm): void {
    console.log(addForm.value)
    document.getElementById('add-Subject-form').click();
    this.subjectService.addSubject(addForm.value).subscribe(
      (response: Subject) => {
        console.log(response);
        this.getSubjects();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }

  public onUpdateSubject(subject: Subject): void {
    console.log(subject)
    this.subjectService.updateSubject(subject).subscribe(
      (response: Subject) => {
        console.log(response);
        this.getSubjects();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  public onDeleteSubject(subjectId: string): void {
    this.subjectService.deleteSubject(subjectId).subscribe(
      (response: void) => {
        console.log(response);
        this.getSubjects();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public search(key: string): void {
    console.log(key);
    const results: Subject[] = [];
    for (const subject of this.subjects) {
      if (
        subject.id.toLowerCase().indexOf(key.toLowerCase()) !== -1||
        subject.subjectName.toLowerCase().indexOf(key.toLowerCase()) !== -1||
        subject.subjectCredit.toLowerCase().indexOf(key.toLowerCase()) !== -1||
        subject.subjectAkts.toLowerCase().indexOf(key.toLowerCase()) !== -1
        ) {
        results.push(subject);
      }
    }
    this.subjects = results;
    if (results.length === 0 || !key) {
      this.getSubjects();
    }
  }


  public onOpenModal(subject: any, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');

    if (mode === 'add') {
      button.setAttribute('data-target', '#addSubjectModal');
    }
    if (mode === 'edit') {
      this.editSubject = subject;
      button.setAttribute('data-target', '#updateSubjectModal');
    }
    if (mode === 'delete') {
      this.deleteSubject = subject;
      button.setAttribute('data-target', '#deleteSubjectModal');
    }
    container != null ? container.appendChild(button) : null;
    button.click();
    console.log(mode)
  }
}