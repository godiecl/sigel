import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-solicitar-estudiante',
  templateUrl: './solicitar-estudiante.component.html',
  styleUrls: ['./solicitar-estudiante.component.css']
})
export class SolicitarEstudianteComponent implements OnInit {

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

  modalidades = [
    { id:0, name: 'Práctica pre-profesional'},
    { id:1, name: 'Capstone project (Proyecto de Titulación)'},
    { id:2, name: 'Por definir (que quede a elección del encargado de práctica y titulación de la universidad)'}
  ];

  constructor(
    private fb: FormBuilder
  ) { 

  }

  ngOnInit(): void {
  }

  solicitarEstudiante(){

  }

}
