import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Expertise } from 'src/app/model/expertise';
import { ExpertiseService } from 'src/app/service/expertise.service';
@Component({
  selector: 'app-expertise',
  templateUrl: './expertise.component.html',
  styleUrls: ['./expertise.component.css']
})
export class ExpertiseComponent implements OnInit {
  public expertises: Expertise[];
  public editExpertise: Expertise;
  public deleteExpertise: Expertise;

  constructor(private expertiseService: ExpertiseService) { }

  ngOnInit() {
    this.getExpertises();
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
    );
  }

  public onAddExpertise(addForm: NgForm): void {
    console.log(addForm.value)
    document.getElementById('add-Expertise-form').click();
    this.expertiseService.addExpertise(addForm.value).subscribe(
      (response: Expertise) => {
        console.log(response);
        this.getExpertises();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }

  public onUpdateExpertise(expertise: Expertise): void {
    console.log(expertise)
    this.expertiseService.updateExpertise(expertise).subscribe(
      (response: Expertise) => {
        console.log(response);
        this.getExpertises();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  public onDeleteExpertise(expertiseId: string): void {
    this.expertiseService.deleteExpertise(expertiseId).subscribe(
      (response: void) => {
        console.log(response);
        this.getExpertises();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public search(key: string): void {
    console.log(key);
    const results: Expertise[] = [];
    for (const expertise of this.expertises) {
      if (
        expertise.id.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
        expertise.expertisePart.toLowerCase().indexOf(key.toLowerCase()) !== -1
      ) {
        results.push(expertise);
      }
    }
    this.expertises = results;
    if (results.length === 0 || !key) {
      this.getExpertises();
    }
  }


  public onOpenModal(expertise: any, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');

    if (mode === 'add') {
      button.setAttribute('data-target', '#addExpertiseModal');
    }
    if (mode === 'edit') {
      this.editExpertise = expertise;
      button.setAttribute('data-target', '#updateExpertiseModal');
    }
    if (mode === 'delete') {
      this.deleteExpertise = expertise;
      button.setAttribute('data-target', '#deleteExpertiseModal');
    }
    container != null ? container.appendChild(button) : null;
    button.click();
    console.log(mode)
  }
}