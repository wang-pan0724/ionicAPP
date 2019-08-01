import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangePhonenextComponent } from './change-phonenext.component';

describe('ChangePhonenextComponent', () => {
  let component: ChangePhonenextComponent;
  let fixture: ComponentFixture<ChangePhonenextComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangePhonenextComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangePhonenextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
