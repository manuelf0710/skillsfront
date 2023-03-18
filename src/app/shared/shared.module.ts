import {
  NgModule,
  CUSTOM_ELEMENTS_SCHEMA,
  ModuleWithProviders,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndraAutocompleteComponent } from './components/indra-autocomplete/indra-autocomplete.component';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IndraInputWordComponent } from './components/indra-input-word/indra-input-word.component';
import { IndraSimpleModalInfoComponent } from './components/indra-simple-modal-info/indra-simple-modal-info.component';
import { PersonaskillComponent } from './components/personaskill/personaskill.component';

@NgModule({
  declarations: [IndraAutocompleteComponent, IndraInputWordComponent, IndraSimpleModalInfoComponent, PersonaskillComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MaterialModule],
  exports: [IndraAutocompleteComponent, IndraInputWordComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SharedModule {
  static forRoot(): ModuleWithProviders<any> {
    return {
      ngModule: SharedModule,
    };
  }
}
