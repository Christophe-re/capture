import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CapacitorComponent } from './capacitor.component';

describe('CapacitorComponent', () => {
  let component: CapacitorComponent;
  let fixture: ComponentFixture<CapacitorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CapacitorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CapacitorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
