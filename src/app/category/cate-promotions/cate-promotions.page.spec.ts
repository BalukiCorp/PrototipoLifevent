import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CatePromotionsPage } from './cate-promotions.page';

describe('CatePromotionsPage', () => {
  let component: CatePromotionsPage;
  let fixture: ComponentFixture<CatePromotionsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CatePromotionsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatePromotionsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
