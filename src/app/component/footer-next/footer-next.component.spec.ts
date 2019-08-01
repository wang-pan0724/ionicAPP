import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterNextComponent } from './footer-next.component';

describe('FooterNextComponent', () => {
  let component: FooterNextComponent;
  let fixture: ComponentFixture<FooterNextComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FooterNextComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterNextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
