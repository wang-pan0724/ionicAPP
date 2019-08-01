import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HowToAwardPrizesComponent } from './how-to-award-prizes.component';

describe('HowToAwardPrizesComponent', () => {
  let component: HowToAwardPrizesComponent;
  let fixture: ComponentFixture<HowToAwardPrizesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HowToAwardPrizesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HowToAwardPrizesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
