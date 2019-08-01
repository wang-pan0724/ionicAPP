import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HowtoplayBassketballComponent } from './howtoplay-bassketball.component';

describe('HowtoplayBassketballComponent', () => {
  let component: HowtoplayBassketballComponent;
  let fixture: ComponentFixture<HowtoplayBassketballComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HowtoplayBassketballComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HowtoplayBassketballComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
