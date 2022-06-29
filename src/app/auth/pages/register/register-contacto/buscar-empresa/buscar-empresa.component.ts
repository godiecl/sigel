import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RutService } from 'rut-chileno';
import { AuthService } from '../../../../services/auth.service';
import Swal from 'sweetalert2';
import { EncargadoTitulacionPracticaService } from '../../../../../protected/encargado-practica-titulacion/encargado-titulacion-practica.service';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-buscar-empresa',
  templateUrl: './buscar-empresa.component.html',
  styleUrls: ['./buscar-empresa.component.css']
})
export class BuscarEmpresaComponent implements OnInit {

  private _unsubscribeAll: Subject<any>;

  buscarEmpresaForm: FormGroup = this.fb.group({
    rutEmpresa: ['', [Validators.required, this.rutService.validaRutForm]]
  })

  constructor(
    private fb: FormBuilder,
    private rutService: RutService,
    private authS: AuthService,
    private router: Router,
    private encargadopracticaS: EncargadoTitulacionPracticaService,
    ) { 
      this._unsubscribeAll = new Subject();
    }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

  get f(){
    return this.buscarEmpresaForm.controls;
  }

  inputEvent(event : Event) {
    let rut = this.rutService.getRutChileForm(1, (event.target as HTMLInputElement).value)
    if (rut)
      this.buscarEmpresaForm.controls['rutEmpresa'].patchValue(rut, {emitEvent :false});
  }

  buscarEmpresa(){
    Swal.fire({ title: '¿Esta seguro del rut ingresado?',
    showDenyButton: true, 
    icon: 'question',
    showCancelButton: false, 
    confirmButtonText: 'Si', 
    denyButtonText:'No',
    }).then((result)=>{
      if(result.isConfirmed){
        // buscar el rut de la empresa, y llevar los datos para registrar un contacto nuevo en ella.
        this.encargadopracticaS.obtenerEmpresaPorRut(this.buscarEmpresaForm.value.rutEmpresa)
          .pipe(takeUntil(this._unsubscribeAll)).subscribe((empresa: any)=>{
            console.log(empresa)
            if(empresa.ok){
              Swal.fire({ title: `¿Estos son los datos de su empresa?<br> Rut: ${empresa.empresa.rutEmpresa}<br> Nombre: ${empresa.empresa.nombreEmpresa} <br> Giro: ${empresa.empresa.giroEmpresa} `,
              showDenyButton: true, 
              icon: 'question',
              showCancelButton: false, 
              confirmButtonText: 'Si', 
              denyButtonText:'No',
              }).then((res)=>{
                if(res.isConfirmed){
                  // continuar
                  this.authS.actualizarEmpresaActual(empresa.empresa.id_empresa)
                  this.router.navigateByUrl('/auth/register-contacto')

                }else if(res.isDenied){
                  // cancelar
                  return;
                }else{
                  return;
                }
              })
            }else{
              Swal.fire('No se ha encontrado la empresa.', '', 'error');
            }
          })
      }
      else if(result.isDenied){
        // nada
        return
      }else if(result.isDismissed){
        return
      }
    })
  }

}
