import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-indra-simple-modal-info',
  templateUrl: './indra-simple-modal-info.component.html',
  styleUrls: ['./indra-simple-modal-info.component.scss'],
})
export class IndraSimpleModalInfoComponent {
  mensaje: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<IndraSimpleModalInfoComponent>
  ) {
    this.mensaje = data.mensaje;
  }

  close() {
    this.dialogRef.close();
  }
}
