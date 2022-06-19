import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { EncargadoEmpresa } from '../../../interfaces/encargadoEmpresa.interface';
import { User } from '../../../interfaces/user.interface';
import { UserModel } from '../../../models/user.model';
import { AuthService } from '../../../services/auth.service';
import { AdministradorService } from '../../../../protected/administrador/services/administrador.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs/internal/Subject';
import Swal from 'sweetalert2';
import { EncargadoEmpresaModel } from '../../../models/encargadoEmpresa.model';

@Component({
  selector: 'app-register-contacto',
  templateUrl: './register-contacto.component.html',
  styles: [
  ]
})
export class RegisterContactoComponent implements OnInit, OnDestroy {

  encargadoEmpresa!: EncargadoEmpresa;
  usuario!: User
  emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";
  private _unsubscribeAll: Subject<any>;
  idEmpresaActual!: number;

  contactoForm: FormGroup = this.fb.group({

    nombre: ['',[Validators.required]],
    rut: ['', [Validators.required]],
    apellidop: ['', [Validators.required]],
    apellidom: ['', [Validators.required]],
    correo: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
    cargo: ['', [Validators.required]],
    telefono: ['', [Validators.required]],
    password: ['', [Validators.required]],
    confirmPassword: ['', [Validators.required]],
    
  });

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private adminService: AdministradorService
              ) { 
                this._unsubscribeAll = new Subject();
              }

  ngOnInit(): void {

    this.authService.empresaActual.subscribe( idEmpresa => {
      this.idEmpresaActual = idEmpresa;
      console.log('empresa id: register contactos',idEmpresa);
    } )
  }
  ngOnDestroy(): void {
    
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
  }

  
  registrarContacto(){

    // colocar alerta, SI SI: SIGUE, SI NO: RETURN.
    Swal.fire({
      title: '¿Está seguro de querer registrar este contacto?',
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
        this.usuario = new UserModel( this.contactoForm.value );
        this.usuario.password = this.contactoForm.value.password;
        this.usuario.roles = [...this.usuario.roles, 'EncargadoEmpresa'];
        this.usuario.estado = false;

        this.adminService.crearUsuario(this.usuario)
          .pipe(takeUntil(this._unsubscribeAll)).subscribe((resp: any)=>{
            if(resp){
              this.encargadoEmpresa = new EncargadoEmpresaModel(
                this.contactoForm.value.cargo, this.contactoForm.value.telefono, resp.id, this.idEmpresaActual
              )
              this.authService.crearEncargadoEmpresa(this.encargadoEmpresa)
                .pipe(takeUntil(this._unsubscribeAll)).subscribe((response: any)=>{
                  // colocar alerta se ha registrado exitosamente
                  console.log(response);
              })
          }else{
            // imprimir error
            Swal.fire('Ha ocurrido un error.', '', 'info')
            console.log('aqui fallo')
          }
        })
        Swal.fire('Se ha registrado con exito!!', '', 'success')
        //se borra todo lo que contiene el formulario
        //this.empresaForm.reset();
      } else if (result.isDenied) {
        Swal.fire('No se ha registrado', '', 'info')
      }
    })

    
  }


}
