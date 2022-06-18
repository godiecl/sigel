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
  encargadoEmpresa!: any;

  updateForm!: FormGroup;

  carreras = [
    { id:0, name: 'Ingeniería en Computación e Informática'},
    { id:1, name: 'Ingeniería Civil en Computación e Informática'},
  ];

  

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
        console.log('roles: ', this.usuarioPorEditar.roles)
      })
      if(this.usuarioPorEditar.roles.includes('Estudiante')){ 
            // console.log('si')

            this.router.data.subscribe(({estudiante}) =>{

              // console.log('data eset', estudiante);
              this.estudianteEditar = estudiante;
              // this.estudianteEditar._id_user = estudiante.id_usuario;
              this.mostrarAtributosEstudiante = true;
              //  console.log('estudiante resolver', this.estudianteEditar);  
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
          0, this.usuarioPorEditar.id, '', 2, false, '', false, 0, 0  );
          // console.log('estudiante lol', this.estudianteEditar)
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
            0, this.usuarioPorEditar.id, true, '' 
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
      // if(this.usuarioPorEditar.roles.includes('Administrador')){

      // }
      
      // if(this.usuarioPorEditar.roles.includes('EncargadoPracticaTitulacion')){
        
      // }
      // if(this.usuarioPorEditar.roles.includes('JefeCarrera')){
      //   console.log('lol');
      // }
      // if(this.usuarioPorEditar.roles.includes('AsistenteAcademica')){
        
      // }
      
      // if(this.usuarioPorEditar.roles.includes('EncargadoEmpresa')){
        
      // }
      
      // if(this.usuarioPorEditar.roles.includes('Administrador')){
        
      // }
      
  
  
  }
  // ngAfterContentInit(): void {

  //   // console.log('que onda ',this.estudianteEditar)

  //   // if(!this.estudianteEditar){
  //   //   return;
  //   // }
    
   
    
  // }

  ngOnInit():void {

    let carreraSelect = this.estudianteEditar.carrera;
    if(carreraSelect === 2){
      // carreraSelect = '';
    }

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
      rolJefeCarrera:   [this.usuarioPorEditar.roles.includes('JefeCarrera'), []],
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

    this.profesorCC.telefono = this.updateForm.value.telefonoCC;
    this.profesorGuiaCP.telefono = this.updateForm.value.telefonoCP;
    this.profesorGuiaCP.disc_empresa = this.updateForm.value.disc_empresa;
    

    


    /**
     *  SI NO TIENE ROL LO CREA 
     */

    /***
        *  FALTAN METODOS DE SI ANTES TENIA ROL Y AHORA NO, QUE LOS BORRE
        */

      // si en el form tiene true el rol

      console.log('estudiante por editar',this.estudianteEditar);
      // console.log('PROFE CP por editar',this.profesorGuiaCP);
      console.log('PROFE CC por editar',this.profesorCC);
      console.log('update form', this.updateForm.value);
     if(this.updateForm.value.rolEstudiante){ 
      // revisa si lo tiene ya el usuario
      if(!this.usuarioPorEditar.roles.includes('Estudiante')){
        
        this.usuarioPorEditar.roles=[... this.usuarioPorEditar.roles,'Estudiante'];
        // si no lo tiene lo agrega y lo crea.
        this.adminService.crearEstudiante(this.estudianteEditar).pipe(takeUntil(this._unsubscribeAll)).subscribe(
            (res: any) =>{
              console.log(res);
            }
        )}else{
          // Si lo incluye hay que actualizarlo.
          this.adminService.actualizarEstudiantePorId(this.estudianteEditar).pipe(takeUntil(this._unsubscribeAll)).subscribe(
            (res: any)=>{
              console.log(res)
            }
          )}
    }else{
      // SI ESTA MARCADO COMO FALSE EN EL FORM, HAY QUE VERIFICAR SI NO LO TIENE, Y SI LO TIENE HAY QUE BORRARLO.
      if(this.usuarioPorEditar.roles.includes('Estudiante')){
        const index = this.usuarioPorEditar.roles.indexOf('Estudiante');
        this.usuarioPorEditar.roles.splice(index,1)
        this.adminService.eliminarEstudiantePorIdUsuario(this.estudianteEditar.id_usuario).pipe(takeUntil(this._unsubscribeAll)).subscribe(
          (res: any) =>{      
            console.log(res);
          })
      }
    }


    // LISTO
    if(this.updateForm.value.rolAdministrador){
       if(!this.usuarioPorEditar.roles.includes('Administrador')){
      this.usuarioPorEditar.roles=[... this.usuarioPorEditar.roles,'Administrador'];
      this.adminService.crearAdmin(this.usuarioPorEditar.id).pipe(takeUntil(this._unsubscribeAll)).subscribe(
        (res: any) =>{
        console.log(res);
        })
      }else{ // actualizar
      } 
    }else{
      if(this.usuarioPorEditar.roles.includes('Administrador')){
        // eliminar
        const index = this.usuarioPorEditar.roles.indexOf('Administrador');
        this.usuarioPorEditar.roles.splice(index,1)
        this.adminService.eliminarAdmin(this.usuarioPorEditar.id).pipe(takeUntil(this._unsubscribeAll)).subscribe(
          (res: any) =>{
          console.log(res);
          })
      }
    }


    if(this.updateForm.value.rolAsistenteAcademica){
      if(!this.usuarioPorEditar.roles.includes('AsistenteAcademica')){
        // si no tiene rol secretaria. crearlo
        this.usuarioPorEditar.roles=[... this.usuarioPorEditar.roles,'AsistenteAcademica'];
        this.adminService.crearAsistenteAcademica(this.usuarioPorEditar.id).pipe(takeUntil(this._unsubscribeAll)).subscribe(
        (res: any) =>{
        console.log(res);
        })
      }else {
        // actualizar rol secretaria
      }
      if(!this.usuarioPorEditar.roles.includes('ComisionTitulacionPractica')){  
        // crear rol ctp
          this.usuarioPorEditar.roles= [... this.usuarioPorEditar.roles, 'ComisionTitulacionPractica'];
          this.adminService.crearComisionTitulacion(this.usuarioPorEditar.id, false).pipe(takeUntil(this._unsubscribeAll)).subscribe(
        (res: any) =>{
        console.log(res);
        })
      }else{
        // actualizar ctp
        this.adminService.actualizarComisionTitulacion(this.usuarioPorEditar.id, false).pipe(takeUntil(this._unsubscribeAll)).subscribe(
          (res: any) =>{
            console.log(res);
          })
      }
    }else{
      // si form no tiene asistente hay que borrarle el rol
        if(this.usuarioPorEditar.roles.includes('AsistenteAcademica')){
          const index = this.usuarioPorEditar.roles.indexOf('AsistenteAcademica');
          this.usuarioPorEditar.roles.splice(index,1)
          this.adminService.eliminarAsistenteAcademica(this.usuarioPorEditar.id).pipe(takeUntil(this._unsubscribeAll)).subscribe(
          (res: any) =>{
            console.log(res);
          })
        }       
        // if(this.usuarioPorEditar.roles.includes('ComisionTitulacionPractica')){
        //   const index = this.usuarioPorEditar.roles.indexOf('ComisionTitulacionPractica');
        //   this.usuarioPorEditar.roles.splice(index,1)
        //   this.adminService.eliminarComisionTitulacion(this.usuarioPorEditar.id).pipe(takeUntil(this._unsubscribeAll)).subscribe(
        //   (res: any) =>{
        //     console.log(res);
        //   })
        // }    
        
    }

    if(this.updateForm.value.rolEncargadoPracticaTitulacion){ 
      if(!this.usuarioPorEditar.roles.includes('EncargadoPracticaTitulacion')){
        this.usuarioPorEditar.roles= [... this.usuarioPorEditar.roles, 'EncargadoPracticaTitulacion']
        this.adminService.crearEncargadoPracticaCP(this.usuarioPorEditar.id).pipe(takeUntil(this._unsubscribeAll)).subscribe(
        (res: any) =>{
        console.log(res);
        })
      }
      if(!this.usuarioPorEditar.roles.includes('ComisionTitulacionPractica')){
        this.usuarioPorEditar.roles= [... this.usuarioPorEditar.roles, 'ComisionTitulacionPractica'];
        this.adminService.crearComisionTitulacion(this.usuarioPorEditar.id, false).pipe(takeUntil(this._unsubscribeAll)).subscribe(
        (res: any) =>{
        console.log(res);
        })
      }else{
        // actualizar comision tp
        this.adminService.actualizarComisionTitulacion(this.usuarioPorEditar.id, false).pipe(takeUntil(this._unsubscribeAll)).subscribe(
          (res: any) =>{
            console.log(res);
          })
      }
    }else{
      // revisar si tiene rol encargado y si si, borrarlo
      if(this.usuarioPorEditar.roles.includes('EncargadoPracticaTitulacion')){
        const index = this.usuarioPorEditar.roles.indexOf('EncargadoPracticaTitulacion');
        this.usuarioPorEditar.roles.splice(index,1)
        this.adminService.eliminarEncargadoPracticaCP(this.usuarioPorEditar.id).pipe(takeUntil(this._unsubscribeAll)).subscribe(
        (res: any) =>{
          console.log(res);
        })
      }
      // if(this.usuarioPorEditar.roles.includes('ComisionTitulacionPractica')){
      //   const index = this.usuarioPorEditar.roles.indexOf('ComisionTitulacionPractica');
      //   this.usuarioPorEditar.roles.splice(index,1)
      //   this.adminService.eliminarComisionTitulacion(this.usuarioPorEditar.id).pipe(takeUntil(this._unsubscribeAll)).subscribe(
      //   (res: any) =>{
      //     console.log(res);
      //   })
      // }

    }

    if(this.updateForm.value.rolJefeCarrera){ 
      if(!this.usuarioPorEditar.roles.includes('JefeCarrera')){
        this.usuarioPorEditar.roles= [... this.usuarioPorEditar.roles, 'JefeCarrera']
        this.adminService.crearComisionTitulacion(this.usuarioPorEditar.id, true).pipe(takeUntil(this._unsubscribeAll)).subscribe(
          (res: any) =>{
          console.log(res);
          }
        ) 
        if(!this.usuarioPorEditar.roles.includes('ComisionTitulacionPractica')){
          this.usuarioPorEditar.roles= [... this.usuarioPorEditar.roles, 'ComisionTitulacionPractica'];
          this.adminService.crearComisionTitulacion(this.usuarioPorEditar.id, false).pipe(takeUntil(this._unsubscribeAll)).subscribe(
          (res: any) =>{
          console.log(res);
          })
        }
      }else{
        // actualizar jefe de carrera
        this.adminService.actualizarComisionTitulacion(this.usuarioPorEditar.id, true).pipe(takeUntil(this._unsubscribeAll)).subscribe(
          (res: any) =>{
          console.log(res);
          }
        ) 

      }
      // if(!this.usuarioPorEditar.roles.includes('ComisionTitulacionPractica')){
      //   this.usuarioPorEditar.roles= [... this.usuarioPorEditar.roles, 'ComisionTitulacionPractica'];
      // }
    }else{
      // eliminar si ya tiene el rol
      if(!this.usuarioPorEditar.roles.includes('AsistenteAcademica' || 'Encargado'))
      if(this.usuarioPorEditar.roles.includes('ComisionTitulacionPractica')){
        const index = this.usuarioPorEditar.roles.indexOf('ComisionTitulacionPractica');
        this.usuarioPorEditar.roles.splice(index,1)
        this.adminService.eliminarComisionTitulacion(this.usuarioPorEditar.id).pipe(takeUntil(this._unsubscribeAll)).subscribe(
        (res: any) =>{
          console.log(res);
        })
      }
    }  

    // PROFESOR CC LISTO
    if(this.updateForm.value.rolProfesorCC){ 
      if(!this.usuarioPorEditar.roles.includes('ProfesorCC')){
        this.usuarioPorEditar.roles= [... this.usuarioPorEditar.roles, 'ProfesorCC']
        this.adminService.crearProfesorCC(this.profesorCC).pipe(takeUntil(this._unsubscribeAll)).subscribe(
          (res: any) =>{
          console.log(res);
          })
      }else{
         // ACTUALIZAR
         this.adminService.actualizarProfesorCC(this.profesorCC).pipe(takeUntil(this._unsubscribeAll)).subscribe(
          (res: any) =>{
          console.log( res);
          })
      }
    }else{
       // REVISAR SI TIENE ROL Y SI LO TIENE BORRAR.
       if(this.usuarioPorEditar.roles.includes('ProfesorCC')){

        const index = this.usuarioPorEditar.roles.indexOf('ProfesorCC');
        this.usuarioPorEditar.roles.splice(index,1)
        this.adminService.eliminarProfesorCC(this.usuarioPorEditar.id).pipe(takeUntil(this._unsubscribeAll)).subscribe(
        (res: any) =>{
        console.log(res);
        })
       }
    }

    // PROFESOR GUIA CP LISTO
    if(this.updateForm.value.rolProfesorGuiaCP){ 
      if(!this.usuarioPorEditar.roles.includes('ProfesorGuiaCP')){
        this.usuarioPorEditar.roles= [... this.usuarioPorEditar.roles, 'ProfesorGuiaCP']
        this.adminService.crearProfesorGuiaCP(this.profesorGuiaCP).pipe(takeUntil(this._unsubscribeAll)).subscribe(
        (res: any) =>{
        console.log(res);
        })
     }else{
      // actualizar
      this.adminService.actualizarProfesorGuiaCP(this.profesorGuiaCP).pipe(takeUntil(this._unsubscribeAll)).subscribe(
        (res: any) =>{
        console.log(res);
        })
     }
   }else{
    // revisar si tiene rol y si lo tiene borrar
    if(this.usuarioPorEditar.roles.includes('ProfesorGuiaCP')){
      const index = this.usuarioPorEditar.roles.indexOf('ProfesorGuiaCP');
        this.usuarioPorEditar.roles.splice(index,1)
      this.adminService.eliminarProfesorGuiaCP(this.usuarioPorEditar.id).pipe(takeUntil(this._unsubscribeAll)).subscribe(
        (res: any) =>{
        console.log(res);
        })
    }
   }




       

    


    // this.usuario.confirmPassword = this.usuarioForm.value.password;
    
    

    // console.log('form value',this.updateForm.value)

    console.log('user por editar value',this.usuarioPorEditar)
    this.adminService.actualizarUsuario(this.usuarioPorEditar).pipe(takeUntil(this._unsubscribeAll)).subscribe((x)=>{
      if(!x){
        // alerta agregar
        // console.log('todo mal');
      }
      // alerta agregar
      // console.log('todo bien');

      
    })
  }

  eliminarEstudiante(idUser: any){
    this.adminService.eliminarEstudiantePorIdUsuario(idUser).pipe(takeUntil(this._unsubscribeAll)).subscribe((x: any)=>{
      console.log('respuesta de eliminar estudiante',x);
    })
  }

}
