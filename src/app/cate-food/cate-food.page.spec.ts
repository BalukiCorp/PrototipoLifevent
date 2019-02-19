import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CateFoodPage } from './cate-food.page';

describe('CateFoodPage', () => {
  let component: CateFoodPage;
  let fixture: ComponentFixture<CateFoodPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CateFoodPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CateFoodPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
