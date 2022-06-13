import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { Empresa } from '../../../interfaces/empresa.interface';
import { EmpresaModel } from '../../../models/empresa.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent implements OnInit {

  empresa!: Empresa;

  empresaForm: FormGroup = this.fb.group({
      rutEmpresa: ['', [Validators.required]],
      nombreEmpresa: ['',[Validators.required]],
      giroEmpresa: ['', [Validators.required]]
  })

  constructor(private fb:FormBuilder,
              private router: Router,
              private authService: AuthService
              ) { }

  ngOnInit(): void {
  }

  crearEmpresa(){
    console.log('valor formulario de crear empresa:',this.empresaForm.value);
    console.log('formulario de crear empresa, valido? ',this.empresaForm.valid);

    this.empresa = new EmpresaModel(
      this.empresaForm.value.nombreEmpresa,this.empresaForm.value.rutEmpresa, this.empresaForm.value.giroEmpresa
    );

    this.authService.crearEmpresa(this.empresa).subscribe(
      (resp: any) => {
        if(resp){
          Swal.fire('Se ha registrado su empresa exitosamente', '', 'success');
        }else{
          Swal.fire('Ha ocurrido un error', '', 'error');
        }
      }
      )

    this.router.navigateByUrl('/auth/register-contacto');
  }

}
