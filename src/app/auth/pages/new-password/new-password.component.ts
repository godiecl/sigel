import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.css']
})
export class NewPasswordComponent implements OnInit {

  newPasswordForm: FormGroup = this.fb.group({
    newPassword: ['', [Validators.required, Validators.minLength(4)]],
    confirmPassword: ['', [Validators.required, Validators.minLength(4),]]
  }, 
    
    )

  mostrarAvisoSonDistintas: boolean = false;
  token!: string | null;

  constructor(
    private fb: FormBuilder,
    private authservice: AuthService,
    private router: ActivatedRoute,
    private rr: Router
  ) { 

   
  }

  ngOnInit(): void {
   
  }

  // funcion para mostrar mensajes de error en campos de formulario
  campoEsValido(campo: string){
    return this.newPasswordForm.controls[campo].errors && this.newPasswordForm.controls[campo].touched;
  }

  cambiarPassword(){
    // implementar alertas
    // 

    if(this.newPasswordForm.invalid){
      this.newPasswordForm.markAllAsTouched();
      return;
    }

    if(this.newPasswordForm.value.newPassword != this.newPasswordForm.value.confirmPassword){
      this.mostrarAvisoSonDistintas = true;
      return;
    }else{
      this.mostrarAvisoSonDistintas = false;
    }

    const routeParams = this.router.snapshot.paramMap;
    this.token = routeParams.get('token');

    this.authservice.cambiarPassword(this.newPasswordForm.value.newPassword, this.token ).subscribe((resp)=>{
      console.log(resp);
      Swal.fire('Se ha cambiado la contraseña exitosamente', '', 'success');
      this.rr.navigateByUrl('/auth/login')

    })

  
  }

}
