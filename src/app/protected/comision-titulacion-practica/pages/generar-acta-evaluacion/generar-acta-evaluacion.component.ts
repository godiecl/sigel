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
        
        let fechaInicio = this.datePipe.transform(data.fechaInicio, 'dd-MM-yyyy') ; 
        let fechaFinal = this.datePipe.transform(data.fechaFinal, 'dd-MM-yyyy') ;
        let fechaExamen = this.datePipe.transform(data.fechaExamen, 'dd-MM-yyyy') 
         

        doc.setFontSize(10)
        doc.text('Universidad Católica del Norte', 105, 10, {align: "center"})
        doc.text('Facultad de Ingeniería y Ciencias Geológicas', 105, 15, {align: "center"})
        doc.text('Departamento de Ingeniería de Sistemas y Computación', 105, 20, {align: "center"})
        doc.addImage(image, 'png', 100, 25, 10, 10)
        doc.setFontSize(16)
        doc.text('Informe de Evaluación Actividad de Práctica Pre-Profesional', 105, 45,{ align: "center"});
        doc.setFontSize(10)
        
        doc.line(10, 50, 200, 50)
        // DATOS DEL ESTUDIANTE
        doc.text('Datos del Estudiante', 10,60)
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
        doc.text('Fecha Inicio de Práctica: '+fechaInicio, 10, 120)
        doc.text('Fecha Final de Práctica: '+fechaFinal, 90, 120)
        doc.text('Año: '+ data.anio, 200, 120,{align: "right"})

        
        doc.text('Evaluador 1: ', 10, 130)
        doc.text(data.nombreProfesorS, 200, 130, {align: "right"})
        doc.text('Evaluador 2: ', 10, 140)
        doc.text(data.nombreProfesor2, 200, 140, {align: "right"})
        doc.line(10, 145, 200, 145)
        doc.text('Nota de la Empresa: ', 10, 150)
        doc.text(String(data.notaEmpresa), 200, 150, {align: "right"})
        doc.text('Nota de la Informe: ', 10, 160)
        doc.text(String(data.notaInforme), 200, 160, {align: "right"})
        doc.text('Nota de Examen: ', 10, 170)
        doc.text(String(data.notaDefensa), 200, 170, {align: "right"})
        doc.text('Nota Final: ', 10, 180)
        doc.text(String(data.notaFinal), 200, 180, {align: "right"})
        doc.line(10, 185, 200, 185)
        doc.text('Observaciones de la Empresa: ', 10, 190)
        doc.text('Fortalezas: '+ data.fortalezasEmpresa, 10, 200)
        doc.text('Debilidades: '+ data.debilidadesEmpresa, 10, 210)
        doc.text('Observaciones del Informe: ', 10, 220)
        if(data.observacionesInforme1 && data.observacionesInforme2){
          doc.text(data.nombreProfesorS + ': '+ data.observacionesInforme1, 10,230)
          doc.text(data.nombreProfesor2 + ': '+ data.observacionesInforme2, 10,240)
        }else if(data.observacionesInforme1){
          doc.text(data.nombreProfesorS + ': '+ data.observacionesInforme1, 10,230)
        }else if(data.observacionesInforme2){
          doc.text(data.nombreProfesor2 + ': '+ data.observacionesInforme2, 10,230)
        }
        doc.text('Observaciones del Examen: ', 10, 250)
        if(data.observacionesExamen1 && data.observacionesExamen2){
          doc.text(data.nombreProfesorS + ': '+ data.observacionesExamen1, 10,260)
          doc.text(data.nombreProfesor2 + ': '+ data.observacionesExamen2, 10,270)
          
        }else if(data.observacionesExamen1){
          doc.text(data.nombreProfesorS + ': '+ data.observacionesExamen1, 10,260)
        }else if(data.observacionesExamen2){
          doc.text(data.nombreProfesor2 + ': '+ data.observacionesExamen2, 10,260)
        }

        doc.line(80, 280, 130, 280)
        doc.text('Firma', 105, 290, {align: "center"})
        

        const nombreArchivo = `${datos.nombre}_${datos.rut}_acta_evaluacion.pdf`
        doc.save(nombreArchivo);
      }else{
        Swal.fire('Ha ocurrido un error',resp.msg,'error')
      }

    })

    
  }

}
