import { Component, ViewChild, ElementRef, OnInit, OnDestroy } from '@angular/core';
import { FileSelectDirective, FileUploader} from 'ng2-file-upload';
import { ComisionTitulacionPracticaService } from './../../comision-titulacion-practica.service';
import Swal from 'sweetalert2';
import {saveAs} from 'file-saver';
import { Observable, Subscription } from 'rxjs';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { ScrollingModule } from '@angular/cdk/scrolling';

@Component({
  selector: 'app-download-document',
  templateUrl: './download-document.component.html',
  styleUrls: ['./download-document.component.css'],
})
export class DownloadDocumentComponent implements OnInit,OnDestroy {
  @ViewChild('fileDocPracticaEstudiante') fileDocPracticaEstudiante!:ElementRef;
  @ViewChild('fileDocCapstoneEstudiante') fileDocCapstoneEstudiante!:ElementRef;
  @ViewChild('fileDocPracticaProfesor') fileDocPracticaProfesor!:ElementRef;
  @ViewChild('fileDocCapstoneProfesor') fileDocCapstoneProfesor!:ElementRef;

  suscriptionPracticaEstudiante!:Subscription;
  suscriptionPracticaProfesor!:Subscription;

  private fileTmpDocPracticaEstudiante:any;
  fileInfosDocPracticaEstudiante?: Observable<any>;

  private fileTmpDocCapstoneEstudiante:any;
  fileInfosDocCapstoneEstudiante?: Observable<any>;

  private fileTmpDocPracticaProfesor:any;
  fileInfosDocPracticaProfesor?: Observable<any>;

  private fileTmpDocCapstoneProfesor:any;
  fileInfosDocCapstoneProfesor?: Observable<any>;

  constructor(private router: Router,private comisionTitulacionPracticaService:ComisionTitulacionPracticaService) { 

  }

  ngOnInit(): void {
    this.fileInfosDocPracticaEstudiante = this.comisionTitulacionPracticaService.getFilesDocPracticaEstudiante();
    this.fileInfosDocCapstoneEstudiante = this.comisionTitulacionPracticaService.getFilesDocCapstoneEstudiante();
    this.suscriptionPracticaEstudiante=this.comisionTitulacionPracticaService.refresh$.subscribe(()=>{//refrescar tabla
      this.fileInfosDocPracticaEstudiante = this.comisionTitulacionPracticaService.getFilesDocPracticaEstudiante();
    });
    this.suscriptionPracticaEstudiante=this.comisionTitulacionPracticaService.refresh$.subscribe(()=>{//refrescar tabla
      this.fileInfosDocCapstoneEstudiante = this.comisionTitulacionPracticaService.getFilesDocCapstoneEstudiante();
    });
    this.fileInfosDocPracticaProfesor = this.comisionTitulacionPracticaService.getFilesDocPracticaProfesor();
    this.fileInfosDocCapstoneProfesor = this.comisionTitulacionPracticaService.getFilesDocCapstoneProfesor();
    this.suscriptionPracticaProfesor=this.comisionTitulacionPracticaService.refresh$.subscribe(()=>{//refrescar tabla
      this.fileInfosDocPracticaProfesor = this.comisionTitulacionPracticaService.getFilesDocPracticaProfesor();
    });
    this.suscriptionPracticaProfesor=this.comisionTitulacionPracticaService.refresh$.subscribe(()=>{//refrescar tabla
      this.fileInfosDocCapstoneProfesor = this.comisionTitulacionPracticaService.getFilesDocCapstoneProfesor();
    });
  }
  ngOnDestroy():void{
    this.suscriptionPracticaEstudiante.unsubscribe();
    this.suscriptionPracticaProfesor.unsubscribe();
  }

  
  getFileDocPracticaEstudiante($event:any):void{
    const [file] = $event.target.files;
    this.fileTmpDocPracticaEstudiante = {
      fileRaw:file,
      fileName:file.name
    }
  }
  getFileDocCapstoneEstudiante($event:any):void{
    const [file] = $event.target.files;
    this.fileTmpDocCapstoneEstudiante = {
      fileRaw:file,
      fileName:file.name
    }
  }
  getFileDocPracticaProfesor($event:any):void{
    const [file] = $event.target.files;
    this.fileTmpDocPracticaProfesor = {
      fileRaw:file,
      fileName:file.name
    }
  }
  getFileDocCapstoneProfesor($event:any):void{
    const [file] = $event.target.files;
    this.fileTmpDocCapstoneProfesor = {
      fileRaw:file,
      fileName:file.name
    }
  }

