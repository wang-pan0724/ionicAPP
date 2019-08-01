import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeNickComponent } from './change-nick.component';

describe('ChangeNickComponent', () => {
  let component: ChangeNickComponent;
  let fixture: ComponentFixture<ChangeNickComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeNickComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeNickComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
