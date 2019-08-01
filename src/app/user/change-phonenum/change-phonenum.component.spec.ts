import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangePhonenumComponent } from './change-phonenum.component';

describe('ChangePhonenumComponent', () => {
  let component: ChangePhonenumComponent;
  let fixture: ComponentFixture<ChangePhonenumComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangePhonenumComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangePhonenumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
