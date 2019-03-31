import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShareButtonPage } from './share-button.page';

describe('ShareButtonPage', () => {
  let component: ShareButtonPage;
  let fixture: ComponentFixture<ShareButtonPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShareButtonPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShareButtonPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
