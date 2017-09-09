import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { XlsxComponent } from './xlsx.component';

describe('XlsxComponent', () => {
  let component: XlsxComponent;
  let fixture: ComponentFixture<XlsxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ XlsxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(XlsxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
