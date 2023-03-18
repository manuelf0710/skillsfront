import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndraSimpleModalInfoComponent } from './indra-simple-modal-info.component';

describe('IndraSimpleModalInfoComponent', () => {
  let component: IndraSimpleModalInfoComponent;
  let fixture: ComponentFixture<IndraSimpleModalInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndraSimpleModalInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IndraSimpleModalInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
