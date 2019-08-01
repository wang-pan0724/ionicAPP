import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotpwdCheckcodeComponent } from './forgotpwd-checkcode.component';

describe('ForgotpwdCheckcodeComponent', () => {
  let component: ForgotpwdCheckcodeComponent;
  let fixture: ComponentFixture<ForgotpwdCheckcodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForgotpwdCheckcodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgotpwdCheckcodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
