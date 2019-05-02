import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemePickerPage } from './theme-picker.page';

describe('ThemePickerPage', () => {
  let component: ThemePickerPage;
  let fixture: ComponentFixture<ThemePickerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThemePickerPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThemePickerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
