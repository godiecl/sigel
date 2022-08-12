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
    this.ctpSv.getActasEvaluaciones().subscribe((resp)=>{
      if(resp.ok){
        this.data = resp.datos
        console.log(this.data)
        this.dataSource = new MatTableDataSource(this.data)
        this.displayedColumns = ['nombre', 'rut', 'nombreProyecto', 'nombreEmpresa', 'periodo','anio', 'fechaDefensa' ,'boton']
      }else{
        Swal.fire('Ha ocurrido un error', resp.msg, 'error')
      }
    })
  }

  public downloadPDF(id: any): void {
   
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
        let logoDisc = new Image();
        logoDisc.src= 'assets/images/LogosDisc/LOGO DISC.png'
        
        let fechaInicio = this.datePipe.transform(data.fechaInicio, 'dd-MM-yyyy') ; 
        let fechaFinal = this.datePipe.transform(data.fechaFinal, 'dd-MM-yyyy') ;
        let fechaExamen = this.datePipe.transform(data.fechaExamen, 'dd-MM-yyyy') 
         

        doc.setFontSize(16)
        doc.text('Universidad Católica del Norte', 105, 10, {align: "center"})
        doc.text('Facultad de Ingeniería y Ciencias Geológicas', 105, 18, {align: "center"})
        doc.text('Departamento de Ingeniería de Sistemas y Computación', 105, 26, {align: "center"})
        doc.addImage(image, 'png', 10, 10, 14, 14)
        doc.addImage(logoDisc, 'png', 170, 5, 30, 20)
        // doc.setFontSize(16)
        doc.setFont('times','bold')
        doc.text('Informe de Evaluación Actividad de Práctica Pre-Profesional', 105, 40,{ align: "center"});
        doc.setFontSize(10)
        
        doc.line(10, 45, 200, 45)
        // DATOS DEL ESTUDIANTE
        
        doc.text('Datos del Estudiante', 10,50)
        const textWidth = doc.getTextWidth('Datos del Estudiante');
        doc.line(10,50.4,10 + textWidth, 50.4)
        doc.setFont('times','normal')
        doc.text('Nombre: ', 10, 60);
        doc.text(data.nombreEstudiante, 105, 60, {align: "left"})
        doc.text('Rut: ', 10, 70)
        doc.text(data.rut, 105, 70, {align: "left"})
        doc.text('Carrera: ', 10, 80)
        doc.text(carrera, 105, 80, {align: "left"})
        doc.text('Empresa donde se realizó la práctica: ', 10, 90)
        doc.text(nombreempresa, 105, 90, {align: "left"})
        doc.text('Nombre del Proyecto: ', 10, 100)
        doc.text(data.nombreProyecto, 105, 100, {align: "left"})
        doc.text('Fecha Inicio de Práctica: ', 10, 110)
        doc.text(String(fechaInicio), 105, 110, {align: "left"})
        doc.text('Fecha Final de Práctica: ', 10, 120)
        doc.text(String(fechaFinal), 105, 120, {align: "left"})
        doc.text('Año: ', 10, 130)
        doc.text(String(data.anio), 105, 130, {align: "left"})
        doc.text('Fecha de defensa de práctica: ', 10, 140)
        doc.text(String(fechaExamen), 105, 140, {align: "left"})
        doc.text('Evaluador 1: ', 10, 150)
        doc.text(data.nombreProfesorS, 105, 150, {align: "left"})
        doc.text('Evaluador 2: ', 10, 160)
        doc.text(data.nombreProfesor2, 105, 160, {align: "left"})
        doc.line(10, 165, 200, 165)
        
        doc.setFont('times','bold')
        doc.text('Resumen de Notas', 10,170)
        const textWidth2 = doc.getTextWidth('Resumen de Notas');
        doc.line(10,170.4,10 + textWidth2, 170.4)
        doc.setFont('times','normal')
        doc.text('Nota de la Empresa: ', 10, 180)
        doc.text(String(data.notaEmpresa), 105, 180, {align: "left"})
        doc.text('Nota de la Informe: ', 10, 190)
        doc.text(String(data.notaInforme), 105, 190, {align: "left"})
        doc.text('Nota de Defensa de Práctica: ', 10, 200)
        doc.text(String(data.notaDefensa), 105, 200, {align: "left"})
        doc.text('Nota Final: ', 10, 210)
        doc.text(String(data.notaFinal), 105, 210, {align: "left"})
        doc.line(10, 215, 200, 215)
        doc.line(80, 265, 130, 265) // linea firma encargado practica
        doc.line(10, 265, 60, 265)
        doc.line(150, 265, 200, 265)
        doc.setFontSize(8)
        doc.text('Encargado de Práctica Pre-Profesional', 105, 270, {align: "center"})
        doc.text('Depto. Ingeniería de Sistemas y Computación', 105, 273, {align: "center"})
        
        doc.text('Profesor Corrector N°1', 35, 270, {align: "center"})
        doc.text('Profesor Corrector N°2', 175  , 270, {align: "center"})

        // Segundo página
        doc.addPage()
        doc.setFontSize(16)
        doc.text('Universidad Católica del Norte', 105, 10, {align: "center"})
        doc.text('Facultad de Ingeniería y Ciencias Geológicas', 105, 18, {align: "center"})
        doc.text('Departamento de Ingeniería de Sistemas y Computación', 105, 26, {align: "center"})
        doc.addImage(image, 'png', 10, 10, 14, 14)
        doc.addImage(logoDisc, 'png', 170, 5, 30, 20)
        // doc.setFontSize(16)
        doc.setFont('times','bold')
        doc.text('Detalle de Calificaciones Actividad de Práctica Pre-Profesional', 105, 40,{ align: "center"});
        doc.setFontSize(10)
        
        doc.line(10, 45, 200, 45)
        
        doc.setFont('times','bold')
        doc.text('Notas de la Empresa', 10, 50)
        const textWidth3 = doc.getTextWidth('Notas de la Empresa');
        doc.line(10,50.4,10 + textWidth3, 50.4)
        doc.setFont('times','normal')
        doc.text('Asistencia y puntualidad: ', 10, 60)
        doc.text(String(data.asistenciaPuntualidad), 105, 60, {align: "left"})
        doc.text('Conducta personal: ', 10, 65)
        doc.text(String(data.conducta), 105, 65, {align: "left"})
        doc.text('Dedicación e interés por el trabajo: ', 10, 70)
        doc.text(String(data.dedicacion), 105, 70, {align: "left"})
        doc.text('Habilidad para aprender : ', 10, 75)
        doc.text(String(data.habilidadAprender), 105, 75, {align: "left"})
        doc.text('Adaptación a los cambios y circunstancias : ', 10, 80)
        doc.text(String(data.adaptacion), 105, 80, {align: "left"})
        doc.text('Iniciativa y proactividad: ', 10, 85)
        doc.text(String(data.iniciativa), 105, 85, {align: "left"})
        doc.text('Aporte y apreciación de la práctica para la empresa: ', 10, 90)
        doc.text(String(data.aporteEmpresa), 105, 90, {align: "left"})
        doc.text('Conocimientos y nivel de preparación del estudiante: ', 10, 95)
        doc.text(String(data.conocimientos), 105, 95, {align: "left"})
        doc.text('Criterio profesional: ', 10, 100)
        doc.text(String(data.criterio), 105, 100, {align: "left"})
        doc.text('Nota final de empresa: ', 10, 105)
        doc.text(String(data.notaEmpresa), 105, 105, {align: "left"})
        doc.line(10,110, 200, 110)


        // doc.text('Actitud para el trabajo en equipo: ', 10, 150)
        // doc.text(String(data.actitud), 200, 150)

        doc.setFont('times','bold')
        doc.text('Notas de Informe de Práctica', 10, 115)
        const text5 = doc.getTextWidth('Notas de Informe de Práctica');
        doc.line(10,115.4,10 + text5, 115.4)
        doc.setFont('times','normal')
        doc.text('Promedio Evaluador 1: ('+data.nombreProfesorS+')', 10, 125 )
        doc.text(String(data.promedioEvaluador1Informe), 105, 125, {align: "left"})
        doc.text('Promedio Evaluador 2: ('+data.nombreProfesor2+')', 10, 130 )
        doc.text(String(data.promedioEvaluador2Informe), 105, 130, {align: "left"})
        doc.text('Nota Final:', 10, 135 )
        doc.text(String(data.notaInforme), 105, 135, {align: "left"})
        doc.line(10,140, 200, 140)     
        doc.setFont('times','bold')
        doc.text('Notas de Defensa de Práctica', 10, 145)
        const textWidth4 = doc.getTextWidth('Notas de Defensa de Práctica');
        doc.line(10,145.4,10 + textWidth4, 145.4)
        doc.setFont('times','normal')
        doc.text(data.nombreProfesorS, 100, 145, {align: "center"})
        doc.text(data.nombreProfesor2, 155, 145, {align: "center"})
        doc.text('Calidad de material de apoyo (diapositivas): ', 10, 155)
        doc.text(String(data.calidadMaterialEvaluador), 100, 155, {align: "center"})
        doc.text(String(data.calidadMaterialEvaluador2), 155, 155, {align: "center"})
        doc.text('Claridad de exposición: ', 10, 160)
        doc.text(String(data.claridadEvaluador), 100, 160, {align: "center"})
        doc.text(String(data.claridadEvaluador2), 155, 160, {align: "center"})
        doc.text('Contenido: ', 10, 165)
        doc.text(String(data.contenidoEvaluador), 100, 165, {align: "center"})
        doc.text(String(data.contenidoEvaluador2), 155, 165, {align: "center"})
        doc.text('Tiempo empleado: ', 10, 170)
        doc.text(String(data.tiempoEvaluador), 100, 170, {align: "center"})
        doc.text(String(data.tiempoEvaluador2), 155, 170, {align: "center"})
        doc.text('Dominio escénico: ', 10, 175)
        doc.text(String(data.dominioEscenicoEvaluador), 100, 175, {align: "center"})
        doc.text(String(data.dominioEscenicoEvaluador2), 155, 175, {align: "center"})
        doc.text('Defensa de la presentación: ', 10, 180)
        doc.text(String(data.defensaEvaluador), 100, 180, {align: "center"})
        doc.text(String(data.defensaEvaluador2), 155, 180, {align: "center"})
        doc.text('Promedio: ', 10, 185)
        doc.text(String(data.promedioEvaluador), 100, 185, {align: "center"})
        doc.text(String(data.promedioEvaluador2), 155, 185, {align: "center"})
           
        
        


        doc.addPage()
        // TERCERA PAGINA
        doc.setFontSize(16)
        doc.text('Universidad Católica del Norte', 105, 10, {align: "center"})
        doc.text('Facultad de Ingeniería y Ciencias Geológicas', 105, 18, {align: "center"})
        doc.text('Departamento de Ingeniería de Sistemas y Computación', 105, 26, {align: "center"})
        doc.addImage(image, 'png', 10, 10, 14, 14)
        doc.addImage(logoDisc, 'png', 170, 5, 30, 20)
        // doc.setFontSize(16)
        doc.setFont('times','bold')
        doc.text('Detalle de Observaciones Actividad de Práctica Pre-Profesional', 105, 40,{ align: "center"});
        doc.setFontSize(9)
        
        doc.line(10, 45, 200, 45)
        
        doc.setFont('times','bold')
        doc.text('Observaciones de la Empresa: ', 10, 50)
        doc.setFont('times','normal')
        doc.text('Fortalezas: '+data.fortalezasEmpresa, 10, 55, { maxWidth: 190, align: 'justify' })
        doc.text('Debilidades: '+ data.debilidadesEmpresa, 10, 90, { maxWidth: 190, align: 'justify' })
        doc.line(10, 125, 200, 125)
        
        doc.setFont('times','bold')
        doc.text('Observaciones del Informe: ', 10, 130)
        doc.setFont('times','normal')
        if(data.observacionesInforme1 && data.observacionesInforme2){
          doc.text(data.nombreProfesorS + ': '+ data.observacionesInforme1, 10,135, { maxWidth: 190, align: 'justify' } )
          doc.text(data.nombreProfesor2 + ': '+ data.observacionesInforme2, 10,170, { maxWidth: 190, align: 'justify' } )
        }else if(data.observacionesInforme1){
          doc.text(data.nombreProfesorS + ': '+ data.observacionesInforme1, 10,135,{ maxWidth: 190, align: 'justify' } )
          doc.text(data.nombreProfesor2 + ': ', 10,170)
        }else if(data.observacionesInforme2){
          doc.text(data.nombreProfesorS + ': ', 10,135)
          doc.text(data.nombreProfesor2 + ': '+ data.observacionesInforme2, 10,170, { maxWidth: 190, align: 'justify' })
        }else{
          doc.text(data.nombreProfesorS + ': ', 10,135)
          doc.text(data.nombreProfesor2 + ': ', 10,170)
        }
        doc.line(10, 205, 200, 205)
        doc.setFont('times','bold')
        doc.text('Observaciones del Examen: ', 10, 210)
        doc.setFont('times','normal')
        if(data.observacionesExamen1 && data.observacionesExamen2){
          doc.text(data.nombreProfesorS + ': '+ data.observacionesExamen1, 10,215, { maxWidth: 190, align: 'justify' })
          doc.text(data.nombreProfesor2 + ': '+ data.observacionesExamen2, 10,250, { maxWidth: 190, align: 'justify' })
          
        }else if(data.observacionesExamen1){
          doc.text(data.nombreProfesorS + ': '+ data.observacionesExamen1, 10,215, { maxWidth: 190, align: 'justify' })
          doc.text(data.nombreProfesor2 + ': ', 10,250)
        }else if(data.observacionesExamen2){
          doc.text(data.nombreProfesorS + ': ', 10,215)
          doc.text(data.nombreProfesor2 + ': '+ data.observacionesExamen2, 10,250, { maxWidth: 190, align: 'justify' })
        }else{
          doc.text(data.nombreProfesorS + ': ', 10,215)
          doc.text(data.nombreProfesor2 + ': ', 10,250)
        }

        
        

        const nombreArchivo = `${data.nombreEstudiante}_${data.rut}_acta_evaluacion.pdf`
        doc.save(nombreArchivo);
      }else{
        Swal.fire('Ha ocurrido un error',resp.msg,'error')
      }

    })

    
  }

}
