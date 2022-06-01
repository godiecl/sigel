import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register-usuario',
  templateUrl: './register-usuario.component.html',
  styles: [
  ]
})
export class RegisterUsuarioComponent implements OnInit {

  emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";

  usuarioForm: FormGroup = this.fb.group({
    nombre: ['', [Validators.required,]],
    apellidoP: ['', [Validators.required,]],
    apellidoM: ['', [Validators.required,]],
    rut: ['', [Validators.required,]],
    correo: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
    password: ['', [Validators.required, Validators.minLength(4)]],
    confirmPassword: ['', [Validators.required,]],
    roles: [, [Validators.required,]],
  });
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  crearUsuario(){
    console.log('formulario de crear usuario:',this.usuarioForm.value);
    console.log('formulario de crear usuario, valido? ',this.usuarioForm.valid);
  }

}
