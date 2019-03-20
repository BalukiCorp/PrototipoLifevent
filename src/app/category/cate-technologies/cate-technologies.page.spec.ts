import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CateTechnologiesPage } from './cate-technologies.page';

describe('CateTechnologiesPage', () => {
  let component: CateTechnologiesPage;
  let fixture: ComponentFixture<CateTechnologiesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CateTechnologiesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CateTechnologiesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
