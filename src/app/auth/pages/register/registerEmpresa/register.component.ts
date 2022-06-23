import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { Empresa } from '../../../interfaces/empresa.interface';
import { EmpresaModel } from '../../../models/empresa.model';
import Swal from 'sweetalert2';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent implements OnInit, OnDestroy {

  empresa!: Empresa;
  private _unsubscribeAll: Subject<any>;

  empresaForm: FormGroup = this.fb.group({
      rutEmpresa: ['', [Validators.required]],
      nombreEmpresa: ['',[Validators.required]],
      giroEmpresa: ['', [Validators.required]]
  })

  constructor(private fb:FormBuilder,
              private router: Router,
              private authService: AuthService
              ) { 
                this._unsubscribeAll = new Subject();
              }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        // this._unsubscribeAll.next(null);
        // this._unsubscribeAll.complete();
  }

  crearEmpresa(){
    
    Swal.fire({
      title: '¿Está seguro de querer registrarse?',
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

        console.log('valor formulario de crear empresa:',this.empresaForm.value);
        console.log('formulario de crear empresa, valido? ',this.empresaForm.valid);

        this.empresa = new EmpresaModel(0,
          this.empresaForm.value.nombreEmpresa,this.empresaForm.value.rutEmpresa, this.empresaForm.value.giroEmpresa
        );

        this.authService.crearEmpresa(this.empresa).
          // pipe(takeUntil(this._unsubscribeAll)).
            subscribe( resp => {
            console.log('respuesta', resp);
            if(resp.ok === true){
              // console.log('empresa id', empresa.id_empresa);
              this.authService.actualizarEmpresaActual(resp.newEmpresa.id_empresa);
              // let idEmpresaxd;
              // this.authService.empresaActual.subscribe(idEmpresa => idEmpresaxd = idEmpresa )
              //  console.log('subject',idEmpresaxd )
              Swal.fire('Se ha registrado su empresa exitosamente', '', 'success');
              this.router.navigateByUrl('/auth/register-contacto');
            }else{
              Swal.fire(resp.msg, resp.ok, 'error');
            }
          }
          )

       

        //se borra todo lo que contiene el formulario
        //this.empresaForm.reset();
      } else if (result.isDenied) {
        Swal.fire('No se ha registrado', '', 'info')
      }
    })

    
  }

}
