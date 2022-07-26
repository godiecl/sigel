import { Component, OnInit,ViewChild, ElementRef } from '@angular/core';
import { ComisionTitulacionPracticaService } from 'src/app/protected/comision-titulacion-practica/comision-titulacion-practica.service'; 
import Swal from 'sweetalert2';
import {saveAs} from 'file-saver';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from '../../../../auth/services/auth.service';
import { AdministradorService } from '../../../administrador/services/administrador.service';
import { Estudiante } from '../../../../auth/interfaces/estudiante.interface';

@Component({
  selector: 'app-upload-informe',
  templateUrl: './upload-informe.component.html',
  styleUrls: ['./upload-informe.component.css']
})
export class UploadInformeComponent implements OnInit {
  @ViewChild('fileInformeEstudiante') fileInformeEstudiante!:ElementRef;

  private fileTmpInformeEstudiante:any;
  estudiante!: number;
  hayArchivo: boolean = false;

  constructor(
    private authS: AuthService ,
    private adminS: AdministradorService ,
    private comisionTitulacionPracticaService:ComisionTitulacionPracticaService,
    ) {
      const usuarioLogId = authS.usuario.id;
      this.adminS.obtenerEstudiantePorIdUsuario(usuarioLogId).subscribe(
        (resp)=>{
          this.estudiante = resp.id_estudiante;
          console.log(this.estudiante)
        }
      )
   }

  ngOnInit(): void {
  }
  getFileInformeEstudiante($event:any):void{
    const [file] = $event.target.files;
    this.fileTmpInformeEstudiante = {
      fileRaw:file,
      fileName:file.name
    }
    this.hayArchivo = true;
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
        if(this.hayArchivo){
          this.sendFileInformeEstudiante();
        }else{
          Swal.fire('No ha seleccionado ningún archivo','','warning')
          return
        }
        
        //vaciar 
        // this.fileInformeEstudiante.nativeElement.value = null;

      } else if (result.isDenied) {
        Swal.fire('No se ha guardado el contenido', '', 'info')
      }
    })
  }
  sendFileInformeEstudiante():void{
    //this.loading=true;
    // ALMACENAR EN HDD.
    const nombre = this.fileTmpInformeEstudiante.fileName.replaceAll(" ","_");
    const body=new FormData();
    body.append('myFile',this.fileTmpInformeEstudiante.fileRaw,this.fileTmpInformeEstudiante.fileName.replaceAll(" ","_"));
   
    // console.log('body tiene:',body);
    // console.log('nombre del archivo: ', nombre);
    //conexion con backend
    this.comisionTitulacionPracticaService.sendPostInformeEstudiante(body)
    .subscribe((res)=>{
      //this.loading=false;
      // console.log(res)
      const data = {
        ruta: nombre,
        id_estudiante: this.estudiante,
      }
      this.comisionTitulacionPracticaService.postInformePractica(data).subscribe((resp)=>{
        if(resp.ok){
          Swal.fire('Se ha almacenado el archivo con éxito','','success');
        }else if(!resp.ok){
          console.log(resp)
          Swal.fire(resp.msg,'','error');
        }
      })
    });

    // ALMACENAR EN BDD:
    

    this.fileInformeEstudiante.nativeElement.value = null;
  }


}
