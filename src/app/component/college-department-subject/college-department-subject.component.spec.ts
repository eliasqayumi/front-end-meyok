import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollegeDepartmentSubjectComponent } from './college-department-subject.component';

describe('CollegeDepartmentSubjectComponent', () => {
  let component: CollegeDepartmentSubjectComponent;
  let fixture: ComponentFixture<CollegeDepartmentSubjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CollegeDepartmentSubjectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CollegeDepartmentSubjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
