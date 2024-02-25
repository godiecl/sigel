import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-extender-seguro',
  templateUrl: './modal-extender-seguro.component.html',
  styleUrls: ['./modal-extender-seguro.component.css']
})
export class ModalExtenderSeguroComponent implements OnInit {

  extenderForm!: FormGroup;
  now= new Date();

  constructor(
    public dialogRef: MatDialogRef<ModalExtenderSeguroComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) { }
  ngOnInit(): void {
    this.extenderForm = this.fb.group({
      fechaFinal: [,[Validators.required]]
    })
  }

  save(): void {
    Swal.fire({
      title: '¿Está seguro de cambiar la fecha del seguro?',
      showDenyButton: true,
      width: 300,
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
        this.dialogRef.close(this.extenderForm.value);
      }
      else{
        this.dialogRef.close();
      }
    })
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
