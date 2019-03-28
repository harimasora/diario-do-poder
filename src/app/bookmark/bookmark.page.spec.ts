import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookmarkPage } from './bookmark.page';

describe('BookmarkPage', () => {
  let component: BookmarkPage;
  let fixture: ComponentFixture<BookmarkPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookmarkPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookmarkPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
