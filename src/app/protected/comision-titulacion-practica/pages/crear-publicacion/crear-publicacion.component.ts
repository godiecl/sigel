import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';
import { AuthService } from '../../../../auth/services/auth.service';
import { UsuarioLog } from '../../../../auth/interfaces/usuarioLog.interface';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Publicacion } from '../../../../auth/interfaces/documentos/publicacion.interface';
import { ComisionTitulacionPracticaService } from '../../comision-titulacion-practica.service';
import { takeUntil } from 'rxjs';
import { AdministradorService } from '../../../administrador/services/administrador.service';
import { PublicacionModel } from '../../../../auth/models/documentos/publicacion.model';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crear-publicacion',
  templateUrl: './crear-publicacion.component.html',
  styleUrls: ['./crear-publicacion.component.css']
})
export class CrearPublicacionComponent implements OnInit {

  private _unsubscribeAll: Subject<any>;
  usuariolog!: UsuarioLog;
  publicacionNueva!: Publicacion;
  id_comisionPracticaTitulacion!: any;
  // remitente!: string;
  // apellidos!: string;
  nombre!: string ;
  // espacio: string = " ";

  publicacionForm: FormGroup = this.fb.group({
    asunto: ['', [Validators.required]],
    mensaje: ['', [Validators.required]],
  })

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private ctp: ComisionTitulacionPracticaService,
    private admin: AdministradorService,
    private router: Router,
  ) {
    this._unsubscribeAll = new Subject();
    this.usuariolog = this.authService.usuario;
    this.nombre = this.usuariolog.nombre;
    this.nombre = this.nombre.concat(" ");
    this.nombre = this.nombre.concat(this.usuariolog.apellidop!);
    this.nombre = this.nombre.concat(" ");
    this.nombre = this.nombre.concat(this.usuariolog.apellidom!);
    // this.apellidos = this.usuariolog.apellidop!;
    // this.apellidos = this.apellidos.concat(this.nombre);
    // this.apellidos = this.apellidos.concat(" ");
    // this.apellidos = this.apellidos.concat(this.usuariolog.apellidom!);
    // console.log(this.nombre)
    // this.remitente = this.remitente.concat(this.apellidos);
    this.admin.obtenerComisionTitulacion(this.usuariolog.id).subscribe((resp)=>{
      // // console.log('resp obtener', resp)
      this.id_comisionPracticaTitulacion  = resp.comision.id_comisionPracticaTitulacion;
    })
    
   }

  ngOnInit(): void {
    // console.log(' usuario logeado ',this.usuariolog)
    // OBTENER ID DE COMISION DE TITULACION Y PRÁCTICA PARA ENVIARSELA A LA PUBLICACION
    
  }

  

  ngOnDestroy(): void {

    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

  crearPublicacion(): void{

    // // console.log(this.publicacionForm.value)
    
    this.publicacionNueva = new PublicacionModel(
      0, this.nombre, this.publicacionForm.value.asunto, this.publicacionForm.value.mensaje,
      this.id_comisionPracticaTitulacion
    )

    // this.publicacionNueva.asunto = this.publicacionForm.value.asunto;
    // this.publicacionNueva.mensaje = this.publicacionForm.value.mensaje;
    // this.publicacionNueva.remitente = this.usuariolog.nombre;

    // console.log('publicacion nueva',this.publicacionNueva);

    this.ctp.crearPublicacion(this.publicacionNueva).pipe(takeUntil(this._unsubscribeAll)).subscribe((resp)=>{
      // // console.log('resp de crear pub',resp);

      if(resp.ok){
        Swal.fire('Se ha realizado la publicación.', '', 'success');
        this.router.navigateByUrl('/dashboard/comision-titulacion-practica/administrar-publicaciones')
      }
    })
  }

}
