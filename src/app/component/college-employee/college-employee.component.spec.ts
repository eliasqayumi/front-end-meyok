import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollegeEmployeeComponent } from './college-employee.component';

describe('CollegeEmployeeComponent', () => {
  let component: CollegeEmployeeComponent;
  let fixture: ComponentFixture<CollegeEmployeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CollegeEmployeeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CollegeEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
