import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonasCreateComponent } from './personas-create.component';

describe('PersonasCreateComponent', () => {
  let component: PersonasCreateComponent;
  let fixture: ComponentFixture<PersonasCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonasCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonasCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
