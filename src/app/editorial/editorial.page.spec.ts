import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorialPage } from './editorial.page';

describe('EditorialPage', () => {
  let component: EditorialPage;
  let fixture: ComponentFixture<EditorialPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditorialPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditorialPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
