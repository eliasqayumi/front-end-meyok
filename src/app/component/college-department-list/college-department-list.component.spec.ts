import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollegeDepartmentListComponent } from './college-department-list.component';

describe('CollegeDepartmentListComponent', () => {
  let component: CollegeDepartmentListComponent;
  let fixture: ComponentFixture<CollegeDepartmentListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CollegeDepartmentListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CollegeDepartmentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
