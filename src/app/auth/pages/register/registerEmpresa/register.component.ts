import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent implements OnInit {

  empresaForm: FormGroup = this.fb.group({
      rutEmpresa: ['', [Validators.required]],
      nombreEmpresa: ['',[Validators.required]],
      giroEmpresa: ['', [Validators.required]]
  })

  constructor(private fb:FormBuilder,
              private router: Router) { }

  ngOnInit(): void {
  }

  crearEmpresa(){
    console.log('valor formulario de crear empresa:',this.empresaForm.value);
    console.log('formulario de crear empresa, valido? ',this.empresaForm.valid);

    this.router.navigateByUrl('/register-contacto');
  }

}
