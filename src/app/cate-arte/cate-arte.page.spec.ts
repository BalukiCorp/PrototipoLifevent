import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CateArtePage } from './cate-arte.page';

describe('CateArtePage', () => {
  let component: CateArtePage;
  let fixture: ComponentFixture<CateArtePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CateArtePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CateArtePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
