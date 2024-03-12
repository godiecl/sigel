import { Component, Inject, OnInit } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Publicacion } from '../../../../../../auth/interfaces/documentos/publicacion.interface';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { VerPublicacionCTComponent } from '../ver-publicacion.component';

@Component({
  selector: 'app-editar-publicacion',
  templateUrl: './editar-publicacion.component.html',
  styleUrls: ['./editar-publicacion.component.css']
})
export class EditarPublicacionComponent {

  publicacionForm: FormGroup = this.fb.group({
    asunto: [this.data.asunto, [Validators.required]],
    mensaje: [this.data.mensaje, [Validators.required]],
  })

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<VerPublicacionCTComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Publicacion,) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  editar(): void {
    this.dialogRef.close(this.publicacionForm.value)
  }

}


