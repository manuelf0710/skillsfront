import {
  NgModule,
  CUSTOM_ELEMENTS_SCHEMA,
  ModuleWithProviders,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndraAutocompleteComponent } from './components/indra-autocomplete/indra-autocomplete.component';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [IndraAutocompleteComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MaterialModule],
  exports: [IndraAutocompleteComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SharedModule {
  static forRoot(): ModuleWithProviders<any> {
    return {
      ngModule: SharedModule,
    };
  }
}
