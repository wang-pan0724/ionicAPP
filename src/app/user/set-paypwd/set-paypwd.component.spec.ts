import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetPaypwdComponent } from './set-paypwd.component';

describe('SetPaypwdComponent', () => {
  let component: SetPaypwdComponent;
  let fixture: ComponentFixture<SetPaypwdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetPaypwdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetPaypwdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
