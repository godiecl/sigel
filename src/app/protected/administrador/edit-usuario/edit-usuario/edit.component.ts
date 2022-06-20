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
import { EncargadoEmpresaModel } from '../../../../auth/models/encargadoEmpresa.model';
import { AuthService } from '../../../../auth/services/auth.service';
import Swal from 'sweetalert2';

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
  mostrarAtributosEncargadoEmpresa: boolean = false;

  usuarioPorEditar!: User;
  estudianteEditar!: Estudiante  ;
  profesorCC!: any;
  profesorGuiaCP!: any;
  encargadoEmpresaEditar!: any;

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
               private authService: AuthService,
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
      if(this.usuarioPorEditar.roles.includes('EncargadoEmpresa')){
        this.router.data.subscribe(({encargadoEmpresa}) => {
          console.log('router: ',encargadoEmpresa)
          this.encargadoEmpresaEditar = encargadoEmpresa;
          this.mostrarAtributosEncargadoEmpresa = true;
        })
      }else{
        this.encargadoEmpresaEditar = new EncargadoEmpresaModel(
          0, '', '', this.usuarioPorEditar.id, 0
        )
      }
      // console.log('encargado empresa',this.encargadoEmpresaEditar)
    
  }
  // ngAfterContentInit(): void {

  //   // console.log('que onda ',this.estudianteEditar)

  //   // if(!this.estudianteEditar){
  //   //   return;
  //   // }
    
   
    
  // }

  ngOnInit():void {

    // let carreraSelect = this.estudianteEditar.carrera;
    // if(carreraSelect === 2){
    //   // carreraSelect = '';
    // }



    this.updateForm = this.fb.group({
      nombre:           [this.usuarioPorEditar.nombre, [Validators.required,]],
      apellidop:        [this.usuarioPorEditar.apellidop, [Validators.required,]],
      apellidom:        [this.usuarioPorEditar.apellidom, [Validators.required,]],
      rut:              [this.usuarioPorEditar.rut, [Validators.required,]],
      correo:           [this.usuarioPorEditar.correo, [Validators.required, Validators.pattern(this.emailPattern)]],
      rolAdministrador: [this.usuarioPorEditar.roles.includes('Administrador'), [,]],
      rolEstudiante:    [this.usuarioPorEditar.roles.includes('Estudiante'), [,]],
      correoPersonal:   [this.estudianteEditar.correoPersonal, ],
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
      disc_empresa: [this.profesorGuiaCP.disc_empresa,],
      rolEncargadoEmpresa: [this.usuarioPorEditar.roles.includes('EncargadoEmpresa'), ],
      telefonoEmpresa: [this.encargadoEmpresaEditar.telefono, ],
      cargoEncargadoEmpresa: [this.encargadoEmpresaEditar.cargo,] 
    });

    this.updateForm.valueChanges.pipe(takeUntil(this._unsubscribeAll)).subscribe( ({ rolEstudiante, rolProfesorCC, rolProfesorGuiaCP, rolEncargadoEmpresa, ...rest}) => {
      // Si el checkbox rol estudiante es true
      if(rolEstudiante){ this.mostrarAtributosEstudiante=true; }else{ this.mostrarAtributosEstudiante=false;}

      // Si el checkbox rol profesor guia capstones es true
      if(rolProfesorGuiaCP){ this.mostrarAtributosProfesorGuiaCP=true;}else{ this.mostrarAtributosProfesorGuiaCP=false;}
      
      // si es profesor de comision correccion
      if(rolProfesorCC){ this.mostrarAtributosProfesorCC=true; } else{ this.mostrarAtributosProfesorCC=false;}

      // si es encargado de empresa
      if(rolEncargadoEmpresa){ this.mostrarAtributosEncargadoEmpresa = true }else { this.mostrarAtributosEncargadoEmpresa=false; }

    } );

  }

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }
  confirmar(){
    Swal.fire({
      title: '¿Está seguro de querer editar este usuario?',
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
        this.actualizarUsuario();
        
      } else if (result.isDenied) {
        Swal.fire('Los cambios no se han guardado', '', 'info')
      }
    })

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

    this.encargadoEmpresaEditar.telefono = this.updateForm.value.telefonoEmpresa;    
    this.encargadoEmpresaEditar.cargo = this.updateForm.value.cargoEncargadoEmpresa;

    /**
     *  SI NO TIENE ROL LO CREA 
     */

    /***
        *  FALTAN METODOS DE SI ANTES TENIA ROL Y AHORA NO, QUE LOS BORRE
        */

      // si en el form tiene true el rol

      // console.log('estudiante por editar',this.estudianteEditar);
      // // console.log('PROFE CP por editar',this.profesorGuiaCP);
      // console.log('PROFE CC por editar',this.profesorCC);
      // console.log('update form', this.updateForm.value);
      console.log('encargado empresa',this.encargadoEmpresaEditar)
     if(this.updateForm.value.rolEstudiante){ 
      // revisa si lo tiene ya el usuario
      if(!this.usuarioPorEditar.roles.includes('Estudiante')){
        
        this.usuarioPorEditar.roles=[... this.usuarioPorEditar.roles,'Estudiante'];
        // si no lo tiene lo agrega y lo crea.
        this.adminService.crearEstudiante(this.estudianteEditar).pipe(takeUntil(this._unsubscribeAll)).subscribe(
            (res: any) =>{
              console.log(res);
              if(res.ok){
                // ALERTA DE SE HA CREADO ESTUDIANTE.
                Swal.fire('Se ha creado con éxito!!', '', 'success')
              }else{
                // ALERTA DE ERROR AL CREAR ESTUDIANTE
                Swal.fire('Ha ocurrido un error', '', 'error' );
              }
            }
        )}else{
          // Si lo incluye hay que actualizarlo.
          this.adminService.actualizarEstudiantePorId(this.estudianteEditar).pipe(takeUntil(this._unsubscribeAll)).subscribe(
            (res: any)=>{
              console.log(res)
              if(res.ok){
                // ALERTA DE SE HA ACTUALIZADO ESTUDIANTE
                Swal.fire('Se ha actualizado con éxito!!', '', 'success')
              }else{
                // ALERTA DE ERROR AL ACTUALIZAR ESTUDIANTE
                Swal.fire('Ha ocurrido un error', '', 'error' );
              }
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
            if(res.ok){
              // ALERTA DE SE HA ELIMINADO EL ROL ESTUDIANTE AL USUARIO.
              Swal.fire('El rol se ha eliminado con éxito del usuario!!', '', 'success')
            }else{
              // ALERTA DE HA OCURRIDO UN ERROR AL ELIMINAR ESTUDIANTE. ESTAS 6 ALERTAS DEBEN IR POR TODOS LOS ROLES CORRESPONDIENTES.
              Swal.fire('Ha ocurrido un error', '', 'error' );
            }
          })
      }
    }


    // LISTO?
    if(this.updateForm.value.rolAdministrador){
       if(!this.usuarioPorEditar.roles.includes('Administrador')){
      this.usuarioPorEditar.roles=[... this.usuarioPorEditar.roles,'Administrador'];
      this.adminService.crearAdmin(this.usuarioPorEditar.id).pipe(takeUntil(this._unsubscribeAll)).subscribe(
        (res: any) =>{
        console.log(res);
        if(res.ok){
          // ALERTA DE SE HA CREADO .
          Swal.fire('Se ha creado con éxito!!', '', 'success')
        }else{
          // ALERTA DE ERROR AL CREAR
          Swal.fire('Ha ocurrido un error', '', 'error' );
        }
        })
      }else{ // actualizar
        //falta codigo??
      } 
    }else{
      if(this.usuarioPorEditar.roles.includes('Administrador')){
        // eliminar
        const index = this.usuarioPorEditar.roles.indexOf('Administrador');
        this.usuarioPorEditar.roles.splice(index,1)
        this.adminService.eliminarAdmin(this.usuarioPorEditar.id).pipe(takeUntil(this._unsubscribeAll)).subscribe(
          (res: any) =>{
          console.log(res);
          if(res.ok){
            // ALERTA DE SE HA ELIMINADO EL ROL
            Swal.fire('El rol se ha eliminado con éxito del usuario!!', '', 'success')
          }else{
            // ALERTA DE HA OCURRIDO UN ERROR AL ELIMINAR.
            Swal.fire('Ha ocurrido un error', '', 'error' );
          }

          })
      }
    }

    // ASISTENTE ACADEMICA LISTO
    if(this.updateForm.value.rolAsistenteAcademica){
      if(!this.usuarioPorEditar.roles.includes('AsistenteAcademica')){
        // si no tiene rol secretaria. crearlo
        this.usuarioPorEditar.roles=[... this.usuarioPorEditar.roles,'AsistenteAcademica'];
        this.adminService.crearAsistenteAcademica(this.usuarioPorEditar.id).pipe(takeUntil(this._unsubscribeAll)).subscribe(
        (res: any) =>{
        console.log(res);
        })
      }else {
        // actualizar rol secretaria LISTO???
      }
      if(!this.usuarioPorEditar.roles.includes('ComisionTitulacionPractica')){  
        // crear rol ctp
          this.usuarioPorEditar.roles= [... this.usuarioPorEditar.roles, 'ComisionTitulacionPractica'];
          this.adminService.crearComisionTitulacion(this.usuarioPorEditar.id, false).pipe(takeUntil(this._unsubscribeAll)).subscribe(
        (res: any) =>{
        console.log(res);
        if(res.ok){
          // ALERTA DE SE HA CREADO.
          Swal.fire('Se ha creado con éxito!!', '', 'success')
        }else{
          // ALERTA DE ERROR AL CREAR.
          Swal.fire('Ha ocurrido un error', '', 'error' );
        }
        })
      }else{
        // actualizar ctp
        this.adminService.actualizarComisionTitulacion(this.usuarioPorEditar.id, false).pipe(takeUntil(this._unsubscribeAll)).subscribe(
          (res: any) =>{
            console.log(res);
            if(res.ok){
              // ALERTA DE SE HA ACTUALIZADO
              Swal.fire('Se ha actualizado con éxito!!', '', 'success')
            }else{
              // ALERTA DE ERROR AL ACTUALIZAR ESTUDIANTE
              Swal.fire('Ha ocurrido un error', '', 'error' );
            }
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
            if(res.ok){
              // ALERTA DE SE HA ELIMINADO EL ROL.
              Swal.fire('El rol se ha eliminado con éxito del usuario!!', '', 'success')
            }else{
              // ALERTA DE HA OCURRIDO UN ERROR AL ELIMINAR.
              Swal.fire('Ha ocurrido un error', '', 'error' );
            }
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


    // ENCARGADO DE PRACTICA LISTO
    if(this.updateForm.value.rolEncargadoPracticaTitulacion){ 
      if(!this.usuarioPorEditar.roles.includes('EncargadoPracticaTitulacion')){
        this.usuarioPorEditar.roles= [... this.usuarioPorEditar.roles, 'EncargadoPracticaTitulacion']
        this.adminService.crearEncargadoPracticaCP(this.usuarioPorEditar.id).pipe(takeUntil(this._unsubscribeAll)).subscribe(
        (res: any) =>{
        console.log(res);
        if(res.ok){
          // ALERTA DE SE HA CREADO.
          Swal.fire('Se ha creado con éxito!!', '', 'success')
        }else{
          // ALERTA DE ERROR AL CREAR.
          Swal.fire('Ha ocurrido un error', '', 'error' );
        }
        })
      }
      if(!this.usuarioPorEditar.roles.includes('ComisionTitulacionPractica')){
        this.usuarioPorEditar.roles= [... this.usuarioPorEditar.roles, 'ComisionTitulacionPractica'];
        this.adminService.crearComisionTitulacion(this.usuarioPorEditar.id, false).pipe(takeUntil(this._unsubscribeAll)).subscribe(
        (res: any) =>{
        console.log(res);
        if(res.ok){
          // ALERTA DE SE HA CREADO.
          Swal.fire('Se ha creado con éxito!!', '', 'success')
        }else{
          // ALERTA DE ERROR AL CREAR.
          Swal.fire('Ha ocurrido un error', '', 'error' );
        }
        })
      }else{
        // actualizar comision tp
        // this.adminService.actualizarComisionTitulacion(this.usuarioPorEditar.id, false).pipe(takeUntil(this._unsubscribeAll)).subscribe(
        //   (res: any) =>{
        //     console.log(res);
        //   })
      }
    }else{
      // revisar si tiene rol encargado y si si, borrarlo
      if(this.usuarioPorEditar.roles.includes('EncargadoPracticaTitulacion')){
        const index = this.usuarioPorEditar.roles.indexOf('EncargadoPracticaTitulacion');
        this.usuarioPorEditar.roles.splice(index,1)
        this.adminService.eliminarEncargadoPracticaCP(this.usuarioPorEditar.id).pipe(takeUntil(this._unsubscribeAll)).subscribe(
        (res: any) =>{
          console.log(res);
          if(res.ok){
            // ALERTA DE SE HA ELIMINADO EL ROL.
            Swal.fire('El rol se ha eliminado con éxito del usuario!!', '', 'success')
          }else{
            // ALERTA DE HA OCURRIDO UN ERROR AL ELIMINAR.
            Swal.fire('Ha ocurrido un error', '', 'error' );
          }
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

    // JEFE DE CARRERA LISTO
    if(this.updateForm.value.rolJefeCarrera){ 
      if(!this.usuarioPorEditar.roles.includes('JefeCarrera')){
        this.usuarioPorEditar.roles= [... this.usuarioPorEditar.roles, 'JefeCarrera']
        this.adminService.crearComisionTitulacion(this.usuarioPorEditar.id, true).pipe(takeUntil(this._unsubscribeAll)).subscribe(
          (res: any) =>{
          console.log(res);
          if(res.ok){
            // ALERTA DE SE HA CREADO.
            Swal.fire('Se ha creado con éxito!!', '', 'success')
          }else{
            // ALERTA DE ERROR AL CREAR.
            Swal.fire('Ha ocurrido un error', '', 'error' );
          }
          }
        ) 
        if(!this.usuarioPorEditar.roles.includes('ComisionTitulacionPractica')){
          this.usuarioPorEditar.roles= [... this.usuarioPorEditar.roles, 'ComisionTitulacionPractica'];
          // this.adminService.crearComisionTitulacion(this.usuarioPorEditar.id, false).pipe(takeUntil(this._unsubscribeAll)).subscribe(
          // (res: any) =>{
          // console.log(res);
          // })
        }
      }else{
        // actualizar jefe de carrera
        // this.adminService.actualizarComisionTitulacion(this.usuarioPorEditar.id, true).pipe(takeUntil(this._unsubscribeAll)).subscribe(
        //   (res: any) =>{
        //   console.log(res);
        //   }
        // ) 

      }
      // if(!this.usuarioPorEditar.roles.includes('ComisionTitulacionPractica')){
      //   this.usuarioPorEditar.roles= [... this.usuarioPorEditar.roles, 'ComisionTitulacionPractica'];
      // }
    }else{
      // eliminar si ya tiene el rol
      if(this.usuarioPorEditar.roles.includes('JefeCarrera')){
        const index = this.usuarioPorEditar.roles.indexOf('JefeCarrera');
        this.usuarioPorEditar.roles.splice(index,1)
      }
      if(!this.usuarioPorEditar.roles.includes('AsistenteAcademica')){
        if(!this.usuarioPorEditar.roles.includes('EncargadoPracticaTitulacion')){
          if(this.usuarioPorEditar.roles.includes('ComisionTitulacionPractica')){
            const index = this.usuarioPorEditar.roles.indexOf('ComisionTitulacionPractica');
            this.usuarioPorEditar.roles.splice(index,1)
            console.log('hola');
            this.adminService.eliminarComisionTitulacion(this.usuarioPorEditar.id).pipe(takeUntil(this._unsubscribeAll)).subscribe(
              (res: any) =>{
              console.log(res);
              if(res.ok){
                // ALERTA DE SE HA ELIMINADO EL ROL.
                Swal.fire('Se ha eliminado con éxito del usuario!!', '', 'success')
              }else{
                // ALERTA DE HA OCURRIDO UN ERROR AL ELIMINAR.
                Swal.fire('Ha ocurrido un error', '', 'error' );
              }
              })
          }
        }
      }
    }  

    // PROFESOR CC LISTO
    if(this.updateForm.value.rolProfesorCC){ 
      if(!this.usuarioPorEditar.roles.includes('ProfesorCC')){
        this.usuarioPorEditar.roles= [... this.usuarioPorEditar.roles, 'ProfesorCC']
        this.adminService.crearProfesorCC(this.profesorCC).pipe(takeUntil(this._unsubscribeAll)).subscribe(
          (res: any) =>{
          console.log(res);
          if(res.ok){
            // ALERTA DE SE HA CREADO.
            Swal.fire('Se ha creado con éxito!!', '', 'success')
          }else{
            // ALERTA DE ERROR AL CREAR.
            Swal.fire('Ha ocurrido un error', '', 'error' );
          }
          })
      }else{
         // ACTUALIZAR
         this.adminService.actualizarProfesorCC(this.profesorCC).pipe(takeUntil(this._unsubscribeAll)).subscribe(
          (res: any) =>{
          console.log( res);
          if(res.ok){
            // ALERTA DE SE HA ACTUALIZADO
            Swal.fire('Se ha actualizado con éxito!!', '', 'success')
          }else{
            // ALERTA DE ERROR AL ACTUALIZAR ESTUDIANTE
            Swal.fire('Ha ocurrido un error', '', 'error' );
          }
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
        if(res.ok){
          // ALERTA DE SE HA ELIMINADO EL ROL.
          Swal.fire('El rol se ha eliminado con éxito del usuario!!', '', 'success')
        }else{
          // ALERTA DE HA OCURRIDO UN ERROR AL ELIMINAR.
          Swal.fire('Ha ocurrido un error', '', 'error' );
        }
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
        if(res.ok){
          // ALERTA DE SE HA CREADO.
          Swal.fire('Se ha creado con éxito!!', '', 'success')
        }else{
          // ALERTA DE ERROR AL CREAR.
          Swal.fire('Ha ocurrido un error', '', 'error' );
        }
        })
     }else{
      // actualizar
      this.adminService.actualizarProfesorGuiaCP(this.profesorGuiaCP).pipe(takeUntil(this._unsubscribeAll)).subscribe(
        (res: any) =>{
        console.log(res);
        if(res.ok){
          // ALERTA DE SE HA ACTUALIZADO
          Swal.fire('Se ha actualizado con éxito!!', '', 'success')
        }else{
          // ALERTA DE ERROR AL ACTUALIZAR ESTUDIANTE
          Swal.fire('Ha ocurrido un error', '', 'error' );
        }
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
        if(res.ok){
          // ALERTA DE SE HA ELIMINADO EL ROL.
          Swal.fire('El rol se ha eliminado con éxito del usuario!!', '', 'success')
        }else{
          // ALERTA DE HA OCURRIDO UN ERROR AL ELIMINAR.
          Swal.fire('Ha ocurrido un error', '', 'error' );
        }
        })
    }
   }

   if(this.updateForm.value.rolEncargadoEmpresa){

    if(!this.usuarioPorEditar.roles.includes('EncargadoEmpresa')){
      // CREAR
      // this.usuarioPorEditar.roles= [... this.usuarioPorEditar.roles, 'EncargadoEmpresa']
      //   this.authService.crearEncargadoEmpresa(this.encargadoEmpresaEditar).pipe(takeUntil(this._unsubscribeAll)).subscribe(
      //   (res: any) =>{ console.log(res); })
      //  AQUI DEBO PONER ALERTA QUE SI QUIERE CREAR ENCARGADO DE EMPRESA VAYA A CREAR ENCARGADO DE EMPRESA.
      Swal.fire('Para poder crear un contacto de empresa, diríjase al home, en registrar empresa.', '', 'warning');

    }else{
        // ACTUALIZAR
        this.adminService.actualizarEncargadoEmpresaPorIdUsuario(this.encargadoEmpresaEditar).pipe(takeUntil(this._unsubscribeAll)).subscribe(
        (res: any) =>{
        console.log(res);
        if(res.ok){
          // ALERTA DE SE HA ACTUALIZADO
          Swal.fire('Se ha actualizado con éxito!!', '', 'success')
        }else{
          // ALERTA DE ERROR AL ACTUALIZAR ESTUDIANTE
          Swal.fire('Ha ocurrido un error', '', 'error' );
        }
        })
      }
   }else{
      // verificar si tiene el rol y si lo tiene eliminar.
      if(this.usuarioPorEditar.roles.includes('EncargadoEmpresa')){
        const index = this.usuarioPorEditar.roles.indexOf('EncargadoEmpresa');
          this.usuarioPorEditar.roles.splice(index,1)
        this.adminService.eliminarEncargadoEmpresaPorIdUsuario(this.usuarioPorEditar.id).pipe(takeUntil(this._unsubscribeAll)).subscribe(
          (res: any) =>{
            console.log(res);
            if(res.ok){
              // ALERTA DE SE HA ELIMINADO EL ROL.
              Swal.fire('El rol se ha eliminado con éxito del usuario!!', '', 'success')
            }else{
              // ALERTA DE HA OCURRIDO UN ERROR AL ELIMINAR.
              Swal.fire('Ha ocurrido un error', '', 'error' );
            }
          })
      }
   }

    // this.usuario.confirmPassword = this.usuarioForm.value.password;
    
    // console.log('form value',this.updateForm.value)

    console.log('user por editar value',this.usuarioPorEditar)
    this.adminService.actualizarUsuario(this.usuarioPorEditar).pipe(takeUntil(this._unsubscribeAll)).subscribe((x)=>{
      if(!x){
        // alerta agregar
        //¿Que alerta agregar? actualizar?
        // console.log('todo mal');
      }
      // alerta agregar
      // console.log('todo bien');
    })
  }

  eliminarEstudiante(idUser: any){
    this.adminService.eliminarEstudiantePorIdUsuario(idUser).pipe(takeUntil(this._unsubscribeAll)).subscribe((x: any)=>{
      console.log('respuesta de eliminar estudiante',x);
      //agregar alerta eliminar?
    })
  }

}
