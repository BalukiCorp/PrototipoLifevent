import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CateFoodsPage } from './cate-foods.page';

describe('CateFoodsPage', () => {
  let component: CateFoodsPage;
  let fixture: ComponentFixture<CateFoodsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CateFoodsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CateFoodsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
