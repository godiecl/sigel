import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdministradorService } from '../services/administrador.service';
import { UserModel } from '../../../auth/models/user.model';
import { User } from '../../../auth/interfaces/user.interface';

@Component({
  selector: 'app-register-usuario',
  templateUrl: './register-usuario.component.html',
  styles: [
  ]
})
export class RegisterUsuarioComponent implements OnInit {

  usuario: User | undefined;

  emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";

  usuarioForm: FormGroup = this.fb.group({
    nombre: ['', [Validators.required,]],
    apellidop: ['', [Validators.required,]],
    apellidom: ['', [Validators.required,]],
    rut: ['', [Validators.required,]],
    correo: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
    password: ['', [Validators.required, Validators.minLength(4)]],
    confirmPassword: ['', [Validators.required,]],
    roles: [, [,]],
  });
  constructor(private fb: FormBuilder, private adminService: AdministradorService) { }

  ngOnInit(): void {
  }

  crearUsuario(){
    this.usuario = new UserModel(
      this.usuarioForm.value )

    this.usuario.password = this.usuarioForm.value.password;
    // this.usuario.confirmPassword = this.usuarioForm.value.password;
    console.log('this usuario', this.usuario);
    this.adminService.crearUsuario(this.usuario);


  }

}
