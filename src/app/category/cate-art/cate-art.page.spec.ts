import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CateArtPage } from './cate-art.page';

describe('CateArtPage', () => {
  let component: CateArtPage;
  let fixture: ComponentFixture<CateArtPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CateArtPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CateArtPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
