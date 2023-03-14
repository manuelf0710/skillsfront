import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PersonasCreateComponent } from './personas-create/personas-create.component';
import { PersonasListComponent } from './personas-list/personas-list.component';

const routes: Routes = [
  {
    path: 'list',
    component: PersonasListComponent,
  },
  {
    path: 'create',
    component: PersonasCreateComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PersonasRoutingModule {}
