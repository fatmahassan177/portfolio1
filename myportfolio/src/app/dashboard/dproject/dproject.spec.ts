import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Dproject } from './dproject';

describe('Dproject', () => {
  let component: Dproject;
  let fixture: ComponentFixture<Dproject>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Dproject]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Dproject);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
