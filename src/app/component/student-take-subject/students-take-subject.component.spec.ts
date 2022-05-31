import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentsTakeSubjectComponent } from './students-take-subject.component';

describe('StudentTakeSubjectComponent', () => {
  let component: StudentsTakeSubjectComponent;
  let fixture: ComponentFixture<StudentsTakeSubjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentsTakeSubjectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentsTakeSubjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
