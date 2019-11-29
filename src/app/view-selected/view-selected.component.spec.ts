import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSelectedComponent } from './view-selected.component';

describe('ViewSelectedComponent', () => {
  let component: ViewSelectedComponent;
  let fixture: ComponentFixture<ViewSelectedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewSelectedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewSelectedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
