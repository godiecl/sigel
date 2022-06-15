import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthService } from '../../../../auth/services/auth.service';
import { User } from '../../../../auth/interfaces/user.interface';
import { Estudiante } from '../../../../auth/interfaces/estudiante.interface';
import { ProfesorCC } from '../../../../auth/interfaces/profesorCC.interface';
import { Subject } from 'rxjs/internal/Subject';
import { pipe, takeUntil } from 'rxjs';
import { AdministradorService } from '../../services/administrador.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  

  private _unsubscribeAll: Subject<any>;

  usuarioPorEditar!: any;
  estudianteEditar!: Estudiante;
  profesorCC!: ProfesorCC;

  
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
    telefonoCC: [this.profesorCC.telefono],
    rolProfesorGuiaCP: [this.usuarioPorEditar.roles.includes('ProfesorGuiaCP'), [,]],
    disc_empresa: ['',]
  });

  constructor( private fb: FormBuilder, 
               private authService: AuthService, 
               private adminService: AdministradorService,
               private router: ActivatedRoute ) { 
    this._unsubscribeAll = new Subject();
    let idUser = this.router.snapshot.paramMap.get('id');
    this.usuarioPorEditar = this.adminService.obtenerUsuarioPorID(idUser).pipe(takeUntil(this._unsubscribeAll)).subscribe((x)=>{
      console.log('listo');
    })
  }

  ngOnInit(): void {

    

    if(this.usuarioPorEditar.roles.includes('Estudiante')){ 
        
        // obtener estudiante por id usuario
        this.adminService.obtenerEstudiante(this.usuarioPorEditar.id).pipe(takeUntil(this._unsubscribeAll)).subscribe((estudiante)=>{
            console.log(estudiante)
            if(estudiante){
              this.estudianteEditar = estudiante;
              this.mostrarAtributosEstudiante = true; 
            }
          })
        // this.estudianteEditar = new EstudianteModel()
      
      }

      if(this.usuarioPorEditar.roles.includes('ProfesorCC')){ 
        
        // obtener profesorcc por id usuario
        this.adminService.obtenerProfesorCC(this.usuarioPorEditar.id)
          .pipe(takeUntil(this._unsubscribeAll)).subscribe((profesorComision)=>{
            if(profesorComision){
              this.profesorCC = profesorComision;
              this.mostrarAtributosProfesorCC = true;
            }
          })
      }

      if(this.usuarioPorEditar.roles.includes('ProfesorGuiaCP')){ 

        // obtener profesor guia cp por id usuario
        this.adminService.obtenerProfesorGuiaCP(this.usuarioPorEditar.id)
          .pipe(takeUntil(this._unsubscribeAll)).subscribe((profesorguia)=>{
            if(profesorguia){
              this.mostrarAtributosProfesorGuiaCP = true; 
            }
          })
      }

  }

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

  actualizarUsuario(){

  }

}
