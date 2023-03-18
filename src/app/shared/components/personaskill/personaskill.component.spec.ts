import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonaskillComponent } from './personaskill.component';

describe('PersonaskillComponent', () => {
  let component: PersonaskillComponent;
  let fixture: ComponentFixture<PersonaskillComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonaskillComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonaskillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
