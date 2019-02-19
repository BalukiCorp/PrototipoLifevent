import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CateBusinessPage } from './cate-business.page';

describe('CateBusinessPage', () => {
  let component: CateBusinessPage;
  let fixture: ComponentFixture<CateBusinessPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CateBusinessPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CateBusinessPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
