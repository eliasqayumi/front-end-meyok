
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subject } from 'src/app/model/subject';
import { DepartmentStudents } from 'src/app/model/department-students';
import { Student } from 'src/app/model/Student';
import { StudentsTakeSubject } from 'src/app/model/students-take-Subject';
import { DepartmentStudentsService } from 'src/app/service/department-students.service';
import { StudentsTakeSubjectService } from 'src/app/service/student-take-subject.service';
import { SubjectService } from 'src/app/service/Subject.service';
import { TermService } from 'src/app/service/term.service';
import { Term } from 'src/app/model/term';
@Component({
  selector: 'app-student-take-subject',
  templateUrl: './students-take-subject.component.html',
  styleUrls: ['./students-take-subject.component.css']
})
export class StudentsTakeSubjectComponent implements OnInit {

  public studentsTakeSubjects: StudentsTakeSubject[];
  public departmentStudents: DepartmentStudents[];
  public subjects: Subject[];
  public terms: Term[];
  public editStudentsTakeSubject: StudentsTakeSubject;
  public deleteStudentsTakeSubject: StudentsTakeSubject;

  constructor(private studentsTakeSubjectService: StudentsTakeSubjectService,
    private studentsService: DepartmentStudentsService,
    private subjectService: SubjectService,
    private termService: TermService
  ) { }

  ngOnInit() {
    this.getStudentsTakeSubjects();
    this.getStudents();
    this.getTerms();
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
        alert(error.message)
      }
    );
  }

  public getTerms(): void {
    this.termService.getTerms().subscribe(
      (response: Term[]) => {
        this.terms = response;
        this.terms.sort(function(a:any,b:any){
          return a.id - b.id;
        });
      },
      (error: HttpErrorResponse) => {
        alert(error.message)
      }
    )
  }

  public getStudents(): void {
    this.studentsService.getDepartmentStudents().subscribe(
      (response: DepartmentStudents[]) => {
        this.departmentStudents = response;
        this.departmentStudents.sort(function(a:any,b:any){
          return a.id - b.id;
        });
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  public getStudentsTakeSubjects(): void {
    this.studentsTakeSubjectService.getStudentsTakeSubjects().subscribe(
      (response: StudentsTakeSubject[]) => {
        this.studentsTakeSubjects = response;
        this.studentsTakeSubjects.sort(function(a:any,b:any){
          return a.id - b.id;
        });
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onAddStudentsTakeSubject(addForm: NgForm): void {
    console.log(addForm.value)
    document.getElementById('add-StudentTakeSubject-form').click();
    this.studentsTakeSubjectService.addStudentsTakeSubject(addForm.value).subscribe(
      (response: StudentsTakeSubject) => {
        console.log(response);
        this.getStudentsTakeSubjects();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }

  public onUpdateStudentsTakeSubject(studentTakeSubject: StudentsTakeSubject): void {
    console.log(studentTakeSubject)
    this.studentsTakeSubjectService.updateStudentsTakeSubject(studentTakeSubject).subscribe(
      (response: StudentsTakeSubject) => {
        console.log(response);
        this.getStudentsTakeSubjects();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  public onDeleteStudentsTakeSubject(studentsTakeSubjectId: string): void {
    this.studentsTakeSubjectService.deleteStudentsTakeSubject(studentsTakeSubjectId).subscribe(
      (response: void) => {
        console.log(response);
        this.getStudentsTakeSubjects();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public search(key: string): void {
    console.log(key);
    const results: StudentsTakeSubject[] = [];
    for (const studentTakeSubject of this.studentsTakeSubjects) {
      if (studentTakeSubject.subject.subjectName.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        results.push(studentTakeSubject);
      }
    }
    this.studentsTakeSubjects = results;
    if (results.length === 0 || !key) {
      this.getStudentsTakeSubjects();
    }
  }


  public onOpenModal(studentsTakeSubject: any, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');

    if (mode === 'add') {
      button.setAttribute('data-target', '#addStudentsTakeSubjectModal');
    }
    if (mode === 'edit') {
      this.editStudentsTakeSubject = studentsTakeSubject;
      button.setAttribute('data-target', '#updateStudentTakeSubjectModal');
    }
    if (mode === 'delete') {
      this.deleteStudentsTakeSubject = studentsTakeSubject;
      button.setAttribute('data-target', '#deleteStudentTakeSubjectModal');
    }
    container != null ? container.appendChild(button) : null;
    button.click();
    console.log(mode)
  }
}