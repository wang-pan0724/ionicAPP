import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangezhifubaoComponent } from './changezhifubao.component';

describe('ChangezhifubaoComponent', () => {
  let component: ChangezhifubaoComponent;
  let fixture: ComponentFixture<ChangezhifubaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangezhifubaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangezhifubaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
