import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DSkills } from './dskills';

describe('DSkills', () => {
  let component: DSkills;
  let fixture: ComponentFixture<DSkills>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DSkills]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DSkills);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
