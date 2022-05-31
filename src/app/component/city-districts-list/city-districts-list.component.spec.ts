import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CityDistrictsListComponent } from './city-districts-list.component';

describe('CityDistrictsListComponent', () => {
  let component: CityDistrictsListComponent;
  let fixture: ComponentFixture<CityDistrictsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CityDistrictsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CityDistrictsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
