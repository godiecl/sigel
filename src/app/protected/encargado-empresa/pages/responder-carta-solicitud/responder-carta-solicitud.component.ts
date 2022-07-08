import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../auth/services/auth.service';
import { UsuarioLog } from '../../../../auth/interfaces/usuarioLog.interface';
import { AdministradorService } from '../../../administrador/services/administrador.service';
import { EncargadoTitulacionPracticaService } from '../../../encargado-practica-titulacion/encargado-titulacion-practica.service';
import { Subject, takeUntil } from 'rxjs';
import { Empresa } from 'src/app/auth/interfaces/empresa.interface';
import { EncargadoEmpresaService } from '../../encargado-empresa.service';
import { Router } from '@angular/router';

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
    private router: Router,
    private encargadoPS: EncargadoTitulacionPracticaService,
    private encargadoES: EncargadoEmpresaService,
  ) { 
    
    this._unsubscribeAll = new Subject();
    this.usuarioLog = this.authS.usuario;
    this.adminS.obtenerEncargadoEmpresaPorIdUsuario(this.usuarioLog.id)
      .pipe(takeUntil(this._unsubscribeAll)).subscribe((encargadoEmp)=>{

        this.encargadoES.getListaResponderCartaVacante(encargadoEmp.id_encargadoEmpresa).subscribe((res)=>{
          console.log(res);
          this.listaResponder = res;
          this.displayedColumns = ['nombreProyecto', 'nombreEstudiante', 'periodoRealizar','estado', 'enviarCorreo',  ]
        })

        // this.encargadoPS.obtenerEmpresa(encargadoEmp.id_empresa).subscribe((empresa)=>{
        //   this.empresaLog = empresa;
        // })

      })
  }

  ngOnInit(): void {

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
    const url =`/dashboard/encargado-empresa/responder-carta-vacante/${id}`
    // // console.log('si', url)
    this.router.navigateByUrl(url)
  }

}
