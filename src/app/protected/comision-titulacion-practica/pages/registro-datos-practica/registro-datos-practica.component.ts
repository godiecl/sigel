import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ComisionTitulacionPracticaService } from '../../comision-titulacion-practica.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro-datos-practica',
  templateUrl: './registro-datos-practica.component.html',
  styleUrls: ['./registro-datos-practica.component.css']
})
export class RegistroDatosPracticaComponent implements OnInit {

  dataSource!: MatTableDataSource<any>;
  data!: any[];
  displayedColumns!: string[];
  constructor(
    private ctpSv: ComisionTitulacionPracticaService,
  ) { }

  ngOnInit(): void {
    this.ctpSv.getEstudiantesRegistro().subscribe((resp)=>{
      if(resp.ok){
        console.log(resp)
        this.data = resp.datos
        console.log(this.data)
        this.dataSource = new MatTableDataSource(this.data)
        this.displayedColumns = ['apellidopEstudiante', 'apellidomEstudiante','nombreEstudiante','rut', 'carrera' , 'nombreProyecto', 'nombreEmpresa','rutEmpresa' ,'nombreProfesorS' ,'nombreProfesor2' , 'periodo','anio','notaEmpresa' ,'notaInforme','notaDefensa','notaFinal']
      }else{
        Swal.fire('Ha ocurrido un erorr',resp.msg,'error')
      }
    })
  }

}
