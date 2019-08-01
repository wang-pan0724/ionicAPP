import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeQQComponent } from './change-qq.component';

describe('ChangeQQComponent', () => {
  let component: ChangeQQComponent;
  let fixture: ComponentFixture<ChangeQQComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeQQComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeQQComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
