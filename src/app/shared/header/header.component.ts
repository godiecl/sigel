import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/services/auth.service';
import { UsuarioLog } from '../../auth/interfaces/usuarioLog.interface';
import { AuthResponse } from '../../auth/interfaces/authResponse.interface';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public image!:string;
  routerUrl !: string;
  usuarioLogeado!: AuthResponse | null;
  isLogged$ = this.authService.isLogged$;
  // get usuario(){
  //   return this.authService.usuario;
  // }

  constructor(private router: Router, private authService: AuthService) { 
    // // console.log('hola');
    
  }

  ngOnInit(): void {
    this.authService.currentUser$.subscribe((resp)=>{
      this.usuarioLogeado = resp;
    })

    
    this.isLogged$.subscribe((resp)=>{
      console.log(resp)
    })
    // console.log('usuario log',)
  }
  isRoute(route: string){
    // // console.log('route ',route);
    // // console.log('ruta del ruter', this.router.url)
    if(this.router.url === route){
      return true
    }
    return false;
  }
  includes(route: string){
    if (this.router.url.includes(route)) 
    {  
      console.log(this.router.url.includes(route))
        return true; 
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

}
