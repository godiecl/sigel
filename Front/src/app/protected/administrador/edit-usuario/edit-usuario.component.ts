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
import { UserModel } from '../../../auth/models/user.model';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { RutService } from 'rut-chileno';

@Component({
  selector: 'app-edit-usuario',
  templateUrl: './edit-usuario.component.html',
  styleUrls: ['./edit-usuario.component.css']
})
export class EditUsuarioComponent implements OnInit, OnDestroy {

  private _unsubscribeAll: Subject<any>;

  // rutUsuarioPorBuscar!: string; // DEBE SER INGRESADO POR LA VIEW, CREAR FORMULARIO.
   usuarioPorEditar!: any;
  // estudianteEditar!: Estudiante;
  // profesorCC!: ProfesorCC; 
  // profesorGuiaCP!: ProfesorGuiaCP;
  // mostrarAtributosEstudiante: boolean = false;
  // mostrarAtributosProfesorGuiaCP: boolean = false;
  // mostrarAtributosProfesorCC: boolean = false;


  buscarForm: FormGroup = this.fb.group({
    rutBuscar: [, [Validators.required, this.rutService.validaRutForm]]
  })

  

  constructor( private adminService: AdministradorService,
               private fb: FormBuilder,
               private router: Router,
               private rutService: RutService
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

  get f(){
    return this.buscarForm.controls;
  }


  // actualizarUsuario(){

  //   this.adminService.actualizarUsuario(this.usuarioPorEditar)
  //     .pipe(takeUntil(this._unsubscribeAll)).subscribe((respuesta: any)=>{
  //       if(respuesta){
  //         // console.log(respuesta);
  //       }
  //     })



  // }

  isRoute(route: string){
    // // console.log('route ',route);
    // // console.log('ruta del ruter', this.router.url)
    if(this.router.url === route){
      return true
    }
    return false;
  }

  inputEvent(event : Event) {
    let rut = this.rutService.getRutChileForm(1, (event.target as HTMLInputElement).value)
    if (rut)
      this.buscarForm.controls['rutBuscar'].patchValue(rut, {emitEvent :false});
  }

  buscarUsuario(){

    this.adminService.obtenerUsuarioPorRut(this.buscarForm.value.rutBuscar).pipe(takeUntil(this._unsubscribeAll)).subscribe((resp)=>{

      // todo: if existe
      if(resp.ok === false){
        Swal.fire('El rut ingresado no existe.', '', 'error')
        return;
      }
      this.usuarioPorEditar = resp;
      // // console.log('usuario por editar',this.usuarioPorEditar);

      // console.log(this.usuarioPorEditar.id);
      const url = `/dashboard/edit-usuario/${this.usuarioPorEditar.id}`
      // // console.log('url', url);

      this.router.navigateByUrl(url);

      // if(this.usuarioPorEditar.roles.includes('Estudiante')){ 
        
      //   // obtener estudiante por id usuario
      //   this.adminService.obtenerEstudiante(this.usuarioPorEditar.id)
      //     .pipe(takeUntil(this._unsubscribeAll)).subscribe((estudiante)=>{
      //       // console.log(estudiante)
      //       if(estudiante){
      //         this.estudianteEditar = estudiante;
      //         this.mostrarAtributosEstudiante = true; 
      //       }
      //     })
      //   // this.estudianteEditar = new EstudianteModel()
      
      // }

      // if(this.usuarioPorEditar.roles.includes('ProfesorCC')){ 
        
      //   // obtener profesorcc por id usuario
      //   this.adminService.obtenerProfesorCC(this.usuarioPorEditar.id)
      //     .pipe(takeUntil(this._unsubscribeAll)).subscribe((profesorComision)=>{
      //       if(profesorComision){
      //         this.profesorCC = profesorComision;
      //         this.mostrarAtributosProfesorCC = true;
      //       }
      //     })
      // }

      // if(this.usuarioPorEditar.roles.includes('ProfesorGuiaCP')){ 

      //   // obtener profesor guia cp por id usuario
      //   this.adminService.obtenerProfesorGuiaCP(this.usuarioPorEditar.id)
      //     .pipe(takeUntil(this._unsubscribeAll)).subscribe((profesorguia)=>{
      //       if(profesorguia){
      //         this.profesorGuiaCP = profesorguia;
      //         this.mostrarAtributosProfesorGuiaCP = true; 
      //       }
      //     })
      // }
      
    })
    // this.mostrarFormEditar = true;
  }
}
