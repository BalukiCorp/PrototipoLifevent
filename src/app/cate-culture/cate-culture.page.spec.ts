import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CateCulturePage } from './cate-culture.page';

describe('CateCulturePage', () => {
  let component: CateCulturePage;
  let fixture: ComponentFixture<CateCulturePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CateCulturePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CateCulturePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
