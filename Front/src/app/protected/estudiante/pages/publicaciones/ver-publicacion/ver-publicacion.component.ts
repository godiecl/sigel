import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs/internal/Subject';
import { Publicacion } from '../../../../../auth/interfaces/documentos/publicacion.interface';
import { takeUntil } from 'rxjs';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { ComisionTitulacionPracticaService } from 'src/app/protected/comision-titulacion-practica/comision-titulacion-practica.service';

@Component({
  selector: 'app-ver-publicacion',
  templateUrl: './ver-publicacion.component.html',
  styleUrls: ['./ver-publicacion.component.css']
})
export class VerPublicacionComponent implements OnInit {
  

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

}
