import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollegeDepartmentEmployeeComponent } from './college-department-employee.component';

describe('CollegeDepartmentEmployeeComponent', () => {
  let component: CollegeDepartmentEmployeeComponent;
  let fixture: ComponentFixture<CollegeDepartmentEmployeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CollegeDepartmentEmployeeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CollegeDepartmentEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
