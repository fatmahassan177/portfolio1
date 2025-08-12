import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DContact } from './dcontact';

describe('DContact', () => {
  let component: DContact;
  let fixture: ComponentFixture<DContact>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DContact]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DContact);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
