import { Component, OnDestroy, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdministradorService } from '../services/administrador.service';
import { UserModel } from '../../../auth/models/user.model';
import { User } from '../../../auth/interfaces/user.interface';
import { Estudiante } from '../../../auth/interfaces/estudiante.interface';
import { EstudianteModel } from '../../../auth/models/estudiante.model';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-register-usuario',
  templateUrl: './register-usuario.component.html',
  styles: [
  ]
})
export class RegisterUsuarioComponent implements OnInit, OnDestroy{

  
  mostrarAtributosEstudiante: boolean = false;

  
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
  });



  estudiantePorCrear = {
    id_user: 1,
    correoPersonal: '',
    carrera: 0,
    practicaAprobada: false,
    telefono: '',
    estadoAsignacionCP: false,

  }
 

  constructor(private fb: FormBuilder, private adminService: AdministradorService, ) 
  { 
    
    this._unsubscribeAll = new Subject();
  }

  ngOnInit(): void {

    this.usuarioForm.valueChanges.pipe(takeUntil(this._unsubscribeAll)).subscribe( ({ rolEstudiante, ...rest}) => {
      if(rolEstudiante){
        // Si el checkbox rol estudiante es true

        this.mostrarAtributosEstudiante=true;
        this.usuario?.roles.push('estudiante'); // this.usuario.roles= [...roles, 'estudiante'];

        console.log(this.usuario?.roles);
      }else{
        this.mostrarAtributosEstudiante=false;
      }
    } );
    
  }

  ngOnDestroy(): void {
    
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
  }

  crearUsuario(): void{


    this.usuario = new UserModel(this.usuarioForm.value);
    if(this.usuarioForm.value.rolEstudiante){
      this.usuario.roles=[... '', 'estudiante']
    }
    this.usuario.password = this.usuarioForm.value.password;

    // crear for que recorra roles de usuario, si x rol existe, entonces hacer x funcion.

    // this.usuario.confirmPassword = this.usuarioForm.value.password;
    
    console.log('this usuario', this.usuario);

    this.adminService.crearUsuario(this.usuario).pipe(takeUntil(this._unsubscribeAll)).subscribe(
      (userX: User) => {
        console.log('si entro aqui')
        if(userX.roles.includes('estudiante')){
          console.log('funciono el if rol estudiante');
          this.estudiantePorCrear.id_user = userX._id;
        }
      }
    );

    this.estudiante = new EstudianteModel(0,
      this.estudiantePorCrear.id_user,
      this.usuarioForm.value.correoPersonal, 
      this.usuarioForm.value.carrera, 
      this.usuarioForm.value.practicaAprobada, 
      this.usuarioForm.value.telefono,
      false,
      0,0
    );
    console.log('Estudiante por crear:', this.estudiante);

    const observable2 = this.adminService.crearEstudiante(this.estudiante).pipe(takeUntil(this._unsubscribeAll)).subscribe(
      (res: any) =>{
        console.log('respuesta peticion', res);
      }
    )



  }

 

}
