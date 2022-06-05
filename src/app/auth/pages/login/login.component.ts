import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {

  
  emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";

  constructor(private fb: FormBuilder) { }

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

    console.log(this.loginForm.value);
    this.loginForm.reset();
  }


}
