import { Component, OnInit, ChangeDetectorRef, AfterContentInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Estudiante } from '../../../../auth/interfaces/estudiante.interface';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs';
import { AdministradorService } from '../../services/administrador.service';
import { ActivatedRoute } from '@angular/router';
import { EstudianteModel } from '../../../../auth/models/estudiante.model';
import { User } from 'src/app/auth/interfaces/user.interface';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit, AfterContentInit {

  

  private _unsubscribeAll: Subject<any>;

  
   mostrarAtributosEstudiante: boolean = false;
  mostrarAtributosProfesorGuiaCP: boolean = false;
  mostrarAtributosProfesorCC: boolean = false;

  usuarioPorEditar!: User;
  // estudianteEditar!: any  ;
  // profesorCC!: any;
  // profesorGuiaCP!: any;

  updateForm!: FormGroup;

  

  // idUser = this.router.snapshot.paramMap.get('id');
  //   this.usuarioPorEditar = this.adminService.obtenerUsuarioPorID(idUser).pipe(takeUntil(this._unsubscribeAll)).subscribe((x)=>{
  //     console.log('listo');
  //   })
  

  emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";

  
  constructor( private fb: FormBuilder, 
               private adminService: AdministradorService,
               private _changeDetectorRef: ChangeDetectorRef,
               private router: ActivatedRoute ) { 
    this._unsubscribeAll = new Subject();
    // mostrarAtributosEstudiante = false;
    // mostrarAtributosProfesorGuiaCP = false;
    // mostrarAtributosProfesorCC = false;

      // TOMA ID DE URL Y BUSCA
    
      this.router.data.subscribe(({user}) =>{
        this.usuarioPorEditar = user;
        console.log('user resolver',this.usuarioPorEditar);
      })
      if(this.usuarioPorEditar.roles.includes('Estudiante')){ 
            console.log('si')

            // this.router.data.subscribe(({estudiante}) =>{
            //   this.estudianteEditar = estudiante;
            //   // this.mostrarAtributosEstudiante = true;
            //   // console.log('estudiante resolver', this.estudianteEditar);
            // })
            // obtener estudiante por id usuario
              // this.adminService.obtenerEstudiante(this.usuarioPorEditar.id)
              //   .pipe(takeUntil(this._unsubscribeAll)).subscribe((estudiante: Estudiante)=>{
              //     console.log('estudiante edit',estudiante)
              //       if(!estudiante){

              //         this.estudianteEditar = new EstudianteModel(
              //           0, this.usuarioPorEditar.id, '', 0, false, '', false, 0, 0  );
              //           console.log('estudiante lol', this.estudianteEditar.correoPersonal)
                      
              //       }
              //       this.estudianteEditar = estudiante;
              //       // = new EstudianteModel(
              //       //   estudiante._id_estudiante, estudiante._id_user, estudiante.correoPersonal, estudiante.carrera,
              //       //   estudiante.practicaAprobada, estudiante.telefono, estudiante.estadoAsignacionCP, estudiante._id_CCpractica, estudiante._id_preinscripcionCP
              //       // );
              //        
              //       console.log('estudiante lol', this.estudianteEditar.correoPersonal)
              //       // this._changeDetectorRef.markForCheck();
                    
              //     })
        // this.estudianteEditar = new EstudianteModel()
      }else{
        // this.estudianteEditar = new EstudianteModel(
        //   0, this.usuarioPorEditar.id, '', 0, false, '', false, 0, 0  );
          // console.log('estudiante lol', this.estudianteEditar)
          // this._changeDetectorRef.markForCheck();
      }
      if(this.usuarioPorEditar.roles.includes('ProfesorCC')){ 

        // this.router.data.subscribe(({profesorCC}) =>{
        //   this.profesorCC = profesorCC;
        //   this.mostrarAtributosProfesorCC = true;
        // })
          
          // obtener profesorcc por id usuario
          // this.adminService.obtenerProfesorCC(this.usuarioPorEditar.id)
          //   .pipe(takeUntil(this._unsubscribeAll)).subscribe((profesorComision)=>{
          //     if(profesorComision){
          //       this.profesorCC = profesorComision;
          //       this.mostrarAtributosProfesorCC = true;
          //     }
          //   })
      }else{
          // this.profesorCC.telefono ='';
          // this.mostrarAtributosProfesorCC = false;
      }

      if(this.usuarioPorEditar.roles.includes('ProfesorGuiaCP')){ 

        this.router.data.subscribe(({profesorGuia}) =>{
          // this.profesorGuiaCP = profesorGuia;
          // this.mostrarAtributosProfesorGuiaCP = true;
        })

        // obtener profesor guia cp por id usuario
        // this.adminService.obtenerProfesorGuiaCP(this.usuarioPorEditar.id)
        //   .pipe(takeUntil(this._unsubscribeAll)).subscribe((profesorguia)=>{
        //     if(profesorguia){
        //       this.profesorCC = profesorguia;
        //       this.mostrarAtributosProfesorGuiaCP = true; 
        //     }
        //   })
      }else{
        // this.profesorGuiaCP.telefono='';
        // this.mostrarAtributosProfesorGuiaCP = false;
      }
      
      
  
  
  }
  ngAfterContentInit(): void {

    // console.log('que onda ',this.estudianteEditar)

    // if(!this.estudianteEditar){
    //   return;
    // }
    
    this.updateForm = this.fb.group({
      nombre:           [this.usuarioPorEditar.nombre, [Validators.required,]],
      apellidop:        [this.usuarioPorEditar.apellidop, [Validators.required,]],
      apellidom:        [this.usuarioPorEditar.apellidom, [Validators.required,]],
      rut:              [this.usuarioPorEditar.rut, [Validators.required,]],
      correo:           [this.usuarioPorEditar.correo, [Validators.required, Validators.pattern(this.emailPattern)]],
      rolAdministrador: [this.usuarioPorEditar.roles.includes('Administrador'), [,]],
      rolEstudiante:    [this.usuarioPorEditar.roles.includes('Estudiante'), [,]],
      // correoPer:        [this.estudianteEditar.correoPersonal, ],
      // carrera:          [this.estudianteEditar.carrera,],
      // practicaAprobada: [this.estudianteEditar.practicaAprobada, ],
      // telefono:         [this.estudianteEditar.telefono, ],
      rolEncargadoPracticaTitulacion: [this.usuarioPorEditar.roles.includes('EncargadoPracticaTitulacion'), [,]],
      rolAsistenteAcademica: [this.usuarioPorEditar.roles.includes('AsistenteAcademica'), [,]],
      rolJefeCarrera:   [this.usuarioPorEditar.roles.includes('ComisionTitulacion'), []],
      rolProfesorCC:    [this.usuarioPorEditar.roles.includes('ProfesorCC'), [,]],
      // telefonoCC:       [this.profesorCC.telefono],
      // telefonoCP:       [this.profesorGuiaCP.telefono],
      rolProfesorGuiaCP: [this.usuarioPorEditar.roles.includes('ProfesorGuiaCP'), [,]],
      // disc_empresa: ['',]
    });
    
  }

  ngOnInit():void {

  }

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

  actualizarUsuario(){
 
    this.usuarioPorEditar.apellidom = this.updateForm.value.apellidom; 
    this.usuarioPorEditar.apellidop = this.updateForm.value.apellidop;
    this.usuarioPorEditar.nombre = this.updateForm.value.nombre;
    this.usuarioPorEditar.rut = this.updateForm.value.rut;
    this.usuarioPorEditar.correo = this.updateForm.value.correo;
    
    this.usuarioPorEditar.estado = true;
    console.log(this.usuarioPorEditar.roles);

    if(this.updateForm.value.rolEstudiante){ 
      if(!this.usuarioPorEditar.roles.includes('Estudiante')){
        this.usuarioPorEditar.roles=[... this.usuarioPorEditar.roles,'Estudiante'];
      }
    }

    if(this.updateForm.value.rolAdministrador){
       if(!this.usuarioPorEditar.roles.includes('Administrador')){
      this.usuarioPorEditar.roles=[... this.usuarioPorEditar.roles,'Administrador'];
      } 
    }

    if(this.updateForm.value.rolAsistenteAcademica){
      if(!this.usuarioPorEditar.roles.includes('AsistenteAcademica')){
        this.usuarioPorEditar.roles=[... this.usuarioPorEditar.roles,'AsistenteAcademica'];
      }
      if(!this.usuarioPorEditar.roles.includes('ComisionTitulacionPractica')){  
          this.usuarioPorEditar.roles= [... this.usuarioPorEditar.roles, 'ComisionTitulacionPractica'];
      }
    }

    if(this.updateForm.value.rolEncargadoPracticaTitulacion){ 
      if(!this.usuarioPorEditar.roles.includes('EncargadoPracticaTitulacion')){
        this.usuarioPorEditar.roles= [... this.usuarioPorEditar.roles, 'EncargadoPracticaTitulacion']
      }
      if(!this.usuarioPorEditar.roles.includes('ComisionTitulacionPractica')){
        this.usuarioPorEditar.roles= [... this.usuarioPorEditar.roles, 'ComisionTitulacionPractica'];
      }
    }

    if(this.updateForm.value.rolJefeCarrera){ 
      if(!this.usuarioPorEditar.roles.includes('JefeCarrera')){
        this.usuarioPorEditar.roles= [... this.usuarioPorEditar.roles, 'JefeCarrera']
      }
      if(!this.usuarioPorEditar.roles.includes('ComisionTitulacionPractica')){
        this.usuarioPorEditar.roles= [... this.usuarioPorEditar.roles, 'ComisionTitulacionPractica'];
      }
    if(this.updateForm.value.rolProfesorCC){ 
      if(!this.usuarioPorEditar.roles.includes('ProfesorCC')){
        this.usuarioPorEditar.roles= [... this.usuarioPorEditar.roles, 'ProfesorCC']}
      }
    }
    if(this.updateForm.value.rolProfesorGuiaCP){ 
      if(!this.usuarioPorEditar.roles.includes('ProfesorCC')){
        this.usuarioPorEditar.roles= [... this.usuarioPorEditar.roles, 'ProfesorGuiaCP']
        }
       }


    

    // this.usuario.confirmPassword = this.usuarioForm.value.password;
    
    

    // console.log('form value',this.updateForm.value)

    console.log('user por editar value',this.usuarioPorEditar)
    this.adminService.actualizarUsuario(this.usuarioPorEditar).pipe(takeUntil(this._unsubscribeAll)).subscribe((x)=>{
      if(!x){
        // alerta agregar
        console.log('todo mal');
      }
      // alerta agregar
      console.log('todo bien');
    })
  }

}
