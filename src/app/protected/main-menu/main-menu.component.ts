import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.css']
})
export class MainMenuComponent implements OnInit {

  constructor(private router: Router) { }

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
  uploadContenido(){
    this.router.navigateByUrl('/dashboard/upload-contenido')
  }
}
