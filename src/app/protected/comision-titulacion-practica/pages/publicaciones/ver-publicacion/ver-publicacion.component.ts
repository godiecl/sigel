import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs/internal/Subject';
import { Publicacion } from '../../../../../auth/interfaces/documentos/publicacion.interface';
import { ComisionTitulacionPracticaService } from '../../../comision-titulacion-practica.service';
import { takeUntil } from 'rxjs';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { EditarPublicacionComponent } from './editar-publicacion/editar-publicacion.component';

@Component({
  selector: 'app-ver-publicacion',
  templateUrl: './ver-publicacion.component.html',
  styleUrls: ['./ver-publicacion.component.css']
})
export class VerPublicacionCTComponent implements OnInit {
  

  publicacionActual!: Publicacion;
  private _unsubscribeAll: Subject<any>;

  constructor(
    private route: ActivatedRoute, 
    private router: Router,
    private comisionS: ComisionTitulacionPracticaService,
    private cd: ChangeDetectorRef,
    public dialog: MatDialog,
    ) { 
      this._unsubscribeAll = new Subject();
    }

  ngOnInit(): void {
    this.route.data.subscribe(({publicacion}) => {
      // console.log('si',publicacion)

      this.publicacionActual= publicacion.publicacion;
    })
  }

  ngOnDestroy(): void {

    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

  editarDialog(){
    const dialogRef = this.dialog.open(EditarPublicacionComponent, {
      width: '850px',
      data: this.publicacionActual,
    });

    dialogRef.afterClosed().subscribe((data)=>{
      this.publicacionActual.asunto = data.asunto;
      this.publicacionActual.mensaje = data.mensaje;
      this.comisionS.actualizarPublicacion(this.publicacionActual).subscribe((ok)=>{
        if(ok.ok){
          Swal.fire('Se ha actualizado la publicación exitosamente.','','success');
        }else{
          Swal.fire('Ha ocurrido un error al actualizar','','error');
        }
      })

    })


  }

  borrarPublicacion(id_publicacion: any): void{

    Swal.fire({
      title: '¿Esta seguro de eliminar esta publicación?',
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
      if(result.isConfirmed){
        // Se elimina
        this.comisionS.eliminarPublicacion(id_publicacion)
          .pipe(takeUntil(this._unsubscribeAll)).subscribe((resp)=>{
            // console.log('respuesta de borrar', resp)
            if(resp.ok){
              Swal.fire('Se ha eliminado la publicación exitosamente.','','success');
              // this.router.navigateByUrl('/dashboard/comision-titulacion-practica/administrar-publicaciones')
              
            }
            })
      }else{
        return;
      }
    })

    


  }

}
