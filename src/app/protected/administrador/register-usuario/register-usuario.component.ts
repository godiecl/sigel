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
    practicaAprobada: [],
    telefono: [''],
    rolEncargadoPracticaTitulacion: [false, [,]],
    rolAsistenteAcademica: [false, [,]],
    rolProfesorCC: [false, [,]],
    rolProfesorGuiaCP: [false, [,]],
    rolJefeCarrera: [false, []]
  });



  estudiantePorCrear = {
    id_user: 1,
    correoPersonal: '',
    carrera: 0,
    practicaAprobada: false,
    telefono: '',
    estadoAsignacionCP: false,

  }
 

  constructor(
              private fb: FormBuilder, 
              private adminService: AdministradorService, 
              private authService: AuthService) 
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

  crearUsuario(): void{


    this.usuario = new UserModel(this.usuarioForm.value);
    
    this.usuario.password = this.usuarioForm.value.password;

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

    this.adminService.crearUsuario(this.usuario).pipe(takeUntil(this._unsubscribeAll)).subscribe(
      (respuesta: any) => {

        if(respuesta.id){

          // retornó un usuario
          if(respuesta.roles.includes('Estudiante')){
            this.estudiantePorCrear.id_user = respuesta.id;
            this.nuevoEstudiante();
          }
          if(respuesta.roles.includes('Administrador')){
            this.nuevoAdmin(respuesta.id);
          }
        }else {
          // error
          Swal.fire('Error', respuesta.error, 'error');
        }
        
      }
    );

  }

  nuevoEstudiante() {

    this.estudiante = new EstudianteModel(0,
      this.estudiantePorCrear.id_user,
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

  nuevoAdmin(idUser: string){
    const observable3 = this.adminService.crearAdmin(idUser).pipe(takeUntil(this._unsubscribeAll)).subscribe(
      (res: any) => {
        console.log('respuesta de la peticion crear admin', res);
      }
    )
  }

  logout(){
    this.authService.logout();
  }
 

}
