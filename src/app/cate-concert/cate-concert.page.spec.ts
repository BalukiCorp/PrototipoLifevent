import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CateConcertPage } from './cate-concert.page';

describe('CateConcertPage', () => {
  let component: CateConcertPage;
  let fixture: ComponentFixture<CateConcertPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CateConcertPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CateConcertPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
