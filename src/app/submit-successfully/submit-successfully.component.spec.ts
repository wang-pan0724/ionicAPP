import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitSuccessfullyComponent } from './submit-successfully.component';

describe('SubmitSuccessfullyComponent', () => {
  let component: SubmitSuccessfullyComponent;
  let fixture: ComponentFixture<SubmitSuccessfullyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubmitSuccessfullyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmitSuccessfullyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
