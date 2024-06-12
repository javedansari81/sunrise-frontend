import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterStyle2Component } from './footer-style2.component';

describe('FooterStyle2Component', () => {
  let component: FooterStyle2Component;
  let fixture: ComponentFixture<FooterStyle2Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FooterStyle2Component]
    });
    fixture = TestBed.createComponent(FooterStyle2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
