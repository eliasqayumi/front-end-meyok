import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Term } from 'src/app/model/term';
import { TermService } from 'src/app/service/term.service';
@Component({
  selector: 'app-term',
  templateUrl: './term.component.html',
  styleUrls: ['./term.component.css']
})
export class TermComponent implements OnInit {

  public terms: Term[];
  public editTerm: Term;
  public deleteTerm: Term;

  constructor(private termService: TermService) { }

  ngOnInit() {
    this.getTerms();
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
        alert(error.message);
      }
    );
  }

  public onAddTerm(addForm: NgForm): void {
    console.log(addForm.value)
    document.getElementById('add-Term-form').click();
    this.termService.addTerm(addForm.value).subscribe(
      (response: Term) => {
        console.log(response);
        this.getTerms();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }

  public onUpdateTerm(Term: Term): void {
    console.log(Term)
    this.termService.updateTerm(Term).subscribe(
      (response: Term) => {
        console.log(response);
        this.getTerms();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  public onDeleteTerm(TermId: string): void {
    this.termService.deleteTerm(TermId).subscribe(
      (response: void) => {
        console.log(response);
        this.getTerms();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public search(key: string): void {
    console.log(key);
    const results: Term[] = [];
    for (const Term of this.terms) {
      if (
        Term.id.toLowerCase().indexOf(key.toLowerCase()) !== -1||
        Term.term.toLowerCase().indexOf(key.toLowerCase()) !== -1
        ) {
        results.push(Term);
      }
    }
    this.terms = results;
    // if (results.length === 0 || !key) {
    if (!key) {
      this.getTerms();
    }
  }


  public onOpenModal(Term: any, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');

    if (mode === 'add') {
      button.setAttribute('data-target', '#addTermModal');
    }
    if (mode === 'edit') {
      this.editTerm = Term;
      button.setAttribute('data-target', '#updateTermModal');
    }
    if (mode === 'delete') {
      this.deleteTerm = Term;
      button.setAttribute('data-target', '#deleteTermModal');
    }
    container != null ? container.appendChild(button) : null;
    button.click();
    console.log(mode)
  }
}