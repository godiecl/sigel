import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  registrarEmpresa(){

    Swal.fire({ title: '¿Es primera vez que registra su empresa?, <br> Recuerda que si ya tienes una cuenta, debes iniciar sesión para solicitar un estudiante',
    showDenyButton: true, 
    icon: 'warning',
    showCancelButton: true, 
    confirmButtonText: 'Si, es primera vez que registro mi empresa', 
    denyButtonText:'No, tengo mi empresa registrada pero soy un contacto nuevo',
    cancelButtonText: 'Cancelar'
    }).then((result)=>{
      if(result.isConfirmed){
        this.router.navigateByUrl("/auth/register-empresa");
      }
      else if(result.isDenied){
        this.router.navigateByUrl("/auth/buscar-empresa");
      }else if(result.isDismissed){

      }
    })

    
  }
}
