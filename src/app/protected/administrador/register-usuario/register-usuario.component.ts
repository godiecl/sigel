import { Component, OnDestroy, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdministradorService } from '../services/administrador.service';
import { UserModel } from '../../../auth/models/user.model';
import { User } from '../../../auth/interfaces/user.interface';
import { Estudiante } from '../../../auth/interfaces/estudiante.interface';
import { EstudianteModel } from '../../../auth/models/estudiante.model';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';
import { AuthService } from '../../../auth/services/auth.service';
import { ProfesorCC } from '../../../auth/interfaces/profesorCC.interface';
import { ProfesorCCModel } from '../../../auth/models/profesorCC.model';
import { ProfesorGuiaCPModel } from '../../../auth/models/profesorGuiaCP.model';

@Component({
  selector: 'app-register-usuario',
  templateUrl: './register-usuario.component.html',
  styles: [
  ]
})
export class RegisterUsuarioComponent implements OnInit, OnDestroy{

  
  mostrarAtributosEstudiante: boolean = false;
  mostrarAtributosProfesorGuiaCP: boolean = false;
  mostrarAtributosProfesorCC: boolean = false;

  
  private usuario?: User;
  private estudiante?: Estudiante;
  private _unsubscribeAll: Subject<any>;

  emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";

  usuarioForm: FormGroup = this.fb.group({
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
    practicaAprobada: [false],
    telefono: [''],
    rolEncargadoPracticaTitulacion: [false, [,]],
    rolAsistenteAcademica: [false, [,]],
    rolJefeCarrera: [false, []],
    rolProfesorCC: [false, [,]],
    telefonoCC: [''],
    rolProfesorGuiaCP: [false, [,]],
    disc_empresa: ['',]
  });

  carreras = [
    { id:0, name: 'Ingeniería en Computación e Informática'},
    { id:1, name: 'Ingeniería Civil en Computación e Informática'}
  ];



  // estudiantePorCrear = {
  //   id_user: 1,
  //   correoPersonal: '',
  //   carrera: 0,
  //   practicaAprobada: false,
  //   telefono: '',
  //   estadoAsignacionCP: false,

  // }
 

  constructor(
              private fb: FormBuilder, 
              private adminService: AdministradorService, 
              ) 
  { 
    
    this._unsubscribeAll = new Subject();
  }

  ngOnInit(): void {

    this.usuarioForm.valueChanges.pipe(takeUntil(this._unsubscribeAll)).subscribe( ({ rolEstudiante, rolProfesorCC, rolProfesorGuiaCP, ...rest}) => {
      // Si el checkbox rol estudiante es true
      if(rolEstudiante){ this.mostrarAtributosEstudiante=true; }else{ this.mostrarAtributosEstudiante=false;}

      // Si el checkbox rol profesor guia capstones es true
      if(rolProfesorGuiaCP){ this.mostrarAtributosProfesorGuiaCP=true;}else{ this.mostrarAtributosProfesorGuiaCP=false;}
      
      // si es profesor de comision correccion
      if(rolProfesorCC){ this.mostrarAtributosProfesorCC=true; } else{ this.mostrarAtributosProfesorCC=false;}

    } );
    
  }

  ngOnDestroy(): void {
    
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
  }

