import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subject } from 'src/app/model/subject';
import { CollegeDepartmentEmployee } from 'src/app/model/college-department-employee';
import { CollegeDepartmentEmployeesTeachSubject } from 'src/app/model/college-department-employees-teach-subject';
import { CollegeDepartmentEmployeeService } from 'src/app/service/college-department-employee.service';
import { CollegeDepartmentEmployeesTeachSubjectService } from 'src/app/service/college-department-employees-teach-subject.service';
import { SubjectService } from 'src/app/service/Subject.service';
import { TermService } from 'src/app/service/term.service';
import { Term } from 'src/app/model/term';
import { CollegeDepartmentEmployeesTeachSubjectId } from 'src/app/model/college-department-employees-teach-subject-id';
@Component({
  selector: 'app-college-department-employees-teach-subject',
  templateUrl: './college-department-employees-teach-subject.component.html',
  styleUrls: ['./college-department-employees-teach-subject.component.css']
})
export class CollegeDepartmentEmployeesTeachSubjectComponent implements OnInit {

  public collegeDepartmentEmployeesTeachSubjects: CollegeDepartmentEmployeesTeachSubject[];
  public editCollegeDepartmentEmployeesTeachSubject: CollegeDepartmentEmployeesTeachSubject;
  public deleteCollegeDepartmentEmployeesTeachSubject: CollegeDepartmentEmployeesTeachSubject;

  public collegeDepartmentEmployees: CollegeDepartmentEmployee[];
  public subjects: Subject[];
  public terms: Term[];
  public selectedTerm: Term = null;
  public selectedSubject: Subject = null;
  public selectedCollegeDepartmentEmployee = null;
  public id: CollegeDepartmentEmployeesTeachSubjectId = null;


  constructor(
    private collegeDepartmentEmployeesTeachSubjectService: CollegeDepartmentEmployeesTeachSubjectService,
    private collegeDepartmentEmployeeService: CollegeDepartmentEmployeeService,
    private subjectService: SubjectService,
    private termService: TermService
  ) { }

  ngOnInit() {
    this.getCollegeDepartmentEmployeesTeachSubjects();
    this.getCollegeDepartmentEmployees();
    this.getSubjects();
    this.getTerms();
  }

