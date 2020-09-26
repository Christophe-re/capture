import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCaptureComponent } from './list-capture.component';

describe('ListCaptureComponent', () => {
  let component: ListCaptureComponent;
  let fixture: ComponentFixture<ListCaptureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListCaptureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListCaptureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