  alertaAgregarDocPracticaEstudiante():void{
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
  alertaAgregarDocCapstoneEstudiante():void{
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
        this.sendFileDocCapstoneEstudiante();
        //vaciar 
        this.fileDocCapstoneEstudiante.nativeElement.value = null;

        Swal.fire('Se ha agregado el archivo con exito!!', '', 'success')
        //se borra todo lo que contiene el formulario
        
      } else if (result.isDenied) {
        Swal.fire('No se ha guardado el contenido', '', 'info')
      }
    })
  }
  alertaEliminarDocPracticaEstudiante(name:String):void{
    Swal.fire({
      title: '¿Está seguro de querer eliminar este archivo?',
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
        this.deleteDocPracticaEstudiante(name);
        //vaciar 
        this.fileDocPracticaEstudiante.nativeElement.value = null;
        //alerta
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Se ha eliminado el archivo con exito!!',
          showConfirmButton: false,
          timer: 1500
        })
        //timer reload 
        window.setTimeout(function(){location.reload()},1500)

        
      } else if (result.isDenied) {
        Swal.fire('No se ha eliminado el contenido', '', 'info')
      }
    })
  }
  alertaEliminarDocCapstoneEstudiante(name:String):void{
    Swal.fire({
      title: '¿Está seguro de querer eliminar este archivo?',
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
        this.deleteDocCapstoneEstudiante(name);
        //vaciar 
        this.fileDocCapstoneEstudiante.nativeElement.value = null;

        Swal.fire('Se ha eliminado el archivo con exito!!', '', 'success')
        //se borra todo lo que contiene el formulario
        
      } else if (result.isDenied) {
        Swal.fire('No se ha eliminado el contenido', '', 'info')
      }
    })
  }
  
  sendFileDocPracticaEstudiante():void{
    //this.loading=true;
    const nombre=this.fileTmpDocPracticaEstudiante.fileName;
    const body=new FormData();
    body.append('myFile',this.fileTmpDocPracticaEstudiante.fileRaw,this.fileTmpDocPracticaEstudiante.fileName.replaceAll(" ","_"));
    //conexion con backend
    this.comisionTitulacionPracticaService.sendPostDocPracticaEstudiante(body)
    .subscribe((res)=>{
      //this.loading=false;
      console.log(res)
    });
    this.fileDocPracticaEstudiante.nativeElement.value = null;
  }
  sendFileDocCapstoneEstudiante():void{
    //this.loading=true;
    const nombre=this.fileTmpDocCapstoneEstudiante.fileName;
    const body=new FormData();
    body.append('myFile',this.fileTmpDocCapstoneEstudiante.fileRaw,this.fileTmpDocCapstoneEstudiante.fileName.replaceAll(" ","_"));
    //conexion con backend
    this.comisionTitulacionPracticaService.sendPostDocCapstoneEstudiante(body)
    .subscribe((res)=>{
      //this.loading=false;
      console.log(res)
    });
    this.fileDocCapstoneEstudiante.nativeElement.value = null;
  }

  downloadDocPracticaEstudiante(name:String){
    var filenombre= name;
    this.comisionTitulacionPracticaService.downloadFileDocPracticaEstudiante(filenombre)
    .subscribe(data=>{
      let downloadURL=window.URL.createObjectURL(data);
      saveAs(downloadURL,filenombre.toString());
    });
  }
  downloadDocCapstoneEstudiante(name:String){
    var filenombre= name;
    this.comisionTitulacionPracticaService.downloadFileDocCapstoneEstudiante(filenombre)
    .subscribe(data=>{
      let downloadURL=window.URL.createObjectURL(data);
      saveAs(downloadURL,filenombre.toString());
    });
  }
  deleteDocPracticaEstudiante(name:String){
    var filenombre= name;
    this.comisionTitulacionPracticaService.deleteFileDocPracticaEstudiante(filenombre)
    .subscribe((res)=>{
      console.log(res);
    });
  }
  deleteDocCapstoneEstudiante(name:String){
    var filenombre= name;
    this.comisionTitulacionPracticaService.deleteFileDocCapstoneEstudiante(filenombre)
    .subscribe((res)=>{
      console.log(res);
    });
  }
