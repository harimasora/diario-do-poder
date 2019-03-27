import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsHumorPage } from './news-humor.page';

describe('NewsHumorPage', () => {
  let component: NewsHumorPage;
  let fixture: ComponentFixture<NewsHumorPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewsHumorPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsHumorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
