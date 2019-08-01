import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WalletLogComponent } from './wallet-log.component';

describe('WalletLogComponent', () => {
  let component: WalletLogComponent;
  let fixture: ComponentFixture<WalletLogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WalletLogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WalletLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
