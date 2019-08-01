import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchEndtimeComponent } from './match-endtime.component';

describe('MatchEndtimeComponent', () => {
  let component: MatchEndtimeComponent;
  let fixture: ComponentFixture<MatchEndtimeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatchEndtimeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchEndtimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
