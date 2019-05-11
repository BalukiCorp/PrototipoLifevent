import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CateBusinesPage } from './cate-busines.page';

describe('CateBusinesPage', () => {
  let component: CateBusinesPage;
  let fixture: ComponentFixture<CateBusinesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CateBusinesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CateBusinesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
