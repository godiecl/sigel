import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subject } from 'rxjs/internal/Subject';
import Swal from 'sweetalert2';
import { SecretariaService } from '../../secretaria.service';
import { takeUntil } from 'rxjs';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-controlar-seguros',
  templateUrl: './controlar-seguros.component.html',
  styleUrls: ['./controlar-seguros.component.css']
})
export class ControlarSegurosComponent implements OnInit, OnDestroy {

  seguros: [] = [];
  displayedColumns!: string[];
  estado = new FormControl('');

  private _unsubscribeAll: Subject<any>;
  dataSource!: MatTableDataSource<never>;
  
  estados: string []= ['pendiente', 'tramitado'];

  constructor(
    private secretariaS: SecretariaService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) { 
    this._unsubscribeAll = new Subject();
   
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

  this.displayedColumns = ['nombreEstudiante', 'rutEstudiante', 'periodoRealizar','anio','estado', 'boton']

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

  actualizar(id: number, estado: string){

    // // console.log('lleegue')

    if(estado === 'tramitado'){
      this.secretariaS.aprobarSeguro(id)
        .pipe(takeUntil(this._unsubscribeAll)).subscribe((res)=>{
          if(res.ok){
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
          return seguro.id_seguro = id;
        })
        console.log(seguroBorrar)
        seguroBorrar.mostrar = false;
        this.seguros.splice(seguroBorrar,1);
        this.cdr.detectChanges();
      }
    })

    
  }

  filtrar(event: Event) {
    const filtro = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filtro.trim().toLowerCase();
  } 

}
