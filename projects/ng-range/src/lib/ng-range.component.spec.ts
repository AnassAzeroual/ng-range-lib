import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgRangeComponent } from './ng-range.component';

describe('NgRangeComponent', () => {
  let component: NgRangeComponent;
  let fixture: ComponentFixture<NgRangeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NgRangeComponent]
    });
    fixture = TestBed.createComponent(NgRangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
