import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CateEducationPage } from './cate-education.page';

describe('CateEducationPage', () => {
  let component: CateEducationPage;
  let fixture: ComponentFixture<CateEducationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CateEducationPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CateEducationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
