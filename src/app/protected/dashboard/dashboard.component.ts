import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [
   
  ]
})
export class DashboardComponent implements OnInit {


  mostrarBotonBack: boolean=false;
  routerUrl !: string;

  get usuario(){
    return this.authService.usuario;
  }

  constructor(private router: Router, private authService: AuthService) { 

    // this.router = routerUrl.url;
      
  }

  ngOnInit(): void {

    

  }

  isRoute(route: string){
    console.log('route ',route);
    console.log('ruta del ruter', this.router.url)
    if(this.router.url === route){
      return true
    }
    return false;
  }

  hasRoute(route: string) {
    return this.router.url.includes(route);
  }
  

  logout(){
    this.router.navigateByUrl('/auth');
    this.authService.logout();
  }

  registrarUsuario(){
    this.router.navigateByUrl('/dashboard/register-usuario');
  }

  eliminarUsuario(){
    this.router.navigateByUrl('/dashboard/delete-usuario');
  }

  volverMenu(){
    this.router.navigateByUrl('/dashboard/main-menu');
  }

}
