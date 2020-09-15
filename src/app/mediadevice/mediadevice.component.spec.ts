import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MediadeviceComponent } from './mediadevice.component';

describe('MediadeviceComponent', () => {
  let component: MediadeviceComponent;
  let fixture: ComponentFixture<MediadeviceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MediadeviceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MediadeviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
