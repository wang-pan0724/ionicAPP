import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchTitleComponent } from './match-title.component';

describe('MatchTitleComponent', () => {
  let component: MatchTitleComponent;
  let fixture: ComponentFixture<MatchTitleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatchTitleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
