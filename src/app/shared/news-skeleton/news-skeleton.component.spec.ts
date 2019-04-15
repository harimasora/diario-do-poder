import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsSkeletonPage } from './news-skeleton.page';

describe('NewsSkeletonPage', () => {
  let component: NewsSkeletonPage;
  let fixture: ComponentFixture<NewsSkeletonPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewsSkeletonPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsSkeletonPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
