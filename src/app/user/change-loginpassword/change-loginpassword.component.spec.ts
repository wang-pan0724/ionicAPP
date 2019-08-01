import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeLoginpasswordComponent } from './change-loginpassword.component';

describe('ChangeLoginpasswordComponent', () => {
  let component: ChangeLoginpasswordComponent;
  let fixture: ComponentFixture<ChangeLoginpasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeLoginpasswordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeLoginpasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