  alertaUsuario():void{
    Swal.fire({
      title: '¿Esta seguro de querer agregar este usuario?',
      showDenyButton: true,
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

        //
        this.crearUsuario();

        Swal.fire('Usuario se ha agregado con exito!!', '', 'success')
        //se borra todo lo que contiene el formulario
        this.usuarioForm.reset();
      } else if (result.isDenied) {
        Swal.fire('Los cambios no se han guardado', '', 'info')
      }
    })
  }

  crearUsuario(): void{

    

    this.usuario = new UserModel(this.usuarioForm.value);
    
    this.usuario.password = this.usuarioForm.value.password;
    this.usuario.estado = true;

    if(this.usuarioForm.value.rolEstudiante){ this.usuario.roles=[... this.usuario.roles,'Estudiante']; }

    if(this.usuarioForm.value.rolAdministrador){ this.usuario.roles=[... this.usuario.roles,'Administrador']; }

    if(this.usuarioForm.value.rolAsistenteAcademica){this.usuario.roles = [... this.usuario.roles, 'AsistenteAcademica']
      if(!this.usuario.roles.includes('ComisionTitulacionPractica')){  this.usuario.roles= [... this.usuario.roles, 'ComisionTitulacionPractica'];}}

    if(this.usuarioForm.value.rolEncargadoPracticaTitulacion){ this.usuario.roles= [... this.usuario.roles, 'EncargadoPracticaTitulacion']
      if(!this.usuario.roles.includes('ComisionTitulacionPractica')){this.usuario.roles= [... this.usuario.roles, 'ComisionTitulacionPractica']; }
    }

    if(this.usuarioForm.value.rolJefeCarrera){ this.usuario.roles= [... this.usuario.roles, 'JefeCarrera']
      if(!this.usuario.roles.includes('ComisionTitulacionPractica')){this.usuario.roles= [... this.usuario.roles, 'ComisionTitulacionPractica'];}}

    if(this.usuarioForm.value.rolProfesorCC){ this.usuario.roles= [... this.usuario.roles, 'ProfesorCC']}

    if(this.usuarioForm.value.rolProfesorGuiaCP){ this.usuario.roles= [... this.usuario.roles, 'ProfesorGuiaCP'] }


    // crear for que recorra roles de usuario, si x rol existe, entonces hacer x funcion.

    // this.usuario.confirmPassword = this.usuarioForm.value.password;
    
    console.log('this usuario', this.usuario);

    

    console.log('this usuario', this.usuario);
    this.adminService.crearUsuario(this.usuario).pipe(takeUntil(this._unsubscribeAll)).subscribe(
      (respuesta: any) => {

        if(respuesta.id){

          // retornó un usuario
          if(respuesta.roles.includes('Estudiante')){
            
            this.nuevoEstudiante(respuesta.id);
          }
          if(respuesta.roles.includes('Administrador')){
            this.nuevoAdmin(respuesta.id);
          }
          if(respuesta.roles.includes('EncargadoPracticaTitulacion')){
            this.nuevoEncargadoPracticaTitulacion(respuesta.id);
            this.nuevoComisionTitulacionPractica(respuesta.id, false);
          }
          else if(respuesta.roles.includes('AsistenteAcademica')){
            this.nuevoAsistenteAcademica(respuesta.id);
            this.nuevoComisionTitulacionPractica(respuesta.id, false);
          }
          else if(respuesta.roles.includes('JefeCarrera')){
            this.nuevoComisionTitulacionPractica(respuesta.id, true);
          }
          if(respuesta.roles.includes('ProfesorCC')){
            this.nuevoProfesorCC(respuesta.id, this.usuarioForm.value.telefonoCC);
          }
          if(respuesta.roles.includes('ProfesorGuiaCP')){
            this.nuevoProfesorGuiaCP(respuesta.id, this.usuarioForm.value.telefonoCC, false, this.usuarioForm.value.disc_empresa);
          }
        }else {
          // error
          Swal.fire('Error', respuesta.error, 'error');
        }
      }
    );

  }

  nuevoEstudiante(idUser: number) {

    this.estudiante = new EstudianteModel(0,
      idUser,
      this.usuarioForm.value.correoPersonal, 
      this.usuarioForm.value.carrera, 
      this.usuarioForm.value.practicaAprobada, 
      this.usuarioForm.value.telefono,
      false,
      0,0
    );

    const observable2 = this.adminService.crearEstudiante(this.estudiante).pipe(takeUntil(this._unsubscribeAll)).subscribe(
      (res: any) =>{
        console.log('respuesta peticion crear estudiante', res);
      }
    )

  }

  nuevoAdmin(idUser: number){
    const observable3 = this.adminService.crearAdmin(idUser).pipe(takeUntil(this._unsubscribeAll)).subscribe(
      (res: any) => {
        console.log('respuesta de la peticion crear admin', res);
      }
    )
  }
  
  nuevoEncargadoPracticaTitulacion(idUser: number){
    const observable3 = this.adminService.crearEncargadoPracticaCP(idUser).pipe(takeUntil(this._unsubscribeAll)).subscribe(
      (res: any) => {
        console.log('respuesta de la peticion crear encargado practica titulacion', res);
      }
    )
  }

  nuevoAsistenteAcademica(idUser: number){
    const observable3 = this.adminService.crearAsistenteAcademica(idUser).pipe(takeUntil(this._unsubscribeAll)).subscribe(
      (res: any) => {
        console.log('respuesta de la peticion crear asistente academica', res);
      }
    )
  }

  nuevoComisionTitulacionPractica(idUser: number, jefeCarrera: boolean){
    const observable3 = this.adminService.crearComisionTitulacion(idUser, jefeCarrera).pipe(takeUntil(this._unsubscribeAll)).subscribe(
      (res: any) => {
        console.log('respuesta de la peticion crear comisionTitulacionPracticas', res);
      }
    )
  }

  nuevoProfesorCC(idUser: number, telefonoCC: string){
    
    const profesorCC = new ProfesorCCModel(
      0, idUser, true, telefonoCC
    )
    const observable3 = this.adminService.crearProfesorCC(profesorCC).pipe(takeUntil(this._unsubscribeAll)).subscribe(
      (res: any) => {
        console.log('respuesta de la peticion crear profesorCCs', res);
      });
  }

  nuevoProfesorGuiaCP(idUser: number, telefono: string, estado: boolean, empresa: string){

    const profesorGuiaCP = new ProfesorGuiaCPModel(
      0, idUser, telefono, estado, empresa
    )

    const observable3 = this.adminService.crearProfesorGuiaCP(profesorGuiaCP).pipe(takeUntil(this._unsubscribeAll)).subscribe(
      (res: any) => {
        console.log('respuesta de la peticion crear profesorGuiaCPs', res);
      });
  }

}
