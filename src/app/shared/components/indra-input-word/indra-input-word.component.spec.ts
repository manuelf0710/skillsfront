import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndraInputWordComponent } from './indra-input-word.component';

describe('IndraInputWordComponent', () => {
  let component: IndraInputWordComponent;
  let fixture: ComponentFixture<IndraInputWordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndraInputWordComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IndraInputWordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
