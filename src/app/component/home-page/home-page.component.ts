import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-page',
  template: `
   <div class="container" id="main-container">
                    <div class="card-title align-self-center ">
                        <h1> Welcome Meslek Yuksek Okul</h1>
        </div>
    </div>
  `,
  styleUrls: ['./home.component.css']
})
export class HomePageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
