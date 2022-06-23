import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';

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
    
      Swal.fire({
      title: '¿Está seguro de seguir?',
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: 'Si',
      denyButtonText: 'No',
      customClass: {
        actions: 'my-actions',
        cancelButton: 'order-1 right-gap',
        confirmButton: 'order-2',
        denyButton: 'order-3',
      }
    }).then((result) => {
      if (result.isConfirmed) {
        if(this.forgotForm.invalid){
          this.forgotForm.markAllAsTouched();
          return;
        }
        console.log('form: ',this.forgotForm.value.correo);

        this.authService.forgotPassword(this.forgotForm.value.correo).subscribe((resp) => {
        console.log(resp);
        Swal.fire('Se te ha enviado un correo, por favor sigue las indicaciones', '', 'success');
    })
        
      } else if (result.isDenied) {
        Swal.fire('No se ha realizado ningún cambio', '', 'info')
      }
    })
    
    /**
     * intento de codigo de comprobar si existe correo
    const { correo }= this.forgotForm.value;

    this.authService.comprobarCorreo(correo).subscribe( ok => {

      console.log(ok);

      if(ok === true){
        Swal.fire('correo existe!', '', 'success');
      }else {
        //mostrar mensaje de error
        Swal.fire(ok.message, ok, 'error');
      }
    })*/

    

    // implementar if si no existe correo
    // implementar pipe y unsuscribe;
    


  }

}
