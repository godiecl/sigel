import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';
import { SolicitudCartaVacante } from '../../../../auth/interfaces/documentos/solicitudCartaVacante';
import { SecretariaService } from '../../secretaria.service';
import { takeUntil } from 'rxjs';
import Swal from 'sweetalert2';
import { FormControl } from '@angular/forms';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-autorizar-carta-vacante',
  templateUrl: './autorizar-carta-vacante.component.html',
  styleUrls: ['./autorizar-carta-vacante.component.css']
})
export class AutorizarCartaVacanteComponent implements OnInit, OnDestroy, AfterViewInit {

  displayedColumns!: string[];
  solicitudesCartaVacante!: any[];
  estado = new FormControl('');
  @ViewChild('sort') sort = new MatSort();
  dataSource!: MatTableDataSource<any>;

  estados: string []= ['pendiente', 'aprobado', 'reprobado'];

  private _unsubscribeAll: Subject<any>;

  constructor(
    private secretariaS: SecretariaService
  ) { 
    this._unsubscribeAll = new Subject();
   }
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {

    this.secretariaS.getListaVacantes()
      .pipe(takeUntil(this._unsubscribeAll))
        .subscribe((resp)=>{
          // console.log(solicitudes)
          if(resp.ok){

            this.solicitudesCartaVacante = resp.datos;
            this.dataSource = new MatTableDataSource(this.solicitudesCartaVacante);
            this.displayedColumns = ['nombreEmpresa','rutEmpresa', 'giroEmpresa', 
            'nombreProyecto', 'cargoEncargado','nombreEncargado', 'telefonoEncargado',
            'rutEstudiante','nombreEstudiante', 'periodoRealizar','anioRealizar' ,'estado', 'enviarCorreo',  ]
          }else{
            Swal.fire('Ha ocurrido un error', resp.msg, 'error')
          }
        })

  }

  ngOnDestroy(): void {

    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

  actualizar(id: number, estado: string){

    // // console.log('lleegue')

    if(estado === 'aprobado'){
      this.secretariaS.aprobarSolicitudCartaVacante(id)
        .pipe(takeUntil(this._unsubscribeAll)).subscribe((res)=>{
          if(res.ok){
            Swal.fire('Se ha actualizado la solicitud exitósamente.','','success')
          }
          else{
            Swal.fire('Ha ocurrido un error','','error')
          }
        })
    }
    else if(estado === 'pendiente'){
      this.secretariaS.dejarPendienteSolicitudCartaVacante(id)
      .pipe(takeUntil(this._unsubscribeAll)).subscribe((res)=>{
        if(res.ok){
          Swal.fire('Se ha actualizado la solicitud exitósamente.','','success')
        }
        else{
          Swal.fire('Ha ocurrido un error','','error')
        }
      })
    }
    else if(estado === 'reprobado'){
      this.secretariaS.reprobarSolicitudCartaVacante (id)
      .pipe(takeUntil(this._unsubscribeAll)).subscribe((res)=>{
        if(res.ok){
          Swal.fire('Se ha actualizado la solicitud exitósamente.','','success')
        }
        else{
          Swal.fire('Ha ocurrido un error','','error')
        }
      })
    }

    
  }

  

  enviarCorreo(correoEncargado: string, nombreEmpresa: string){
    // console.log(correoEncargado)

    // FUNCION QUE ENVIE CORREO AL ENCARGADO QUE SE LE HAYA HECHO CLICK
    // PETICION POST ENVIANDO ID DEL CORREO ENCARGADO.
    Swal.fire({
      title: `¿Está seguro de enviar el correo a la empresa ${nombreEmpresa}?  <br> El correo del contacto es: ${correoEncargado}`,
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
        this.secretariaS.enviarCorreo(correoEncargado)
          .pipe(takeUntil(this._unsubscribeAll)).subscribe((resp)=>{
            if(resp.ok){
              Swal.fire('Se le ha notificado exitosamente.','','success');
            }else{
              Swal.fire('Ha ocurrido un error.','','error');
            }
          })
      }
      else{

      }})

  }

}
