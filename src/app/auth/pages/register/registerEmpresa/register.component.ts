import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { Empresa } from '../../../interfaces/empresa.interface';
import { EmpresaModel } from '../../../models/empresa.model';
import Swal from 'sweetalert2';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/operators';
import { RutService } from 'rut-chileno';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent implements OnInit, OnDestroy {

  empresa!: Empresa;
  private _unsubscribeAll: Subject<any>;
  emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";

  empresaForm: FormGroup = this.fb.group({
      rutEmpresa: ['', [Validators.required, this.rutService.validaRutForm]],
      nombreEmpresa: ['',[Validators.required]],
      giroEmpresa: ['', [Validators.required]],
      nombre: ['',[Validators.required]],
      rut: ['', [Validators.required, this.rutService.validaRutForm]],
      apellidop: ['', [Validators.required]],
      apellidom: ['', [Validators.required]],
      correo: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
      cargo: ['', [Validators.required]],
      telefono: ['', [Validators.required]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
  })

  constructor(private fb:FormBuilder,
              private router: Router,
              private authService: AuthService,
              private rutService: RutService
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

  get f(){
    return this.empresaForm.controls;
  }

  inputEvent(event : Event) {
    let rut = this.rutService.getRutChileForm(1, (event.target as HTMLInputElement).value)
    if (rut)
      this.empresaForm.controls['rutEmpresa'].patchValue(rut, {emitEvent :false});
  }

  inputEvent2(event : Event) {
    let rut = this.rutService.getRutChileForm(1, (event.target as HTMLInputElement).value)
    if (rut)
      this.empresaForm.controls['rut'].patchValue(rut, {emitEvent :false});
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

        // console.log('valor formulario de crear empresa:',this.empresaForm.value);
        // console.log('formulario de crear empresa, valido? ',this.empresaForm.valid);

        this.empresa = new EmpresaModel(0,
          this.empresaForm.value.nombreEmpresa,this.empresaForm.value.rutEmpresa, this.empresaForm.value.giroEmpresa
        );

        this.authService.crearEmpresa(this.empresa).
          // pipe(takeUntil(this._unsubscribeAll)).
            subscribe( resp => {
            // console.log('respuesta', resp);
            try {
               // console.log('empresa id', empresa.id_empresa);
               this.authService.actualizarEmpresaActual(resp.newEmpresa.id_empresa);
               // let idEmpresaxd;
               // this.authService.empresaActual.subscribe(idEmpresa => idEmpresaxd = idEmpresa )
               //  console.log('subject',idEmpresaxd )
               Swal.fire('Se ha registrado su empresa exitosamente', '', 'success');
               // this.router.navigateByUrl('/auth/solicitar-estudiante');
              
            } catch (error) {
              Swal.fire('No se ha registrado', '', 'info')
            }
            if(resp.ok){
              // this.authService.actualizarEmpresaActual(resp.newEmpresa.id_empresa);
              // Swal.fire('Se ha registrado su empresa exitosamente', '', 'success');

              // let idEmpresaxd;
              // this.authService.empresaActual.subscribe(idEmpresa => idEmpresaxd = idEmpresa )
              //  console.log('subject',idEmpresaxd )
              // this.router.navigateByUrl('/auth/solicitar-estudiante');
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
