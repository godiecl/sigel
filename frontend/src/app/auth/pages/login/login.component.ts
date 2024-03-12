import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import Swal  from 'sweetalert2';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {

  
  emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";

  constructor(private fb: FormBuilder,
              private router: Router,
              private authService: AuthService) { }

  loginForm: FormGroup = this.fb.group({
    correo: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
    password: ['', [Validators.required]]
  })

  campoEsValido(campo: string){
    return this.loginForm.controls[campo].errors && this.loginForm.controls[campo].touched;
  }

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

  login(){

    if(this.loginForm.invalid)
    {
      this.loginForm.markAllAsTouched();
      return;
    }
    const { correo, password }= this.loginForm.value;

    this.authService.login(correo, password).subscribe( ok => {

      // console.log(ok);

      if(ok === true){
        this.router.navigateByUrl('/dashboard/main-menu');
      }else {
        //mostrar mensaje de error
        Swal.fire(ok.message, ok, 'error');
      }
    })

    // 
  }


}
