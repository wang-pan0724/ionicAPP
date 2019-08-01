import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeWeixinComponent } from './change-weixin.component';

describe('ChangeWeixinComponent', () => {
  let component: ChangeWeixinComponent;
  let fixture: ComponentFixture<ChangeWeixinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeWeixinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeWeixinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
