import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ComisionTitulacionPracticaService } from '../../comision-titulacion-practica.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-generar-acta-evaluacion',
  templateUrl: './generar-acta-evaluacion.component.html',
  styleUrls: ['./generar-acta-evaluacion.component.css']
})
export class GenerarActaEvaluacionComponent implements OnInit {

  dataSource!: MatTableDataSource<any>;
  data!: any[];
  displayedColumns!: string[];

  constructor(
    private ctpSv: ComisionTitulacionPracticaService,
  ) { }

  ngOnInit(): void {
    this.ctpSv.getEstudiantesAprobados().subscribe((resp)=>{
      if(resp.ok){
        this.data = resp.datos
        console.log(this.data)
        this.dataSource = new MatTableDataSource(this.data)
        this.displayedColumns = ['nombre', 'rut', 'nombreProyecto', 'nombreEmpresa', 'periodo','anio','boton']
      }else{
        Swal.fire('Ha ocurrido un error', resp.msg, 'error')
      }
    })
  }

}
