import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndraAutocompleteComponent } from './indra-autocomplete.component';

describe('IndraAutocompleteComponent', () => {
  let component: IndraAutocompleteComponent;
  let fixture: ComponentFixture<IndraAutocompleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndraAutocompleteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IndraAutocompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