  public getSubjects(): void {
    this.subjectService.getSubjects().subscribe(
      (response: Subject[]) => {
        this.subjects = response;
        this.subjects.sort(function (a: any, b: any) {
          return a.id - b.id;
        });
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
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
  public getTerms(): void {
    this.termService.getTerms().subscribe(
      (response: Term[]) => {
        this.terms = response;
        this.terms.sort(function (a: any, b: any) {
          return a.id - b.id;
        });
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public getCollegeDepartmentEmployeesTeachSubjects(): void {
    this.collegeDepartmentEmployeesTeachSubjectService.getCollegeDepartmentEmployeesTeachSubject().subscribe(
      (response: CollegeDepartmentEmployeesTeachSubject[]) => {
        this.collegeDepartmentEmployeesTeachSubjects = response;
        this.collegeDepartmentEmployeesTeachSubjects.sort(function (a: any, b: any) {
          return a.id - b.id;
        });
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onAddCollegeDepartmentEmployeesTeachSubject(addForm: NgForm): void {
    console.log(addForm.value)
    document.getElementById('add-CollegeDepartmentEmployeesTeachSubject-form').click();
    this.collegeDepartmentEmployeesTeachSubjectService.addCollegeDepartmentEmployeesTeachSubject(addForm.value).subscribe(
      (response: CollegeDepartmentEmployeesTeachSubject) => {
        this.getCollegeDepartmentEmployeesTeachSubjects();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }

  public onUpdateCollegeDepartmentEmployeesTeachSubject(collegeDepartmentEmployeesTeachSubject: CollegeDepartmentEmployeesTeachSubject): void {
    console.log(collegeDepartmentEmployeesTeachSubject)
    this.collegeDepartmentEmployeesTeachSubjectService.updateCollegeDepartmentEmployeesTeachSubject(collegeDepartmentEmployeesTeachSubject).subscribe(
      (response: CollegeDepartmentEmployeesTeachSubject) => {
        this.getCollegeDepartmentEmployeesTeachSubjects();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  public onDeleteCollegeDepartmentEmployeesTeachSubject(collegeDepartmentEmployeesTeachSubjectId: string): void {
    this.collegeDepartmentEmployeesTeachSubjectService.deleteCollegeDepartmentEmployeesTeachSubject(collegeDepartmentEmployeesTeachSubjectId).subscribe(
      (response: void) => {
        this.getCollegeDepartmentEmployeesTeachSubjects();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public search(key: string): void {
    const results: CollegeDepartmentEmployeesTeachSubject[] = [];
    for (const collegeDepartmentEmployeesTeachSubject of this.collegeDepartmentEmployeesTeachSubjects) {
      if (
        collegeDepartmentEmployeesTeachSubject.id.subjectId.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
        collegeDepartmentEmployeesTeachSubject.id.cdeId.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
        collegeDepartmentEmployeesTeachSubject.id.termId.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
        collegeDepartmentEmployeesTeachSubject.id.entranceDate.toString().indexOf(key.toLowerCase()) !== -1 ||
        collegeDepartmentEmployeesTeachSubject.id.finishDate.toString().indexOf(key.toLowerCase()) !== -1 ||
        collegeDepartmentEmployeesTeachSubject.subject.id.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
        collegeDepartmentEmployeesTeachSubject.subject.subjectName.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
        collegeDepartmentEmployeesTeachSubject.subject.subjectCredit.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
        collegeDepartmentEmployeesTeachSubject.subject.subjectAkts.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
        collegeDepartmentEmployeesTeachSubject.subject.subjectName.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
        collegeDepartmentEmployeesTeachSubject.cde.id.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
        collegeDepartmentEmployeesTeachSubject.cde.employeeNo.tcNo.name.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
        collegeDepartmentEmployeesTeachSubject.cde.employeeNo.tcNo.surname.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
        collegeDepartmentEmployeesTeachSubject.cde.employeeNo.tcNo.id.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
        collegeDepartmentEmployeesTeachSubject.cde.employeeNo.college.collegeName.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
        collegeDepartmentEmployeesTeachSubject.cde.employeeNo.college.district.districtName.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
        collegeDepartmentEmployeesTeachSubject.cde.employeeNo.college.district.city.cityName.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
        collegeDepartmentEmployeesTeachSubject.cde.expertise.expertisePart.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
        collegeDepartmentEmployeesTeachSubject.term.term.toLowerCase().indexOf(key.toLowerCase()) !== -1
      ) {
        results.push(collegeDepartmentEmployeesTeachSubject);
      }
    }
    this.collegeDepartmentEmployeesTeachSubjects = results;
    // if (results.length === 0 || !key) {
    if (!key) {
      this.getCollegeDepartmentEmployeesTeachSubjects();
    }
  }


  public onOpenModal(collegeDepartmentEmployeesTeachSubject: any, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');

    if (mode === 'add') {
      button.setAttribute('data-target', '#addCollegeDepartmentEmployeesTeachSubjectModal');
    }
    if (mode === 'edit') {
      this.editCollegeDepartmentEmployeesTeachSubject = collegeDepartmentEmployeesTeachSubject;
      this.selectedCollegeDepartmentEmployee = this.editCollegeDepartmentEmployeesTeachSubject.cde
      this.selectedTerm = this.editCollegeDepartmentEmployeesTeachSubject.term;
      this.selectedSubject = this.editCollegeDepartmentEmployeesTeachSubject.subject;
      button.setAttribute('data-target', '#updateCollegeDepartmentEmployeesTeachSubjectModal');
    }
    if (mode === 'delete') {
      this.deleteCollegeDepartmentEmployeesTeachSubject = collegeDepartmentEmployeesTeachSubject;
      button.setAttribute('data-target', '#deleteCollegeDepartmentEmployeesTeachSubjectModal');
    }
    container != null ? container.appendChild(button) : null;
    button.click();
  }
}