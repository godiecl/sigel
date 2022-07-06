import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SolicitudEstudiante } from 'src/app/auth/interfaces/documentos/solicitudEstudiante.interface';
import { EvaluarDialog } from './dialog/evaluar-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import { EncargadoTitulacionPracticaService } from '../../../encargado-titulacion-practica.service';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-ver-solicitud',
  templateUrl: './ver-solicitud.component.html',
  styleUrls: ['./ver-solicitud.component.css']
})
export class VerSolicitudComponent implements OnInit {

  solicitudEstudiante!: SolicitudEstudiante;
  descripcion!: string;
  private _unsubscribeAll: Subject<any>;
  

  constructor(private route: ActivatedRoute, 
              public dialog: MatDialog,
              private encargadoService: EncargadoTitulacionPracticaService
              ) {
                this._unsubscribeAll = new Subject();
   }

  ngOnInit(): void {

    this.route.data.subscribe(({solicitud}) => {
      // console.log(solicitud)
      this.solicitudEstudiante= solicitud.solicitud;
    })

  }

  ngOnDestroy(): void {
    
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(EvaluarDialog, {
      width: '450px',
      data: {nombreProyecto: this.solicitudEstudiante.nombreProyecto  }
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      // console.log('The dialog was closed');
      console.log(result);


      if(result){ 
        console.log('he entrado')
        this.solicitudEstudiante.descripcionRequerimientoPractica=result.descripcionRequerimientoPractica;
        this.solicitudEstudiante.estadoAutorizacion=result.estado;
        // console.log(this.solicitudEstudiante);
        this.encargadoService.actualizarSolicitudEstudiante(this.solicitudEstudiante)
          .pipe(takeUntil(this._unsubscribeAll)).subscribe((resp) => {
            if(resp.ok){
              Swal.fire('Se ha actualizado la solicitud. ','','success')
            }
          })

      }else{
        console.log('entro aqui')
        return;
      }

    });
  }
}


