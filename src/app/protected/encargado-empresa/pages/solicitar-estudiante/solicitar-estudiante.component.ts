import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../auth/services/auth.service';
import { EncargadoEmpresa } from '../../../../auth/interfaces/encargadoEmpresa.interface';
import { AdministradorService } from '../../../administrador/services/administrador.service';
import { User } from '../../../../auth/interfaces/user.interface';
import { UsuarioLog } from '../../../../auth/interfaces/usuarioLog.interface';
import { Subject, takeUntil } from 'rxjs';
import { Empresa } from '../../../../auth/interfaces/empresa.interface';
import { EncargadoTitulacionPracticaService } from '../../../encargado-practica-titulacion/encargado-titulacion-practica.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SolicitudEstudiante } from 'src/app/auth/interfaces/documentos/solicitudEstudiante.interface';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-solicitar-estudiante',
  templateUrl: './solicitar-estudiante.component.html',
  styleUrls: ['./solicitar-estudiante.component.css']
})
export class SolicitarEstudianteMenuComponent implements OnInit {

  encargadoEmpresaLog!: EncargadoEmpresa;
  usuarioLogeado!: UsuarioLog;
  empresaLog!: Empresa;
  solicitarEstudianteForm: FormGroup = this.fb.group({
    nombreProyecto: ['', Validators.required],
    problemaResolver: ['', Validators.required],
    area: ['', Validators.required],
    solucion: ['', Validators.required],
    entregableFinal: ['', Validators.required],
    importancia: ['', Validators.required],
    plazo: ['', Validators.required],
    infoAdicional: ['',],
    disposicionMonetaria: ['', Validators.required],
    modalidad: ['', Validators.required],
  })

  newSolicitud!: SolicitudEstudiante

  modalidades = [
    { id:0, name: 'Práctica pre-profesional'},
    { id:1, name: 'Capstone project (Proyecto de Titulación)'},
    { id:2, name: 'Por definir (que quede a elección del encargado de práctica y titulación de la universidad)'}
  ];


  private _unsubscribeAll: Subject<any>;

  constructor(
    private fb: FormBuilder,
    private authS: AuthService,
    private adminS: AdministradorService,
    private router: Router,
    private encargadoS: EncargadoTitulacionPracticaService
    ) {
      this._unsubscribeAll = new Subject();
      this.usuarioLogeado = this.authS.usuario;
      this.adminS.obtenerEncargadoEmpresaPorIdUsuario(this.usuarioLogeado.id)
        .pipe(takeUntil(this._unsubscribeAll)).subscribe((encargado)=>{
          this.encargadoEmpresaLog = encargado;
          console.log(this.encargadoEmpresaLog)
          this.encargadoS.obtenerEmpresa(this.encargadoEmpresaLog.id_empresa)
            .pipe(takeUntil(this._unsubscribeAll)).subscribe((empresa: any)=>{
              this.empresaLog = empresa.empresa;
              console.log(this.empresaLog)
            })

        })

     }

  ngOnInit(): void {
  }
  ngOnDestroy(): void {

    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

  solicitarEstudiante(){

    Swal.fire({
     title: '¿Esta seguro de querer registrar este contacto?',
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

       this.newSolicitud = this.solicitarEstudianteForm.getRawValue();
       this.newSolicitud.id_encargadoEmpresa = this.encargadoEmpresaLog.id_encargadoEmpresa;
      console.log(this.newSolicitud)
       if(this.newSolicitud.id_encargadoEmpresa){
         // console.log(this.newSolicitud);

         this.authS.crearSolicitudEstudiante(this.newSolicitud).subscribe((resp)=>{
         if(resp.ok){
         Swal.fire('Se ha registrado su solicitud, pronto será evaluada por el DISC.', '', 'success');
         this.router.navigateByUrl('/auth/login')
         }else{
         Swal.fire(resp.msg, '', 'error')
 
         }
         })
       }else{
         Swal.fire('Debe registrarse para poder enviar una solicitud.', '', 'error')
       }
     }else if(result.isDenied){
       return
     }else{
       return
     }
   
   })
 
 }

}
