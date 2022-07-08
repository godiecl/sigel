import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SolicitudCartaVacante } from 'src/app/auth/interfaces/documentos/solicitudCartaVacante';
import { Estudiante } from '../../../../../auth/interfaces/estudiante.interface';
import { AdministradorService } from '../../../../administrador/services/administrador.service';
import { User } from '../../../../../auth/interfaces/user.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-ver-carta-solicitud',
  templateUrl: './ver-carta-solicitud.component.html',
  styleUrls: ['./ver-carta-solicitud.component.css']
})
export class VerCartaSolicitudComponent implements OnInit {

  datos!: any;
  estudiante!: Estudiante;
  usuario!: User;

  respuestaForm: FormGroup = this.fb.group({
    fechaInicio: [, Validators.required],
    fechaFinal: [, Validators.required],
    confirmar: [,Validators.requiredTrue],
  })


  constructor(
    private route: ActivatedRoute,
    private adminS: AdministradorService,
    private fb: FormBuilder,
  ) { 
    this.route.data.subscribe(({cartaVacante}) => {
      // console.log(cartaVacante.solicitud)
      // this.datos= cartaVacante;
      console.log(cartaVacante)
      this.datos = cartaVacante
      
    })
  }
  ngOnInit(): void {

   
  }

  enviarRespuesta(): void{
    
  }

}

