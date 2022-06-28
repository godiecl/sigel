import { ComisionTitulacionPracticaService } from './../../comision-titulacion-practica.service';
import { Component,ViewChild, ElementRef, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-upload-contenido',
  templateUrl: './upload-contenido.component.html',
  styleUrls: ['./upload-contenido.component.css']
})
export class UploadContenidoComponent implements OnInit {
  public loading!:boolean
  private fileTmpPractica:any;
  private fileTmpCapstone:any;
  @ViewChild('fileCapstone') fileCapstone!:ElementRef;
  @ViewChild('filePractica') filePractica!:ElementRef;

  constructor(private comisionTitulacionPracticaService:ComisionTitulacionPracticaService) { 

  }

  ngOnInit(): void {
  }
  
  getFilePractica($event:any):void{
    const [file] = $event.target.files;
    this.fileTmpPractica = {
      fileRaw:file,
      fileName:file.name
    }
  }
  getFileCapstone($event:any):void{
    const [file] = $event.target.files;
    this.fileTmpCapstone = {
      fileRaw:file,
      fileName:file.name
    }
  }

  sendFilePractica():void{
    this.loading=true;
    //0pcion video pdf
    const body=new FormData();
    body.append('myFile',this.fileTmpPractica.fileRaw,this.fileTmpPractica.fileName);
    //conexion con backend
    this.comisionTitulacionPracticaService.sendPostContenidoPractica(body)
    .subscribe((res)=>{
      this.loading=false;
      console.log(res)
    });
  }
  sendFileCapstone():void{
    this.loading=true;
    //0pcion video pdf
    const body=new FormData();
    body.append('myFile',this.fileTmpCapstone.fileRaw,this.fileTmpCapstone.fileName);
    //conexion con backend
    this.comisionTitulacionPracticaService.sendPostContenidoCapstone(body)
    .subscribe((res)=>{
      this.loading=false;
      console.log(res)
    });
  }

  alertaPractica():void{
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
        this.sendFilePractica();
        //vaciar 
        this.filePractica.nativeElement.value = null;

        Swal.fire('Se ha agregado el archivo con exito!!', '', 'success')
        //se borra todo lo que contiene el formulario
        
      } else if (result.isDenied) {
        Swal.fire('No se ha guardado el contenido', '', 'info')
      }
    })
  }
  alertaCapstone():void{
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
        this.sendFileCapstone();
        //vaciar 
        this.fileCapstone.nativeElement.value = null;

        Swal.fire('Se ha agregado el archivo con exito!!', '', 'success')
        //se borra todo lo que contiene el formulario

        
      } else if (result.isDenied) {
        Swal.fire('No se ha guardado el contenido', '', 'info')
      }
    })
  }
}
