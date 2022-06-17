import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Estudiante } from '../../../../auth/interfaces/estudiante.interface';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil, pipe } from 'rxjs';
import { AdministradorService } from '../../services/administrador.service';
import { ActivatedRoute } from '@angular/router';
import { EstudianteModel } from '../../../../auth/models/estudiante.model';
import { User } from 'src/app/auth/interfaces/user.interface';
import { ProfesorCCModel } from '../../../../auth/models/profesorCC.model';
import { ProfesorGuiaCPModel } from '../../../../auth/models/profesorGuiaCP.model';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  

  private _unsubscribeAll: Subject<any>;

  
   mostrarAtributosEstudiante: boolean = false;
  mostrarAtributosProfesorGuiaCP: boolean = false;
  mostrarAtributosProfesorCC: boolean = false;

  usuarioPorEditar!: User;
  estudianteEditar!: Estudiante  ;
  profesorCC!: any;
  profesorGuiaCP!: any;

  updateForm!: FormGroup;

  

  // idUser = this.router.snapshot.paramMap.get('id');
  //   this.usuarioPorEditar = this.adminService.obtenerUsuarioPorID(idUser).pipe(takeUntil(this._unsubscribeAll)).subscribe((x)=>{
  //     console.log('listo');
  //   })
  

  emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";

  

  
  constructor( private fb: FormBuilder, 
               private adminService: AdministradorService,
               private _changeDetectorRef: ChangeDetectorRef,
               private router: ActivatedRoute 
               ) { 
    this._unsubscribeAll = new Subject();
    // mostrarAtributosEstudiante = false;
    // mostrarAtributosProfesorGuiaCP = false;
    // mostrarAtributosProfesorCC = false;

      // TOMA ID DE URL Y BUSCA
    
      this.router.data.subscribe(({user}) =>{
        this.usuarioPorEditar = user;
        // console.log('user resolver',this.usuarioPorEditar);
      })
      if(this.usuarioPorEditar.roles.includes('Estudiante')){ 
            // console.log('si')

            this.router.data.subscribe(({estudiante}) =>{

              // console.log('data eset', estudiante);
              this.estudianteEditar = estudiante;
              // this.estudianteEditar._id_user = estudiante.id_usuario;
              this.mostrarAtributosEstudiante = true;
               console.log('estudiante resolver', this.estudianteEditar);
            })
            // // obtener estudiante por id usuario
            //   this.adminService.obtenerEstudiante(this.usuarioPorEditar.id)
            //     .pipe(takeUntil(this._unsubscribeAll)).subscribe((estudiante: Estudiante)=>{
            //       console.log('estudiante edit',estudiante)
            //         if(!estudiante){

            //           this.estudianteEditar = new EstudianteModel(
            //             0, this.usuarioPorEditar.id, '', 0, false, '', false, 0, 0  );
            //             console.log('estudiante lol', this.estudianteEditar.correoPersonal)
                      
            //         }
            //         this.estudianteEditar = estudiante;
                    // = new EstudianteModel(
                    //   estudiante._id_estudiante, estudiante._id_user, estudiante.correoPersonal, estudiante.carrera,
                    //   estudiante.practicaAprobada, estudiante.telefono, estudiante.estadoAsignacionCP, estudiante._id_CCpractica, estudiante._id_preinscripcionCP
                    // );
                     
                    // console.log('estudiante lol', this.estudianteEditar.correoPersonal)
                    // this._changeDetectorRef.markForCheck();
                    
                  // })
        // this.estudianteEditar = new EstudianteModel()
      }else{
        

        this.estudianteEditar = new EstudianteModel(
          0, this.usuarioPorEditar.id, '', 0, false, '', false, 0, 0  );
          console.log('estudiante lol', this.estudianteEditar)
          // this._changeDetectorRef.markForCheck();
      }
      if(this.usuarioPorEditar.roles.includes('ProfesorCC')){ 

        this.router.data.subscribe(({profesorCC}) =>{
          this.profesorCC = profesorCC;
          this.mostrarAtributosProfesorCC = true;
        })
          
          // obtener profesorcc por id usuario
          // this.adminService.obtenerProfesorCC(this.usuarioPorEditar.id)
          //   .pipe(takeUntil(this._unsubscribeAll)).subscribe((profesorComision)=>{
          //     if(profesorComision){
          //       this.profesorCC = profesorComision;
          //       this.mostrarAtributosProfesorCC = true;
          //     }
          //   })
      }else{
          this.profesorCC = new ProfesorCCModel(
            0, this.usuarioPorEditar.id, false, '' 
          );
          this.mostrarAtributosProfesorCC = false;
      }

      if(this.usuarioPorEditar.roles.includes('ProfesorGuiaCP')){ 

        this.router.data.subscribe(({profesorGuia}) =>{
          this.profesorGuiaCP = profesorGuia;
          this.mostrarAtributosProfesorGuiaCP = true;
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
        this.profesorGuiaCP = new ProfesorGuiaCPModel(
          0, this.usuarioPorEditar.id, '', false, ''
        )
        // this.profesorGuiaCP.telefono='';
        // this.profesorGuiaCP.disc_empresa= '';
        this.mostrarAtributosProfesorGuiaCP = false;
      }
      
      
  
  
  }
  // ngAfterContentInit(): void {

  //   // console.log('que onda ',this.estudianteEditar)

  //   // if(!this.estudianteEditar){
  //   //   return;
  //   // }
    
   
    
  // }

  ngOnInit():void {

    this.updateForm = this.fb.group({
      nombre:           [this.usuarioPorEditar.nombre, [Validators.required,]],
      apellidop:        [this.usuarioPorEditar.apellidop, [Validators.required,]],
      apellidom:        [this.usuarioPorEditar.apellidom, [Validators.required,]],
      rut:              [this.usuarioPorEditar.rut, [Validators.required,]],
      correo:           [this.usuarioPorEditar.correo, [Validators.required, Validators.pattern(this.emailPattern)]],
      rolAdministrador: [this.usuarioPorEditar.roles.includes('Administrador'), [,]],
      rolEstudiante:    [this.usuarioPorEditar.roles.includes('Estudiante'), [,]],
      correoPersonal:        [this.estudianteEditar.correoPersonal, ],
      carrera:          [this.estudianteEditar.carrera,],
      practicaAprobada: [this.estudianteEditar.practicaAprobada, ],
      telefono:         [this.estudianteEditar.telefono, ],
      rolEncargadoPracticaTitulacion: [this.usuarioPorEditar.roles.includes('EncargadoPracticaTitulacion'), [,]],
      rolAsistenteAcademica: [this.usuarioPorEditar.roles.includes('AsistenteAcademica'), [,]],
      rolJefeCarrera:   [this.usuarioPorEditar.roles.includes('ComisionTitulacion'), []],
      rolProfesorCC:    [this.usuarioPorEditar.roles.includes('ProfesorCC'), [,]],
      telefonoCC:       [this.profesorCC.telefono],
      telefonoCP:       [this.profesorGuiaCP.telefono],
      rolProfesorGuiaCP: [this.usuarioPorEditar.roles.includes('ProfesorGuiaCP'), [,]],
      disc_empresa: [this.profesorGuiaCP.disc_empresa,]
    });

    this.updateForm.valueChanges.pipe(takeUntil(this._unsubscribeAll)).subscribe( ({ rolEstudiante, rolProfesorCC, rolProfesorGuiaCP, ...rest}) => {
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

  actualizarUsuario(){
 
    this.usuarioPorEditar.apellidom = this.updateForm.value.apellidom; 
    this.usuarioPorEditar.apellidop = this.updateForm.value.apellidop;
    this.usuarioPorEditar.nombre = this.updateForm.value.nombre;
    this.usuarioPorEditar.rut = this.updateForm.value.rut;
    this.usuarioPorEditar.correo = this.updateForm.value.correo;
    
    this.usuarioPorEditar.estado = true;
    // console.log(this.usuarioPorEditar.roles);

    this.estudianteEditar.carrera = this.updateForm.value.carrera;
    this.estudianteEditar.practicaAprobada = this.updateForm.value.practicaAprobada;
    this.estudianteEditar.telefono = this.updateForm.value.telefono;
    this.estudianteEditar.correoPersonal = this.updateForm.value.correoPersonal;
    this.estudianteEditar.id_usuario= this.usuarioPorEditar.id;
    

    


    /**
     *  SI NO TIENE ROL LO CREA 
     */

    /***
        *  FALTAN METODOS DE SI ANTES TENIA ROL Y AHORA NO, QUE LOS BORRE
        */

      // si en el form tiene true el rol

      console.log('estudiante por editar',this.estudianteEditar)
     if(this.updateForm.value.rolEstudiante){ 
      // revisa si lo tiene ya el usuario
      if(!this.usuarioPorEditar.roles.includes('Estudiante')){
        // si no lo tiene lo agrega y lo crea.
        this.usuarioPorEditar.roles=[... this.usuarioPorEditar.roles,'Estudiante'];
        this.adminService.crearEstudiante(this.estudianteEditar).pipe(takeUntil(this._unsubscribeAll)).subscribe(
            (res: any) =>{
            console.log('respuesta peticion crear estudiante', res);
            }
        )}else{
          // Si lo incluye hay que actualizarlo.
          this.adminService.actualizarEstudiantePorId(this.estudianteEditar).pipe(takeUntil(this._unsubscribeAll)).subscribe(
            (res: any)=>{
              console.log('respuesta patch estudiante', res)
            }
          )}
    }else{
      // SI ESTA MARCADO COMO FALSE EL CHECKBOX, HAY QUE VERIFICAR SI NO LO TIENE, Y SI LO TIENE HAY QUE BORRARLO.
      if(this.usuarioPorEditar.roles.includes('Estudiante')){
        const index = this.usuarioPorEditar.roles.indexOf('Estudiante');
        this.usuarioPorEditar.roles.splice(index,1)
        this.adminService.eliminarEstudiantePorIdUsuario(this.estudianteEditar.id_usuario).pipe(takeUntil(this._unsubscribeAll)).subscribe(
          (res: any) =>{      
            console.log('respuesta peticion delete estudiante',res);
          })
      }
    }



    if(this.updateForm.value.rolAdministrador){
       if(!this.usuarioPorEditar.roles.includes('Administrador')){
      this.usuarioPorEditar.roles=[... this.usuarioPorEditar.roles,'Administrador'];
      this.adminService.crearAdmin(this.usuarioPorEditar.id).pipe(takeUntil(this._unsubscribeAll)).subscribe(
        (res: any) =>{
        console.log('respuesta peticion crear admin', res);
        })
      }else{
        
      } 
    }

    if(this.updateForm.value.rolAsistenteAcademica){
      if(!this.usuarioPorEditar.roles.includes('AsistenteAcademica')){
        this.usuarioPorEditar.roles=[... this.usuarioPorEditar.roles,'AsistenteAcademica'];
        this.adminService.crearAsistenteAcademica(this.usuarioPorEditar.id).pipe(takeUntil(this._unsubscribeAll)).subscribe(
        (res: any) =>{
        console.log('respuesta peticion crear asistente academica', res);
        })
      }
      if(!this.usuarioPorEditar.roles.includes('ComisionTitulacionPractica')){  
          this.usuarioPorEditar.roles= [... this.usuarioPorEditar.roles, 'ComisionTitulacionPractica'];
          this.adminService.crearComisionTitulacion(this.usuarioPorEditar.id, false).pipe(takeUntil(this._unsubscribeAll)).subscribe(
        (res: any) =>{
        console.log('respuesta peticion crear comision practica y titulacion', res);
        })
      }
    }

    if(this.updateForm.value.rolEncargadoPracticaTitulacion){ 
      if(!this.usuarioPorEditar.roles.includes('EncargadoPracticaTitulacion')){
        this.usuarioPorEditar.roles= [... this.usuarioPorEditar.roles, 'EncargadoPracticaTitulacion']
        this.adminService.crearEncargadoPracticaCP(this.usuarioPorEditar.id).pipe(takeUntil(this._unsubscribeAll)).subscribe(
        (res: any) =>{
        console.log('respuesta peticion crear encargado practica cp', res);
        })
      }
      if(!this.usuarioPorEditar.roles.includes('ComisionTitulacionPractica')){
        this.usuarioPorEditar.roles= [... this.usuarioPorEditar.roles, 'ComisionTitulacionPractica'];
        this.adminService.crearComisionTitulacion(this.usuarioPorEditar.id, false).pipe(takeUntil(this._unsubscribeAll)).subscribe(
        (res: any) =>{
        console.log('respuesta peticion crear comision practica y titulacion', res);
        })
      }
    }

    if(this.updateForm.value.rolJefeCarrera){ 
      if(!this.usuarioPorEditar.roles.includes('JefeCarrera')){
        this.usuarioPorEditar.roles= [... this.usuarioPorEditar.roles, 'JefeCarrera']
        this.adminService.crearComisionTitulacion(this.usuarioPorEditar.id, true).pipe(takeUntil(this._unsubscribeAll)).subscribe(
          (res: any) =>{
          console.log('respuesta peticion crear jefe de carrera', res);
          }
        ) 
      }
      if(!this.usuarioPorEditar.roles.includes('ComisionTitulacionPractica')){
        this.usuarioPorEditar.roles= [... this.usuarioPorEditar.roles, 'ComisionTitulacionPractica'];
      }
    }  
    if(this.updateForm.value.rolProfesorCC){ 
      if(!this.usuarioPorEditar.roles.includes('ProfesorCC')){
        this.usuarioPorEditar.roles= [... this.usuarioPorEditar.roles, 'ProfesorCC']
      }
        this.adminService.crearProfesorCC(this.profesorCC).pipe(takeUntil(this._unsubscribeAll)).subscribe(
        (res: any) =>{
        console.log('respuesta peticion crear profesor cc', res);
        }
      )
      
    }
    if(this.updateForm.value.rolProfesorGuiaCP){ 
      if(!this.usuarioPorEditar.roles.includes('ProfesorCC')){
        this.usuarioPorEditar.roles= [... this.usuarioPorEditar.roles, 'ProfesorGuiaCP']
        this.adminService.crearProfesorGuiaCP(this.profesorGuiaCP).pipe(takeUntil(this._unsubscribeAll)).subscribe(
        (res: any) =>{
        console.log('respuesta peticion crear profesor guia cp', res);
          }
        )
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

  eliminarEstudiante(idUser: any){
    this.adminService.eliminarEstudiantePorIdUsuario(idUser).pipe(takeUntil(this._unsubscribeAll)).subscribe((x: any)=>{
      console.log('respuesta de eliminar estudiante',x);
    })
  }

}
