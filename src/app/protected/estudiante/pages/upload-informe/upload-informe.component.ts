import { Component, OnInit,ViewChild, ElementRef } from '@angular/core';
import { ComisionTitulacionPracticaService } from 'src/app/protected/comision-titulacion-practica/comision-titulacion-practica.service'; 
import Swal from 'sweetalert2';
import {saveAs} from 'file-saver';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-upload-informe',
  templateUrl: './upload-informe.component.html',
  styleUrls: ['./upload-informe.component.css']
})
export class UploadInformeComponent implements OnInit {
  @ViewChild('fileInformeEstudiante') fileInformeEstudiante!:ElementRef;

  private fileTmpInformeEstudiante:any;

  constructor(private comisionTitulacionPracticaService:ComisionTitulacionPracticaService) { }

  ngOnInit(): void {
  }
  getFileInformeEstudiante($event:any):void{
    const [file] = $event.target.files;
    this.fileTmpInformeEstudiante = {
      fileRaw:file,
      fileName:file.name
    }
  }
  alertaAgregarInformeEstudiante():void{
    Swal.fire({
      title: '¿Está seguro de querer agregar este archivo?',
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
        //
        this.sendFileInformeEstudiante();
        //vaciar 
        this.fileInformeEstudiante.nativeElement.value = null;

      } else if (result.isDenied) {
        Swal.fire('No se ha guardado el contenido', '', 'info')
      }
    })
  }
  sendFileInformeEstudiante():void{
    //this.loading=true;
    const nombre=this.fileTmpInformeEstudiante.fileName;
    const body=new FormData();
    body.append('myFile',this.fileTmpInformeEstudiante.fileRaw,this.fileTmpInformeEstudiante.fileName.replaceAll(" ","_"));
    body.append('author','Camilo');
    // console.log('body tiene:',body);
    //conexion con backend
    this.comisionTitulacionPracticaService.sendPostInformeEstudiante(body)
    .subscribe((res)=>{
      //this.loading=false;
      // console.log(res)
      
      Swal.fire('Se ha agregado el archivo con exito!!', '', 'success')
    });
    this.fileInformeEstudiante.nativeElement.value = null;
  }


}
