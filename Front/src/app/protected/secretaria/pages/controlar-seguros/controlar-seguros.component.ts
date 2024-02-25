import { Component, OnInit, OnDestroy, ChangeDetectorRef, ViewChild, AfterViewInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subject } from 'rxjs/internal/Subject';
import Swal from 'sweetalert2';
import { SecretariaService } from '../../secretaria.service';
import { takeUntil } from 'rxjs';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ModalExtenderSeguroComponent } from './modal-extender-seguro/modal-extender-seguro.component';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-controlar-seguros',
  templateUrl: './controlar-seguros.component.html',
  styleUrls: ['./controlar-seguros.component.css']
})
export class ControlarSegurosComponent implements OnInit, OnDestroy, AfterViewInit {

  seguros!: any[];
  displayedColumns!: string[];
  estado = new FormControl('');
  now= new Date();

  private _unsubscribeAll: Subject<any>;
  @ViewChild('segurosSort') segurosSort = new MatSort();
  dataSource!: MatTableDataSource<any>;
  
  estados: string []= ['pendiente', 'tramitado'];

  constructor(
    private secretariaS: SecretariaService,
    private router: Router,
    private cdr: ChangeDetectorRef,
    public dialog: MatDialog
  ) { 
    this._unsubscribeAll = new Subject();
   
  }

  ngAfterViewInit() {    
    this.dataSource.sort = this.segurosSort;
  }
  ngOnInit(): void {

    this.secretariaS.getSeguros().pipe(takeUntil(this._unsubscribeAll))
    .subscribe((data: any)=>{
      console.log('data: ',data);
      if(data.ok){

        this.seguros = data.datos;
        this.dataSource = new MatTableDataSource(this.seguros);
      }else{
        Swal.fire('No hay seguros disponibles.','','error')
        this.router.navigateByUrl('/dashboard/main-menu')
      }
      
      
    })

  this.displayedColumns = ['nombreEstudiante', 'rutEstudiante', 'periodoRealizar','anio','fechaInicio','fechaFinal','estado', 'vigencia' ,'boton2' ,'boton']

    this.secretariaS.refresh$.subscribe(()=>{//refrescar tabla
      this.secretariaS.getSeguros().subscribe(
        (resp)=>{
          console.log(resp)
          this.seguros = resp.datos;
          this.dataSource = new MatTableDataSource(this.seguros);
          // console.log(this.dataSource)
        }
      )
    });
  }


  ngOnDestroy(): void {

    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

  diasPorVencer(fecha1 : Date, fecha2: Date, id: any){

    const t1 = new Date(fecha1)
    const t2 = new Date(fecha2)

    var diff = Math.abs(t1.getTime() - t2.getTime());
    var diffDays = Math.ceil(diff / (1000 * 3600 * 24)); 
    console.log(diffDays)
    if(diffDays === 0){
      this.secretariaS.ocultarSeguro(id).pipe
    (takeUntil(this._unsubscribeAll)).subscribe((resp:any)=>{
      if(resp.ok){
        // Swal.fire(resp.msg,'','success');
        let seguroBorrar: any = this.seguros.find((seguro: any)=>{
          return seguro.id_seguro === id;
        })
        // console.log(seguroBorrar)
        seguroBorrar.vigencia = 'terminado'
        // seguroBorrar.mostrar = false;
        // this.seguros.splice(seguroBorrar,1);
        this.cdr.detectChanges();
      }
    })
    }
    return diffDays;
  }

 

  actualizar(id: number, estado: string){

    // // console.log('lleegue')

    if(estado === 'tramitado'){
      this.secretariaS.aprobarSeguro(id)
        .pipe(takeUntil(this._unsubscribeAll)).subscribe((res)=>{
          if(res.ok){
            let seguro :any = this.seguros.find((obj:any)=>{
              return obj.id_seguro === id
            })
            seguro.vigencia = 'activo';
            this.cdr.detectChanges()
            Swal.fire('Se ha actualizado el seguro exitósamente.','','success')
          }
          else{
            Swal.fire('Ha ocurrido un error','','error')
          }
        })
    }
    else if(estado === 'pendiente'){
      this.secretariaS.dejarPendienteSeguro(id)
      .pipe(takeUntil(this._unsubscribeAll)).subscribe((res)=>{
        if(res.ok){
          let seguro :any = this.seguros.find((obj:any)=>{
            return obj.id_seguro === id
          })
          seguro.vigencia = 'pendiente';
          this.cdr.detectChanges()
          Swal.fire('Se ha actualizado el seguro exitósamente.','','success')
        }
        else{
          Swal.fire('Ha ocurrido un error','','error')
        }
      })
    }
  }

  terminarVigencia(id: any, estado: string){

    if(estado === 'pendiente'){
      Swal.fire('No se puede ocultar si el seguro está pendiente','Ok','warning')
      return;
    }
    this.secretariaS.ocultarSeguro(id).pipe
    (takeUntil(this._unsubscribeAll)).subscribe((resp:any)=>{
      if(resp.ok){
        Swal.fire(resp.msg,'','success');
        let seguroBorrar: any = this.seguros.find((seguro: any)=>{
          return seguro.id_seguro === id;
        })
        // console.log(seguroBorrar)
        seguroBorrar.vigencia = 'terminado'
        // seguroBorrar.mostrar = false;
        // this.seguros.splice(seguroBorrar,1);
        this.cdr.detectChanges();
      }
    })

    
  }

  filtrar(event: Event) {
    const filtro = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filtro.trim().toLowerCase();
  } 

  extenderSeguro(id: any){

    let seguro: any = this.seguros.find((seguro: any)=>{
      return seguro.id_seguro === id;
    })

    const dialogRef = this.dialog.open(ModalExtenderSeguroComponent, {
      width: '450px',
      data: {id: id, fechaFinal: seguro.fechaFinal  }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        console.log('result del dialog',result)
        this.secretariaS.extenderSeguro(id, result).pipe(takeUntil(this._unsubscribeAll)).subscribe((resp)=>{
          console.log('respuesta extender',resp)
          if(resp.ok){
          Swal.fire('Se ha extendido el seguro exitosamente','','success')
          seguro.fechaFinal = result; 
          this.cdr.detectChanges()
          }else{
            Swal.fire('Ha ocurrido un error', resp.msg, 'error')
          }
        })
      }
    });
  }

}
