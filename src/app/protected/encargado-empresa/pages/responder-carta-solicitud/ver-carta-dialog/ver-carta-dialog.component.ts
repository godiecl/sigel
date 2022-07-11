import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ver-carta-dialog',
  templateUrl: './ver-carta-dialog.component.html',
  styleUrls: ['./ver-carta-dialog.component.css']
})
export class VerCartaDialogComponent implements OnInit {

  respuestaForm: FormGroup = this.fb.group({
    fechaInicio: [, Validators.required],
    fechaFinal: [, Validators.required],
  })

  constructor(
    public dialogRef: MatDialogRef<VerCartaDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public datos: any, private fb: FormBuilder,
    private router: Router,
    ) { }

  ngOnInit(): void {
  }

  verCarta(): void{
    console.log(this.datos.solicitud.id_solicitudCartaVacante)
    const url = `/dashboard/encargado-empresa/responder-carta-vacante/${this.datos.solicitud.id_solicitudCartaVacante}`
    this.router.navigateByUrl(url);
    this.dialogRef.close();
  }

  enviarRespuesta(): void{
    Swal.fire({
      title: 'Confirma usted, como encargado de su empresa, el inicio de la práctica pre-profesional del estudiante del Departamento de Ingeniería en Sistemas y Computación de la Universidad Católica del Norte, que rendirá en su organización.',
      showDenyButton: true,
      width: 800,
      padding: '3em',
      showCancelButton: false,
      confirmButtonText: 'Si',
      denyButtonText: 'No',
      customClass: {
        actions: 'my-actions',
        cancelButton: 'order-1 right-gap',
        confirmButton: 'order-2',
        denyButton: 'order-3',
      }
    }).then((result) => {
      if (result.isConfirmed) {
        this.dialogRef.close(this.respuestaForm.value);
      }
      else{
        this.dialogRef.close();
      }
    })
  }
  
}
