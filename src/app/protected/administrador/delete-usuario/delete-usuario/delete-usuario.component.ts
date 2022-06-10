import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';
import { AdministradorService } from '../../services/administrador.service';
import { takeUntil } from 'rxjs/operators';
import { User } from 'src/app/auth/interfaces/user.interface';

@Component({
  selector: 'app-delete-usuario',
  templateUrl: './delete-usuario.component.html'
})
export class DeleteUsuarioComponent implements OnInit, OnDestroy {

  
  private _unsubscribeAll: Subject<any>;

  constructor(
    private adminService: AdministradorService
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

  deleteUsuario(rut: string)
  {
    
    this.adminService.obtenerUsuarioPorRut(rut)
      .pipe(takeUntil(this._unsubscribeAll)).subscribe(
        (usuario: User) =>{

        }
      )



    this.adminService.eliminarUsuario(rut).pipe(takeUntil(this._unsubscribeAll)).subscribe(
      (resp: any) =>{
          console.log(resp);
      }
    )


  }

}
