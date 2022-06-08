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



  get usuario(){
    return this.authService.usuario;
  }

  constructor(private router: Router, private authService: AuthService) { 

      
  }

  ngOnInit(): void {

    

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

}
