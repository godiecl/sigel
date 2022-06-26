import { ComisionTitulacionPracticaService } from './../../comision-titulacion-practica.service';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-upload-contenido',
  templateUrl: './upload-contenido.component.html',
  styleUrls: ['./upload-contenido.component.css']
})
export class UploadContenidoComponent implements OnInit {
  private fileTmp:any;

  constructor(private comisionTitulacionPracticaService:ComisionTitulacionPracticaService) { 

  }

  ngOnInit(): void {
  }
  
  getFile($event:any):void{
    const [file] = $event.target.files;
    this.fileTmp = {
      fileRaw:file,
      fileName:file.name
    }
  }
//
  sendFile():void{

    //0pcion video pdf
    const body=new FormData();
    body.append('myFile',this.fileTmp.fileRaw,this.fileTmp.fileName);
    console.log("blabla body",body);
    //conexion con backend
    this.comisionTitulacionPracticaService.sendPostContenidoPractica(body)
    .subscribe(res=>console.log(res));
  }
 
}
