import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollegeDepartmentComponent } from './college-department.component';

describe('CollegeDepartmentComponent', () => {
  let component: CollegeDepartmentComponent;
  let fixture: ComponentFixture<CollegeDepartmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CollegeDepartmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CollegeDepartmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
