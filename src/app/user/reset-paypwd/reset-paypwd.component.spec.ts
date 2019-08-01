import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetPaypwdComponent } from './reset-paypwd.component';

describe('ResetPaypwdComponent', () => {
  let component: ResetPaypwdComponent;
  let fixture: ComponentFixture<ResetPaypwdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResetPaypwdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResetPaypwdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
