import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AdministradorService } from '../services/administrador.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs/internal/Subject';
import { User } from '../../../auth/interfaces/user.interface';
import { Estudiante } from '../../../auth/interfaces/estudiante.interface';
import { ProfesorCC } from '../../../auth/interfaces/profesorCC.interface';
import { ProfesorGuiaCP } from '../../../auth/interfaces/profesorGuiaCP.interface';
import { EstudianteModel } from '../../../auth/models/estudiante.model';
import { pipe } from 'rxjs';

@Component({
  selector: 'app-edit-usuario',
  templateUrl: './edit-usuario.component.html',
})
export class EditUsuarioComponent implements OnInit, OnDestroy {

  private _unsubscribeAll: Subject<any>;

  rutUsuarioPorBuscar!: string; // DEBE SER INGRESADO POR LA VIEW, CREAR FORMULARIO.
  usuarioPorEditar!: User;
  estudianteEditar!: Estudiante;
  profesorCC!: ProfesorCC; 
  profesorGuiaCP!: ProfesorGuiaCP;
  mostrarAtributosEstudiante: boolean = false;
  mostrarAtributosProfesorGuiaCP: boolean = false;
  mostrarAtributosProfesorCC: boolean = false;

  emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";

  updateForm: FormGroup = this.fb.group({
    nombre: [this.usuarioPorEditar.nombre, [Validators.required,]],
    apellidop: [this.usuarioPorEditar.apellidop, [Validators.required,]],
    apellidom: [this.usuarioPorEditar.apellidom, [Validators.required,]],
    rut: [this.usuarioPorEditar.rut, [Validators.required,]],
    correo: [this.usuarioPorEditar.correo, [Validators.required, Validators.pattern(this.emailPattern)]],
    password: [this.usuarioPorEditar.password, [Validators.required, Validators.minLength(4)]],
    confirmPassword: [, [Validators.required,]],
    rolAdministrador: [this.usuarioPorEditar.roles.includes('Administrador'), [,]],
    rolEstudiante: [this.usuarioPorEditar.roles.includes('Estudiante'), [,]],
    correoPersonal: [this.estudianteEditar.correoPersonal, ],
    carrera: [this.estudianteEditar.carrera ,],
    practicaAprobada: [this.estudianteEditar.practicaAprobada, ],
    telefono: [this.estudianteEditar.telefono, ],
    rolEncargadoPracticaTitulacion: [this.usuarioPorEditar.roles.includes('EncargadoPracticaTitulacion'), [,]],
    rolAsistenteAcademica: [this.usuarioPorEditar.roles.includes('AsistenteAcademica'), [,]],
    rolJefeCarrera: [this.usuarioPorEditar.roles.includes('ComisionTitulacion'), []],
    rolProfesorCC: [this.usuarioPorEditar.roles.includes('ProfesorCC'), [,]],
    telefonoCC: [''],
    rolProfesorGuiaCP: [this.usuarioPorEditar.roles.includes('ProfesorGuiaCP'), [,]],
    disc_empresa: ['',]
  });

  constructor( private adminService: AdministradorService,
               private fb: FormBuilder,
    ) { 
      this._unsubscribeAll = new Subject();
    }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

  actualizarUsuario(){

    this.usuarioPorEditar = this.updateForm.value;

    if(this.usuarioPorEditar.roles.includes('Estudiante')){ }
    if(this.usuarioPorEditar.roles.includes('ProfesorCC')){ }
    if(this.usuarioPorEditar.roles.includes('ProfesorGuiaCP')){ }

    this.adminService.actualizarUsuario(this.usuarioPorEditar)
      .pipe(takeUntil(this._unsubscribeAll)).subscribe((respuesta: any)=>{
        if(respuesta){
          console.log(respuesta);
        }
      })



  }

  buscarUsuario(){

    this.adminService.obtenerUsuarioPorRut(this.rutUsuarioPorBuscar).pipe(takeUntil(this._unsubscribeAll)).subscribe((resp)=>{

      // todo: if existe
      this.usuarioPorEditar = resp;
      if(this.usuarioPorEditar.roles.includes('Estudiante')){ 
        
        // obtener estudiante por id usuario
        this.adminService.obtenerEstudiante(this.usuarioPorEditar._id)
          .pipe(takeUntil(this._unsubscribeAll)).subscribe((estudiante)=>{
            if(estudiante){
              this.estudianteEditar = estudiante;
              this.mostrarAtributosEstudiante = true; 
            }
          })
        // this.estudianteEditar = new EstudianteModel()
      
      }

      if(this.usuarioPorEditar.roles.includes('ProfesorCC')){ 
        
        // obtener profesorcc por id usuario
        this.adminService.obtenerProfesorCC(this.usuarioPorEditar._id)
          .pipe(takeUntil(this._unsubscribeAll)).subscribe((profesorComision)=>{
            if(profesorComision){
              this.profesorCC = profesorComision;
              this.mostrarAtributosProfesorCC = true;
            }
          })
      }

      if(this.usuarioPorEditar.roles.includes('ProfesorGuiaCP')){ 

        // obtener profesor guia cp por id usuario
        this.adminService.obtenerProfesorGuiaCP(this.usuarioPorEditar._id)
          .pipe(takeUntil(this._unsubscribeAll)).subscribe((profesorguia)=>{
            if(profesorguia){
              this.profesorGuiaCP = profesorguia;
              this.mostrarAtributosProfesorGuiaCP = true; 
            }
          })
      }
    })
  }


  
}
