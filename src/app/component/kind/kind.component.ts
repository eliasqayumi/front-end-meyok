import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Kind } from 'src/app/model/Kind';
import { KindService } from 'src/app/service/Kind.service';
@Component({
  selector: 'app-kind',
  templateUrl: './kind.component.html',
  styleUrls: ['./kind.component.css']
})
export class KindComponent implements OnInit {

  public kinds: Kind[];
  public editKind: Kind;
  public deleteKind: Kind;

  constructor(private kindService: KindService) { }

  ngOnInit() {
    this.getKinds();
  }

  public getKinds(): void {
    this.kindService.getKinds().subscribe(
      (response: Kind[]) => {
        this.kinds = response;
        this.kinds.sort(function(a:any,b:any){
          return a.id - b.id;
        });
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onAddKind(addForm: NgForm): void {
    console.log(addForm.value)
    document.getElementById('add-Kind-form').click();
    this.kindService.addKind(addForm.value).subscribe(
      (response: Kind) => {
        console.log(response);
        this.getKinds();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }

  public onUpdateKind(kind: Kind): void {
    console.log(kind)
    this.kindService.updateKind(kind).subscribe(
      (response: Kind) => {
        console.log(response);
        this.getKinds();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  public onDeleteKind(kindId: string): void {
    this.kindService.deleteKind(kindId).subscribe(
      (response: void) => {
        console.log(response);
        this.getKinds();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public search(key: string): void {
    console.log(key);
    const results: Kind[] = [];
    for (const kind of this.kinds) {
      if (
        kind.id.toLowerCase().indexOf(key.toLowerCase()) !== -1||
        kind.kind.toLowerCase().indexOf(key.toLowerCase()) !== -1
        ) {
        results.push(kind);
      }
    }
    this.kinds = results;
    // if (results.length === 0 || !key) {
    if (!key) {
      this.getKinds();
    }
  }


  public onOpenModal(kind: any, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');

    if (mode === 'add') {
      button.setAttribute('data-target', '#addKindModal');
    }
    if (mode === 'edit') {
      this.editKind = kind;
      button.setAttribute('data-target', '#updateKindModal');
    }
    if (mode === 'delete') {
      this.deleteKind = kind;
      button.setAttribute('data-target', '#deleteKindModal');
    }
    container != null ? container.appendChild(button) : null;
    button.click();
    console.log(mode)
  }
}