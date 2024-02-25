import { Component, Inject, OnInit } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SolicitudEstudiante } from '../../../../../../auth/interfaces/documentos/solicitudEstudiante.interface';

export interface DialogData {
    animal: string;
    name: string;
  }

@Component({
    selector: 'evaluar-dialog',
    templateUrl: 'evaluar-dialog.component.html',
    styles: [
        ` .titulo {
            display: block;
            font-family: Poppins-Bold;
            font-size: 20px;
            color: #333333;
            line-height: 1.2;
            text-align: center;
          },
          .mat-dialog-content {
          display: flex;
          flex-direction: column;
          /* position: relative; */
          /* text-align: left; */
          }
          `
    ] 
  })
  export class EvaluarDialog implements OnInit {

    evaluarForm!  : FormGroup; 

    constructor(
      public dialogRef: MatDialogRef<EvaluarDialog>,
      @Inject(MAT_DIALOG_DATA) public data: SolicitudEstudiante,
      private fb: FormBuilder
    ) {}
  
    ngOnInit(): void {
      this.evaluarForm  = this.fb.group({
        descripcionRequerimientoPractica: ['',[Validators.required] ],
        estado: [],
     });
    }

    aprobar(): any{
      this.evaluarForm.value.estado = true;
    
      this.dialogRef.close(this.evaluarForm.value );
    }

    reprobar(): any{
      this.evaluarForm.value.estado = false;
      this.evaluarForm.value.descripcionRequerimientoPractica = null;
      this.dialogRef.close(this.evaluarForm.value );
    }

    pendiente(): any{
      this.evaluarForm.value.estado = null;
      this.evaluarForm.value.descripcionRequerimientoPractica = null;
      this.dialogRef.close(this.evaluarForm.value );
    }

    onNoClick(): void {
      
      this.dialogRef.close();
    }
  }