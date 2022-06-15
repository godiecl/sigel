import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.css']
})
export class NewPasswordComponent implements OnInit {

  newPasswordForm: FormGroup = this.fb.group({
    newPassword: ['', [Validators.required, Validators.minLength(4)]]
  })

  constructor(
    private fb: FormBuilder,
    private authservice: AuthService
  ) { 

  }

  ngOnInit(): void {
    console.log('HOLA')
  }

  cambiarPassword(){
    // implementar alertas
    // 
    this.authservice.cambiarPassword(this.newPasswordForm.value.newPassword,'' ).subscribe((resp)=>{
      console.log(resp);
    })

  }

}
