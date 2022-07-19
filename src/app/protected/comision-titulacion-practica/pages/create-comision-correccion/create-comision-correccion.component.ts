import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/internal/Subject';
import { ComisionTitulacionPracticaService } from '../../comision-titulacion-practica.service';
import { takeUntil } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-comision-correccion',
  templateUrl: './create-comision-correccion.component.html',
  styleUrls: ['./create-comision-correccion.component.css']
})
export class CreateComisionCorreccionComponent implements OnInit, OnDestroy {

  listaComisiones!: [];
  // lol!: [];
  displayedColumns!: string[];
  private _unsubscribeAll: Subject<any>;

  constructor(
    private router: Router,
    private comisiontp: ComisionTitulacionPracticaService,
    private cdr: ChangeDetectorRef,
  ) {
    this._unsubscribeAll = new Subject();

   }
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

  ngOnInit(): void {

    
    this.comisiontp.getListaComisiones().subscribe((resp)=>{
      if(resp.ok){
      this.listaComisiones = resp.comisiones;
      console.log(this.listaComisiones)
      }else{
        Swal.fire('Ha ocurrido un error','','error')
      }
    })
    
    this.displayedColumns = ['duplasAsignadas', 'estudiantesAsignados', 'deshacer',]

    this.comisiontp.refresh$.subscribe(()=>{//refrescar tabla
      this.comisiontp.getListaComisiones().subscribe(
        (resp)=>{
          console.log(resp)
          this.listaComisiones = resp.comisiones;
        }
      )
    });
  }

  crearComision(){
    this.router.navigateByUrl('/dashboard/comision-titulacion-practica/asignar-comision-correccion')
  }

  alerta(id_comision: any){
    Swal.fire({
      title: `¿Está seguro de querer deshacer esta comisión de corrección?`,
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

        this.deshacerComision(id_comision);
        
      } else if (result.isDenied) {
        return;
      }
    })
  }

  deshacerComision(id_comisionCorreccion: any){
    this.comisiontp.eliminarComision(id_comisionCorreccion).pipe(takeUntil(this._unsubscribeAll))
    .subscribe((res)=>{
      if(res.ok){

        let comision:any = this.listaComisiones.find( (comi:any)=>{
          return comi.id_comisionCorreccion === id_comisionCorreccion
        } )
        console.log(comision)
        this.listaComisiones.splice(comision,1);
        this.cdr.detectChanges();
        

        Swal.fire('Se ha eliminado exitósamente esta comisión','','success')

      }
    })
  }

}
