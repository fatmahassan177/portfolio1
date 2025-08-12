import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DIntro } from './dintro';

describe('DIntro', () => {
  let component: DIntro;
  let fixture: ComponentFixture<DIntro>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DIntro]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DIntro);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
