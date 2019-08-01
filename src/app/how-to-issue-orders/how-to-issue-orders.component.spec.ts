import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HowToIssueOrdersComponent } from './how-to-issue-orders.component';

describe('HowToIssueOrdersComponent', () => {
  let component: HowToIssueOrdersComponent;
  let fixture: ComponentFixture<HowToIssueOrdersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HowToIssueOrdersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HowToIssueOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
