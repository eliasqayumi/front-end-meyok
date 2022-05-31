import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollegeDepartmentEmployeesTeachSubjectComponent } from './college-department-employees-teach-subject.component';

describe('CollegeDepartmentEmployeesTeachSubjectComponent', () => {
  let component: CollegeDepartmentEmployeesTeachSubjectComponent;
  let fixture: ComponentFixture<CollegeDepartmentEmployeesTeachSubjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CollegeDepartmentEmployeesTeachSubjectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CollegeDepartmentEmployeesTeachSubjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
