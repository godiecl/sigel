import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';
import { AuthService } from '../../../../auth/services/auth.service';
import { UsuarioLog } from '../../../../auth/interfaces/usuarioLog.interface';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Publicacion } from '../../../../auth/interfaces/documentos/publicacion.interface';
import { ComisionTitulacionPracticaService } from '../../comision-titulacion-practica.service';
import { takeUntil } from 'rxjs';
import { AdministradorService } from '../../../administrador/services/administrador.service';

@Component({
  selector: 'app-crear-publicacion',
  templateUrl: './crear-publicacion.component.html',
  styleUrls: ['./crear-publicacion.component.css']
})
export class CrearPublicacionComponent implements OnInit {

  private _unsubscribeAll: Subject<any>;
  usuariolog!: UsuarioLog;
  publicacionNueva!: Publicacion;

  publicacionForm: FormGroup = this.fb.group({
    asunto: ['', [Validators.required]],
    mensaje: ['', [Validators.required]],
  })

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private ctp: ComisionTitulacionPracticaService,
    private admin: AdministradorService,
  ) {
    this._unsubscribeAll = new Subject();
    this.usuariolog = this.authService.usuarioLogeado;
   }

  ngOnInit(): void {
    console.log(' usuario logeado ',this.usuariolog)
    // OBTENER ID DE COMISION DE TITULACION Y PRÁCTICA PARA ENVIARSELA A LA PUBLICACION
  }

  ngOnDestroy(): void {

    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

  crearPublicacion(): void{
    this.publicacionNueva = this.publicacionForm.getRawValue();
    this.publicacionNueva.remitente = this.usuariolog.nombre;

    this.ctp.crearPublicacion(this.publicacionNueva).pipe(takeUntil(this._unsubscribeAll)).subscribe((resp)=>{
      console.log('resp de crear pub',resp);
    })
  }

}
