import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AskedQuestionsComponent } from './asked-questions.component';

describe('AskedQuestionsComponent', () => {
  let component: AskedQuestionsComponent;
  let fixture: ComponentFixture<AskedQuestionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AskedQuestionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AskedQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
