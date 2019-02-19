import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CatePartyPage } from './cate-party.page';

describe('CatePartyPage', () => {
  let component: CatePartyPage;
  let fixture: ComponentFixture<CatePartyPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CatePartyPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatePartyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
