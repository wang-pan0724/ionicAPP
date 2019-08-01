import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FirmOrderComponent } from './firm-order.component';

describe('FirmOrderComponent', () => {
  let component: FirmOrderComponent;
  let fixture: ComponentFixture<FirmOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FirmOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FirmOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
