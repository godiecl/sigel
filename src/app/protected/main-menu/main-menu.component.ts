import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/services/auth.service';
import { UsuarioLog } from '../../auth/interfaces/usuarioLog.interface';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.css']
})
export class MainMenuComponent implements OnInit {

  usuarioLog!: UsuarioLog;
  esAdmin: boolean = false;
  esEncargadoDePractica: boolean = false;
  esComisionTitulacionPractica: boolean = false;
  esEstudiante: boolean = false;
  esEncargadoEmpresa: boolean = false;
  esSecretaria: boolean = false;
  esProfesorCC: boolean = false;
  
  constructor(private router: Router, private authS: AuthService) {
    this.usuarioLog = this.authS.usuario
    if(this.usuarioLog.roles?.includes('Administrador')){
      this.esAdmin = true;
    }
    if(this.usuarioLog.roles?.includes('EncargadoPracticaTitulacion')){
      this.esEncargadoDePractica = true;
    }
    if(this.usuarioLog.roles?.includes('ComisionTitulacionPractica')){
      this.esComisionTitulacionPractica = true;
    }
    if(this.usuarioLog.roles?.includes('Estudiante')){
      this.esEstudiante = true;
    }
    if(this.usuarioLog.roles?.includes('EncargadoEmpresa')){
      this.esEncargadoEmpresa = true;
    }
    if(this.usuarioLog.roles?.includes('AsistenteAcademica')){
      this.esSecretaria = true;
    }
    if(this.usuarioLog.roles?.includes('ProfesorCC')){
      this.esProfesorCC = true;
    }

   }

  ngOnInit(): void {

  }

  // ADMINISTRADOR

  eliminarUsuario(){
    this.router.navigateByUrl('/dashboard/delete-usuario')
  }
  registrarUsuario(){
    this.router.navigateByUrl('/dashboard/register-usuario')
  }
  editarUsuario(){
    this.router.navigateByUrl('/dashboard/edit-usuario')
  }

  uploadContenido(){
    this.router.navigateByUrl('/dashboard/upload-contenido')
  }
  downloadDocument(){
    this.router.navigateByUrl('/dashboard/download-document')
  }

  // COMISION TITULACION PRACTICA
  verConformarCC(){
    this.router.navigateByUrl('/dashboard/comision-titulacion-practica/crear-comision-correccion')
  }
  administrarPublicaciones(){
    this.router.navigateByUrl('/dashboard/comision-titulacion-practica/administrar-publicaciones')
  }
  verRegistroDatosPractica(){
    this.router.navigateByUrl('/dashboard/comision-titulacion-practica/registro-datos-practica')
  }

  // ENCARGADO EMPRESA
  verEvaluarEstudiante(){
    this.router.navigateByUrl('/dashboard/encargado-empresa/evaluar-estudiante')
  }
  responderCartaVacante(){
    this.router.navigateByUrl('/dashboard/encargado-empresa/responder-carta-vacante')
  }
  irSolicitarEstudiante(){
    this.router.navigateByUrl('/dashboard/encargado-empresa/solicitar-estudiante')
  }

  // ESTUDIANTE
  verListaVacantes(){
    this.router.navigateByUrl('/dashboard/estudiante/ver-lista-vacantes')
  }
  solicitarCartaVacante(){
    this.router.navigateByUrl('/dashboard/estudiante/solicitar-carta-vacante')
  }
  verSubirInforme(){
    this.router.navigateByUrl('/dashboard/estudiante/upload-informe')
  }
  verPublicaciones(){
    this.router.navigateByUrl('/dashboard/estudiante/ver-publicaciones')
  }
  
  // ENCARGADO PRACTICA
  verSolicitudesEstudiante(){
    this.router.navigateByUrl('/dashboard/encargado-practica/ver-solicitudes-estudiante')
  }

  // SECRETARIA
  autorizarCartaVacante(){
    this.router.navigateByUrl('/dashboard/secretaria/autorizar-carta-vacante')
  }
  verControlarSeguros(){
    this.router.navigateByUrl('/dashboard/secretaria/controlar-seguros')
  }
  verHemeroteca(){
    this.router.navigateByUrl('/dashboard/secretaria/hemeroteca')
  }
  // PROFESOR CC
  verDescargarInforme(){
    this.router.navigateByUrl('/dashboard/comision-correccion-practica/download-informe')
  }
  verEvaluarDefensa(){
    this.router.navigateByUrl('/dashboard/comision-correccion-practica/evaluar-defensa')
  }
}
 