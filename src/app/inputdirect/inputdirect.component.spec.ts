import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputdirectComponent } from './inputdirect.component';

describe('InputdirectComponent', () => {
  let component: InputdirectComponent;
  let fixture: ComponentFixture<InputdirectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputdirectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputdirectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
