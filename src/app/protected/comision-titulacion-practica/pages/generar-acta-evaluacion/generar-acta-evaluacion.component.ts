import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ComisionTitulacionPracticaService } from '../../comision-titulacion-practica.service';
import Swal from 'sweetalert2';
import { DatePipe, TitleCasePipe } from '@angular/common';
import { jsPDF } from 'jspdf'
import html2canvas from 'html2canvas';
import { IfStmt } from '@angular/compiler';

@Component({
  selector: 'app-generar-acta-evaluacion',
  templateUrl: './generar-acta-evaluacion.component.html',
  styleUrls: ['./generar-acta-evaluacion.component.css'],
  providers: [TitleCasePipe, DatePipe]
})
export class GenerarActaEvaluacionComponent implements OnInit {

  dataSource!: MatTableDataSource<any>;
  data!: any[];
  displayedColumns!: string[];
  titleCasePipe=new TitleCasePipe()

  constructor(
    private ctpSv: ComisionTitulacionPracticaService,
    private datePipe: DatePipe
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

  public downloadPDF(id: any): void {
    const datos = this.data.find((obj)=>{
      return obj.id_estudiante === id;
    })
    const doc = new jsPDF();

    this.ctpSv.getDatosEstudiante(id).subscribe((resp)=>{
      console.log(resp)
      if(resp.ok){
        Swal.fire('Se ha generado la acta de evaluación','','success')
        const data = resp.datos[0];
        
        let carrera;
        let periodo;

        if(data.carrera === 0){
          carrera = 'Ingeniería en Computación e Informática'
        }else{
          carrera = 'Ingeniería Civil en Computación e Informática'
        }
        if(data.periodo === 0){
          periodo = 'Primer Semestre'
        }else if(data.periodo === 1){
          periodo = 'Segundo Semestre'
        }else{
          periodo = 'Verano'
        }
        const nombreempresa = this.titleCasePipe.transform(data.nombreEmpresa)

        let image = new Image();
        image.src= 'assets/images/Escudo-UCN-Full-Color.png'
        



        doc.setFontSize(10)
        doc.text('Universidad Católica del Norte', 105, 10, {align: "center"})
        doc.text('Facultad de Ingeniería y Ciencias Geológicas', 105, 15, {align: "center"})
        doc.text('Departamento de Ingeniería de Sistemas y Computación', 105, 20, {align: "center"})
        doc.addImage(image, 'png', 100, 25, 10, 10)
        doc.setFontSize(18)
        doc.text('Informe de Evaluación Actividad de Práctica Pre-Profesional', 105, 45,{ align: "center"});
        doc.setFontSize(12)
        
        doc.line(10, 50, 200, 50)
        // DATOS DEL ESTUDIANTE
        doc.text('Datos del Estudiante:', 10,60)
        doc.text('Nombre: ', 10, 70);
        doc.text(datos.nombre, 200, 70, {align: "right"})
        doc.text('Rut: ', 10, 80)
        doc.text(datos.rut, 200, 80, {align: "right"})
        doc.text('Carrera: ', 10, 90)
        doc.text(carrera, 200, 90, {align: "right"})
        doc.text('Empresa donde se realizó la práctica: ', 10, 100)
        doc.text(nombreempresa, 200, 100, {align: "right"})
        doc.text('Nombre del Proyecto: ', 10, 110)
        doc.text(data.nombreProyecto, 200, 110, {align: "right"})
        doc.text('Fecha Inicio de Práctica: '+data.fechaInicio, 10, 120)
        doc.text('Fecha Final de Práctica: '+data.fechaFinal, 100, 120)
        doc.text('Año: '+ data.anio, 200, 120,{align: "right"})

        /*
        doc.text('Evaluador 1: ', 10, 90)
        doc.text(data.nombreProfesorS, 200, 90, {align: "right"})
        doc.text('Evaluador 2: ', 10, 100)
        doc.text(data.nombreProfesor2, 200, 100, {align: "right"})
        doc.text('Nota de la Empresa: ', 10, 110)
        doc.text(String(data.notaEmpresa), 200, 110, {align: "right"})
        doc.text('Nota de la Informe: ', 10, 120)
        doc.text(String(data.notaInforme), 200, 120, {align: "right"})
        doc.text('Nota de Examen: ', 10, 130)
        doc.text(String(data.notaDefensa), 200, 130, {align: "right"})
        doc.text('Nota Final: ', 10, 140)
        doc.text(String(data.notaFinal), 200, 140, {align: "right"})
        doc.text('Observaciones de la Empresa: ', 10, 150)
        doc.text('Fortalezas: '+ data.fortalezasEmpresa, 10, 160)
        doc.text('Debilidades: '+ data.debilidadesEmpresa, 10, 170)
        if(data.observacionesInforme1 && data.observacionesInforme2){
          doc.text('Observaciones del Informe: ', 10, 180)
          doc.text('Observaciones de '+ data.nombreProfesorS + ': '+ data.observacionesInforme1, 10,190)
          doc.text('Observaciones de '+ data.nombreProfesor2 + ': '+ data.observacionesInforme2, 10,200)
        }
        if(data.observacionesExamen1 && data.observacionesExamen2){
          doc.text('Observaciones del Examen: ', 10, 180)
          doc.text('Observaciones de '+ data.nombreProfesorS + ': '+ data.observacionesInforme1, 10,190)
          doc.text('Observaciones de '+ data.nombreProfesor2 + ': '+ data.observacionesInforme2, 10,200)
          
        }
        */

        const nombreArchivo = `${datos.nombre}_${datos.rut}_acta_evaluacion.pdf`
        doc.save(nombreArchivo);
      }

    })

    
  }

}
