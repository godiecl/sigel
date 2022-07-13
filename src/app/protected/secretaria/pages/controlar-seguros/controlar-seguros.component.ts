import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subject } from 'rxjs/internal/Subject';
import Swal from 'sweetalert2';
import { SecretariaService } from '../../secretaria.service';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'app-controlar-seguros',
  templateUrl: './controlar-seguros.component.html',
  styleUrls: ['./controlar-seguros.component.css']
})
export class ControlarSegurosComponent implements OnInit, OnDestroy {

  seguros!: [];
  displayedColumns!: string[];
  estado = new FormControl('');

  private _unsubscribeAll: Subject<any>;

  
  estados: string []= ['pendiente', 'tramitado'];

  constructor(
    private secretariaS: SecretariaService,
  ) { 
    this._unsubscribeAll = new Subject();
    this.secretariaS.getSeguros().pipe(takeUntil(this._unsubscribeAll))
      .subscribe((data)=>{
        console.log('data: ',data);
        this.seguros = data;
      })

    this.displayedColumns = ['nombreEstudiante', 'rutEstudiante', 'estado']
  }

  ngOnInit(): void {
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

}
