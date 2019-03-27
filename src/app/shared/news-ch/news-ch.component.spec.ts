import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsChPage } from './news-ch.page';

describe('NewsChPage', () => {
  let component: NewsChPage;
  let fixture: ComponentFixture<NewsChPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewsChPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsChPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
