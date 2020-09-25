import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailCaptureModalComponent } from './detail-capture-modal.component';

describe('DetailCaptureModalComponent', () => {
  let component: DetailCaptureModalComponent;
  let fixture: ComponentFixture<DetailCaptureModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailCaptureModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailCaptureModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
