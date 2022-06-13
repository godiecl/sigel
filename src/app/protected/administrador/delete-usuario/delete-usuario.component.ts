import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';
import { AdministradorService } from '../services/administrador.service';
import { takeUntil } from 'rxjs/operators';
import { User } from 'src/app/auth/interfaces/user.interface';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-delete-usuario',
  templateUrl: './delete-usuario.component.html'
})
export class DeleteUsuarioComponent implements OnInit, OnDestroy {

  
  private _unsubscribeAll: Subject<any>;

  deleteForm: FormGroup = this.fb.group({
    rut: ['', Validators.required]
  })

  constructor(
    private adminService: AdministradorService,
    private fb: FormBuilder,
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

  deleteUsuario()
  {

    

    Swal.fire({
      title: 'Esta seguro de querer deshabilitar este usuario?',
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

        console.log("delete form: ",this.deleteForm.value.rut)

        this.adminService.obtenerUsuarioPorRut(this.deleteForm.value.rut)
          .pipe(takeUntil(this._unsubscribeAll)).subscribe(
            (resp: any) =>{

              // TODO: falta hacer validacion si no existe el rut

                console.log('respuesta obtener',resp);
                if(!resp.error){
                  // si existe
                  this.adminService.eliminarUsuario(resp.id)
                    .pipe(takeUntil(this._unsubscribeAll)).subscribe(
                        (respuesta: any) => {
                          console.log('respuesta eliminar',respuesta);

                        if(!respuesta){
                          Swal.fire('Usuario se ha deshabilitado con exito!', '', 'success')
                        }else{
                          Swal.fire('Lo sentimos. Ha ocurrido un error', '', 'error' );
                        } 
                        }
                      )

                }else{
                  Swal.fire('Ha ocurrido un error', '', 'error' );
                  return
                }
            }
          )

      } else if (result.isDenied) {
        Swal.fire('Los cambios no se han guardado', '', 'info')
        return;
      }else {
        return;
      }
    })
    
    



    // this.adminService.eliminarUsuario(rut).pipe(takeUntil(this._unsubscribeAll)).subscribe(
    //   (resp: any) =>{
    //       console.log(resp);
    //   }
    // )


  }
  

}