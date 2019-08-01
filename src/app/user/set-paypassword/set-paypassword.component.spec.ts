import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetPaypasswordComponent } from './set-paypassword.component';

describe('SetPaypasswordComponent', () => {
  let component: SetPaypasswordComponent;
  let fixture: ComponentFixture<SetPaypasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetPaypasswordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetPaypasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
