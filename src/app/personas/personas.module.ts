import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonasListComponent } from './personas-list/personas-list.component';
import { PersonasCreateComponent } from './personas-create/personas-create.component';
import { PersonasRoutingModule } from './personas-routing.module';
import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../shared/shared.module';
import { PersonasService } from '../services/personas.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [PersonasListComponent, PersonasCreateComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PersonasRoutingModule,
    SharedModule,
    MaterialModule,
  ],
  providers: [PersonasService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PersonasModule {}
