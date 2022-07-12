import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/services/auth.service';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.css']
})
export class MainMenuComponent implements OnInit {

  constructor(private router: Router, private authS: AuthService) {
    
   }

  ngOnInit(): void {

  }

  eliminarUsuario(){
    this.router.navigateByUrl('/dashboard/delete-usuario')
  }
  
  registrarUsuario(){
    this.router.navigateByUrl('/dashboard/register-usuario')
  }

  editarUsuario(){
    this.router.navigateByUrl('/dashboard/edit-usuario')
  }

  verSolicitudesEstudiante(){
    this.router.navigateByUrl('/dashboard/encargado-practica/ver-solicitudes-estudiante')
  }
  irSolicitarEstudiante(){
    this.router.navigateByUrl('/dashboard/encargado-empresa/solicitar-estudiante')
  }
  verPublicaciones(){
    this.router.navigateByUrl('/dashboard/estudiante/ver-publicaciones')
  }
  administrarPublicaciones(){
    this.router.navigateByUrl('/dashboard/comision-titulacion-practica/administrar-publicaciones')
  }

  uploadContenido(){
    this.router.navigateByUrl('/dashboard/upload-contenido')
  }
  downloadDocument(){
    this.router.navigateByUrl('/dashboard/download-document')
  }
  uploadInforme(){
    this.router.navigateByUrl('/dashboard/upload-informe')
  }
  downloadInforme(){
    this.router.navigateByUrl('/dashboard/download-informe')
  }

  verListaVacantes(){
    this.router.navigateByUrl('/dashboard/estudiante/ver-lista-vacantes')
  }
  solicitarCartaVacante(){
    this.router.navigateByUrl('/dashboard/estudiante/solicitar-carta-vacante')
  }
  autorizarCartaVacante(){
    this.router.navigateByUrl('/dashboard/secretaria/autorizar-carta-vacante')
  }
  responderCartaVacante(){
    this.router.navigateByUrl('/dashboard/encargado-empresa/responder-carta-vacante')
  }

}
 