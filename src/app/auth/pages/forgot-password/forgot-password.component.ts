import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  
  emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";

  forgotForm: FormGroup = this.fb.group({
    correo: [, [Validators.pattern(this.emailPattern), Validators.required]]
  })


  constructor(private fb: FormBuilder, private authService: AuthService) { }

  ngOnInit(): void {
  }

  campoEsValido(campo: string){
    return this.forgotForm.controls[campo].errors && this.forgotForm.controls[campo].touched;
  }

  recuperarPassword(){
    
    if(this.forgotForm.invalid){
      this.forgotForm.markAllAsTouched();
      return;
    }


    // implementar alertas
    // implementar if si no existe correo
    // implementar pipe y unsuscribe;
    // console.log('form: ',this.forgotForm.value.correo);

    this.authService.forgotPassword(this.forgotForm.value.correo).subscribe((resp) => {
     

    })


  }

}
