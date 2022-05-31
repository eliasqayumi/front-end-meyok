import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,ParamMap } from '@angular/router';

@Component({
  selector: 'app-college-department-list',
  templateUrl: './college-department-list.component.html',
  styleUrls: ['./college-department-list.component.css']
})
export class CollegeDepartmentListComponent implements OnInit {
  public collegeId: string;
  constructor(private acitvateRouter: ActivatedRoute) { }

  ngOnInit(): void {
    // this.collegeId = this.acitvateRouter.snapshot.paramMap.get('id')
    this.acitvateRouter.paramMap.subscribe(
      (params: ParamMap)=>{
        this.collegeId=params.get('id');
      }
    );
  }

}
