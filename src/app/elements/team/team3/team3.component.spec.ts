import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Team3Component } from './team3.component';

describe('Team3Component', () => {
  let component: Team3Component;
  let fixture: ComponentFixture<Team3Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Team3Component]
    });
    fixture = TestBed.createComponent(Team3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
