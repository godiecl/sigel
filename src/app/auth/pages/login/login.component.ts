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

  login(){

    if(this.loginForm.invalid)
    {
      this.loginForm.markAllAsTouched();
      return;
    }
    const { correo, password }= this.loginForm.value;

    this.authService.login(correo, password).subscribe( ok => {

      console.log(ok);

      if(ok === true){
        this.router.navigateByUrl('/dashboard/main-menu');
      }else{
        //mostrar mensaje de error
        Swal.fire('Error', ok, 'error');
      }
    })

    // 
  }


}
