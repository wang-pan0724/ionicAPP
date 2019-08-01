import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangePaypwdComponent } from './change-paypwd.component';

describe('ChangePaypwdComponent', () => {
  let component: ChangePaypwdComponent;
  let fixture: ComponentFixture<ChangePaypwdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangePaypwdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangePaypwdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
