import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { SolicitudEstudiante } from '../../interfaces/documentos/solicitudEstudiante.interface';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-solicitar-estudiante',
  templateUrl: './solicitar-estudiante.component.html',
  styleUrls: ['./solicitar-estudiante.component.css']
})
export class SolicitarEstudianteComponent implements OnInit {

  idEncargadoActual !: string;
  solicitarEstudianteForm: FormGroup = this.fb.group({
    nombreProyecto: ['', Validators.required],
    problemaResolver: ['', Validators.required],
    area: ['', Validators.required],
    solucion: ['', Validators.required],
    entregableFinal: ['', Validators.required],
    importancia: ['', Validators.required],
    plazo: ['', Validators.required],
    infoAdicional: ['',],
    disposicionMonetaria: ['', Validators.required],
    modalidad: ['', Validators.required],
  })

  newSolicitud!: SolicitudEstudiante

  modalidades = [
    { id:0, name: 'Práctica pre-profesional'},
    { id:1, name: 'Capstone project (Proyecto de Titulación)'},
    { id:2, name: 'Por definir (que quede a elección del encargado de práctica y titulación de la universidad)'}
  ];

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { 

  }

  ngOnInit(): void {
    this.authService.encargadoActual.subscribe( id_encargado => {
      this.idEncargadoActual = id_encargado;
      console.log('encargado id ',id_encargado);
    } )
  }

  solicitarEstudiante(){

     Swal.fire({
      title: '¿Esta seguro de querer registrar este contacto?',
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

        this.newSolicitud = this.solicitarEstudianteForm.getRawValue();
        this.newSolicitud.id_encargadoEmpresa = this.idEncargadoActual

        console.log(this.newSolicitud);

        this.authService.crearSolicitudEstudiante(this.newSolicitud).subscribe((resp)=>{
        if(resp.ok){
        Swal.fire('Se ha registrado su solicitud, pronto será evaluada por el DISC.', '', 'success');
        this.router.navigateByUrl('/auth/login')
        }else{
        Swal.fire(resp.msg, '', 'error')

        }
        })
    

      }else if(result.isDenied){
        return
      }else{
        return
      }
    
    })
  
  }

}
