import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HowtoplayFootballComponent } from './howtoplay-football.component';

describe('HowtoplayFootballComponent', () => {
  let component: HowtoplayFootballComponent;
  let fixture: ComponentFixture<HowtoplayFootballComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HowtoplayFootballComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HowtoplayFootballComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
