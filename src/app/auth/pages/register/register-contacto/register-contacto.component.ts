import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-register-contacto',
  templateUrl: './register-contacto.component.html',
  styles: [
  ]
})
export class RegisterContactoComponent implements OnInit {

  emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";

  contactoForm: FormGroup = this.fb.group({

    nombre: ['',[Validators.required]],
    rut: ['', [Validators.required]],
    apellidop: ['', [Validators.required]],
    apellidom: ['', [Validators.required]],
    correo: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
    cargo: ['', [Validators.required]],
    telefono: ['', [Validators.required]],
    password: ['', [Validators.required]],
    confirmPassword: ['', [Validators.required]],
    
  });

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {

  }


}