//-----------------------------------------------------------------------------------------------------------
alertaAgregarDocPracticaProfesor():void{
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
      this.sendFileDocPracticaProfesor();
      //vaciar 
      this.fileDocPracticaProfesor.nativeElement.value = null;

      Swal.fire('Se ha agregado el archivo con exito!!', '', 'success')
      //se borra todo lo que contiene el formulario
      
    } else if (result.isDenied) {
      Swal.fire('No se ha guardado el contenido', '', 'info')
    }
  })
}
alertaAgregarDocCapstoneProfesor():void{
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
      this.sendFileDocCapstoneProfesor();
      //vaciar 
      this.fileDocCapstoneProfesor.nativeElement.value = null;

      Swal.fire('Se ha agregado el archivo con exito!!', '', 'success')
      //se borra todo lo que contiene el formulario
      
    } else if (result.isDenied) {
      Swal.fire('No se ha guardado el contenido', '', 'info')
    }
  })
}
alertaEliminarDocPracticaProfesor(name:String):void{
  Swal.fire({
    title: '¿Está seguro de querer eliminar este archivo?',
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
      this.deleteDocPracticaProfesor(name);
      //vaciar 
      this.fileDocPracticaProfesor.nativeElement.value = null;

      Swal.fire('Se ha eliminado el archivo con exito!!', '', 'success')
      //se borra todo lo que contiene el formulario
      
    } else if (result.isDenied) {
      Swal.fire('No se ha eliminado el contenido', '', 'info')
    }
  })
}
alertaEliminarDocCapstoneProfesor(name:String):void{
  Swal.fire({
    title: '¿Está seguro de querer eliminar este archivo?',
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
      this.deleteDocCapstoneProfesor(name);
      //vaciar 
      this.fileDocCapstoneProfesor.nativeElement.value = null;

      Swal.fire('Se ha eliminado el archivo con exito!!', '', 'success')
      //se borra todo lo que contiene el formulario
      
    } else if (result.isDenied) {
      Swal.fire('No se ha eliminado el contenido', '', 'info')
    }
  })
}

sendFileDocPracticaProfesor():void{
  //this.loading=true;
  const nombre=this.fileTmpDocPracticaProfesor.fileName;
  const body=new FormData();
  body.append('myFile',this.fileTmpDocPracticaProfesor.fileRaw,this.fileTmpDocPracticaProfesor.fileName.replaceAll(" ","_"));
  //conexion con backend
  this.comisionTitulacionPracticaService.sendPostDocPracticaProfesor(body)
  .subscribe((res)=>{
    //this.loading=false;
    console.log(res)
  });
  this.fileDocPracticaProfesor.nativeElement.value = null;
}
sendFileDocCapstoneProfesor():void{
  //this.loading=true;
  const nombre=this.fileTmpDocCapstoneProfesor.fileName;
  const body=new FormData();
  body.append('myFile',this.fileTmpDocCapstoneProfesor.fileRaw,this.fileTmpDocCapstoneProfesor.fileName.replaceAll(" ","_"));
  //conexion con backend
  this.comisionTitulacionPracticaService.sendPostDocCapstoneProfesor(body)
  .subscribe((res)=>{
    //this.loading=false;
    console.log(res)
  });
  this.fileDocCapstoneProfesor.nativeElement.value = null;
}

downloadDocPracticaProfesor(name:String){
  var filenombre= name;
  this.comisionTitulacionPracticaService.downloadFileDocPracticaProfesor(filenombre)
  .subscribe(data=>{
    let downloadURL=window.URL.createObjectURL(data);
    saveAs(downloadURL,filenombre.toString());
  });
}
downloadDocCapstoneProfesor(name:String){
  var filenombre= name;
  this.comisionTitulacionPracticaService.downloadFileDocCapstoneProfesor(filenombre)
  .subscribe(data=>{
    let downloadURL=window.URL.createObjectURL(data);
    saveAs(downloadURL,filenombre.toString());
  });
}
deleteDocPracticaProfesor(name:String){
  var filenombre= name;
  this.comisionTitulacionPracticaService.deleteFileDocPracticaProfesor(filenombre)
  .subscribe((res)=>{
    console.log(res);
  });
}
deleteDocCapstoneProfesor(name:String){
  var filenombre= name;
  this.comisionTitulacionPracticaService.deleteFileDocCapstoneProfesor(filenombre)
  .subscribe((res)=>{
    console.log(res);
  });
}
}
