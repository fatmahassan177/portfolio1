import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DAbout } from './dabout';

describe('DAbout', () => {
  let component: DAbout;
  let fixture: ComponentFixture<DAbout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DAbout]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DAbout);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
