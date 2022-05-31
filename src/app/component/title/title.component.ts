import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Title } from 'src/app/model/title';
import { TitleService } from 'src/app/service/title.service';
@Component({
  selector: 'app-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.css']
})
export class TitleComponent implements OnInit {
  public titles: Title[];
  public editTitle: Title;
  public deleteTitle: Title;

  constructor(private titleService: TitleService) { }

  ngOnInit() {
    this.getTitles();
  }

  public getTitles(): void {
    this.titleService.getTitles().subscribe(
      (response: Title[]) => {
        this.titles = response;
        this.titles.sort(function (a: any, b: any) {
          return a.id - b.id;
        });
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onAddTitle(addForm: NgForm): void {
    console.log(addForm.value)
    document.getElementById('add-title-form').click();
    this.titleService.addTitle(addForm.value).subscribe(
      (response: Title) => {
        console.log(response);
        this.getTitles();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }

  public onUpdateTitle(Title: Title): void {
    console.log(Title)
    this.titleService.updateTitle(Title).subscribe(
      (response: Title) => {
        console.log(response);
        this.getTitles();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  public onDeleteTitle(TitleId: string): void {
    this.titleService.deleteTitle(TitleId).subscribe(
      (response: void) => {
        console.log(response);
        this.getTitles();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public search(key: string): void {
    console.log(key);
    const results: Title[] = [];
    for (const title of this.titles) {
      if (
        title.id.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
        title.title.toLowerCase().indexOf(key.toLowerCase()) !== -1
      ) {
        results.push(title);
      }
    }
    this.titles = results;
    // if (results.length === 0 || !key) {
    if (!key) {
      this.getTitles();
    }
  }


  public onOpenModal(title: any, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');

    if (mode === 'add') {
      button.setAttribute('data-target', '#addTitleModal');
    }
    if (mode === 'edit') {
      this.editTitle = title;
      button.setAttribute('data-target', '#updateTitleModal');
    }
    if (mode === 'delete') {
      this.deleteTitle = title;
      button.setAttribute('data-target', '#deleteTitleModal');
    }
    container != null ? container.appendChild(button) : null;
    button.click();
    console.log(mode)
  }
}