import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AuthService } from '../../../../auth/services/auth.service';
import { UsuarioLog } from '../../../../auth/interfaces/usuarioLog.interface';
import { AdministradorService } from '../../../administrador/services/administrador.service';
import { EncargadoTitulacionPracticaService } from '../../../encargado-practica-titulacion/encargado-titulacion-practica.service';
import { Subject, takeUntil } from 'rxjs';
import { Empresa } from 'src/app/auth/interfaces/empresa.interface';
import { EncargadoEmpresaService } from '../../encargado-empresa.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { VerCartaDialogComponent } from './ver-carta-dialog/ver-carta-dialog.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-responder-carta-solicitud',
  templateUrl: './responder-carta-solicitud.component.html',
  styleUrls: ['./responder-carta-solicitud.component.css']
})
export class ResponderCartaSolicitudComponent implements OnInit {

  private _unsubscribeAll: Subject<any>;
  usuarioLog!: UsuarioLog;
  empresaLog!: Empresa;
  listaResponder!: [];
  displayedColumns!: string[];

  estados: string []= ['pendiente', 'aprobado', 'reprobado'];

  constructor(
    private authS: AuthService,
    private adminS: AdministradorService,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private encargadoPS: EncargadoTitulacionPracticaService,
    private encargadoES: EncargadoEmpresaService,
    public dialog: MatDialog,
  ) { 
    
    this._unsubscribeAll = new Subject();
  }

  ngOnInit(): void {
    
    this.usuarioLog = this.authS.usuario;
    let id_encemp: any;
    this.adminS.obtenerEncargadoEmpresaPorIdUsuario(this.usuarioLog.id)
      .pipe(takeUntil(this._unsubscribeAll)).subscribe((encargadoEmp)=>{
        id_encemp = encargadoEmp.id_encargadoEmpresa;
        this.encargadoES.getListaResponderCartaVacante(encargadoEmp.id_encargadoEmpresa).subscribe((res)=>{
          console.log(res);
          this.listaResponder = res;
          this.displayedColumns = ['nombreProyecto', 'nombreEstudiante', 'periodoRealizar', 'anio','estado', 'enviarCorreo',  ]
        })

        // this.encargadoPS.obtenerEmpresa(encargadoEmp.id_empresa).subscribe((empresa)=>{
        //   this.empresaLog = empresa;
        // })

      })
    this.encargadoES.Refreshrequider.subscribe((response)=>{
      this.encargadoES.getListaResponderCartaVacante(id_encemp).subscribe((res)=>{
        console.log(res);
        this.listaResponder = res;
      })
    })
  }

  ngOnDestroy(): void {

    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

  isRoute(route: string){
    // // console.log('route ',route);
    // // console.log('ruta del ruter', this.router.url)
    if(this.router.url === route){
      return true
    }
    return false;
  }

  verSolicitud(id: string){

    this.encargadoES.getSolicitudCartaVacante(id).subscribe((resp:any)=>{
      if(resp.ok){
        const dialogRef = this.dialog.open(VerCartaDialogComponent,{
          data:  resp,
          width: '800px', 
        })

        dialogRef.afterClosed().subscribe((respuesta)=>{
          if(respuesta){
            console.log('respuesta dialog: ',respuesta);
            const data = {
              id_solicitudCartaVacante: id,
              fechaInicio: respuesta.fechaInicio,
              fechaFinal: respuesta.fechaFinal,
            }
            this.encargadoES.responderSolicitudCartaVacante(data).pipe(takeUntil(this._unsubscribeAll)).subscribe(
              (bool:any)=>{
                if(bool.ok){
                  Swal.fire('Se ha respondido exitosamente la solicitud de vacante.','', 'success')
                  let actualizar: any = this.listaResponder.find((obj:any)=>{
                    return obj.id_solicitudCartaVacante === id;
                  })
                  actualizar.estadoRespuesta === 'completado';
                  console.log('solicitud completada:',actualizar)
                  this.cdr.detectChanges();

                }else{
                  Swal.fire(bool.msg,'','error');
                }
              }
            )
          }
        })
        
      }
    })

    
    // const url =`/dashboard/encargado-empresa/responder-carta-vacante/${id}`
    // // // console.log('si', url)
    // this.router.navigateByUrl(url)
  }

}
