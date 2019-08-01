import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HowToTradeComponent } from './how-to-trade.component';

describe('HowToTradeComponent', () => {
  let component: HowToTradeComponent;
  let fixture: ComponentFixture<HowToTradeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HowToTradeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HowToTradeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
