import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonTitleComponent } from './common-title.component';

describe('CommonTitleComponent', () => {
  let component: CommonTitleComponent;
  let fixture: ComponentFixture<CommonTitleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommonTitleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommonTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
