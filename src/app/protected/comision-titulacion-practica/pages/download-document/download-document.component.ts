import { Component,ViewChild, ElementRef, OnInit } from '@angular/core';
import { FileSelectDirective, FileUploader} from 'ng2-file-upload';
import { ComisionTitulacionPracticaService } from './../../comision-titulacion-practica.service';
import Swal from 'sweetalert2';
import {saveAs} from 'file-saver';


@Component({
  selector: 'app-download-document',
  templateUrl: './download-document.component.html',
  styleUrls: ['./download-document.component.css'],
})
export class DownloadDocumentComponent implements OnInit {
  private fileTmpDocPracticaEstudiante:any;
  @ViewChild('fileDocPracticaEstudiante') fileDocPracticaEstudiante!:ElementRef;

  attachmentList:any = [];



  constructor(private comisionTitulacionPracticaService:ComisionTitulacionPracticaService) { 

  }

  ngOnInit(): void {
  }
  getFileDocPracticaEstudiante($event:any):void{
    const [file] = $event.target.files;
    this.fileTmpDocPracticaEstudiante = {
      fileRaw:file,
      fileName:file.name
    }
  }
  alertaDocPracticaEstudiant():void{
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
        this.sendFileDocPracticaEstudiante();
        //vaciar 
        this.fileDocPracticaEstudiante.nativeElement.value = null;

        Swal.fire('Se ha agregado el archivo con exito!!', '', 'success')
        //se borra todo lo que contiene el formulario
        
      } else if (result.isDenied) {
        Swal.fire('No se ha guardado el contenido', '', 'info')
      }
    })
  }
  sendFileDocPracticaEstudiante():void{
    //this.loading=true;
    //0pcion video pdf
    const body=new FormData();
    body.append('myFile',this.fileTmpDocPracticaEstudiante.fileRaw,this.fileTmpDocPracticaEstudiante.fileName);
    //conexion con backend
    this.comisionTitulacionPracticaService.sendPostDocPracticaEstudiante(body)
    .subscribe((res)=>{
      //this.loading=false;ng
      this.attachmentList.push(this.fileTmpDocPracticaEstudiante.fileName);
      console.log(res)
    });
  }
  download(index:any){
    var filenombre= this.attachmentList[index];
    console.log('el archivo se llama ',filenombre);
    this.comisionTitulacionPracticaService.downloadFile(filenombre)
    .subscribe(data=>{
      let downloadURL=window.URL.createObjectURL(data);
      saveAs(downloadURL);
    });
  }
  /*
  download(index:any){
    var filename = this.attachmentList[index];

    this.comisionTitulacionPracticaService.downloadFile(filename)
    .subscribe(
        data => saveAs(data, filename),
        error => console.error(error)
    );
  }*/
}
