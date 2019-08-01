import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeadeAgreementsComponent } from './teade-agreements.component';

describe('TeadeAgreementsComponent', () => {
  let component: TeadeAgreementsComponent;
  let fixture: ComponentFixture<TeadeAgreementsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeadeAgreementsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeadeAgreementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
