import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AdministradorService } from '../../services/administrador.service';

@Component({
  selector: 'app-edit-usuario',
  templateUrl: './edit-usuario.component.html',
})
export class EditUsuarioComponent implements OnInit {

  mostrarAtributosEstudiante: boolean = false;
  mostrarAtributosProfesorGuiaCP: boolean = false;
  mostrarAtributosProfesorCC: boolean = false;

  emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";

  updateForm: FormGroup = this.fb.group({
    nombre: ['', [Validators.required,]],
    apellidop: ['', [Validators.required,]],
    apellidom: ['', [Validators.required,]],
    rut: ['', [Validators.required,]],
    correo: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
    password: ['', [Validators.required, Validators.minLength(4)]],
    confirmPassword: ['', [Validators.required,]],
    rolAdministrador: [false, [,]],
    rolEstudiante: [false, [,]],
    correoPersonal: [''],
    carrera: [],
    practicaAprobada: [],
    telefono: [''],
    rolEncargadoPracticaTitulacion: [false, [,]],
    rolAsistenteAcademica: [false, [,]],
    rolJefeCarrera: [false, []],
    rolProfesorCC: [false, [,]],
    telefonoCC: [''],
    rolProfesorGuiaCP: [false, [,]],
    disc_empresa: ['',]
  });

  constructor( private adminService: AdministradorService,
               private fb: FormBuilder,
    ) { }

  ngOnInit(): void {

    

    
  }

  actualizarUsuario(){

  }



  
}
