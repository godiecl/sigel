import { Component, OnInit } from '@angular/core';
import { ComisionTitulacionPracticaService } from 'src/app/protected/comision-titulacion-practica/comision-titulacion-practica.service';
import Swal from 'sweetalert2';
import {saveAs} from 'file-saver';
import { Observable, Subscription } from 'rxjs';


@Component({
  selector: 'app-download-informe',
  templateUrl: './download-informe.component.html',
  styleUrls: ['./download-informe.component.css']
})
export class DownloadInformeComponent implements OnInit {

  suscriptionInformePractica!:Subscription;
  fileInfosInformePractica?: Observable<any>;
  constructor(private comisionTitulacionPracticaService:ComisionTitulacionPracticaService) { }

  ngOnInit(): void {
    this.fileInfosInformePractica = this.comisionTitulacionPracticaService.getFilesInformeEstudiante();
    this.suscriptionInformePractica=this.comisionTitulacionPracticaService.refresh$.subscribe(()=>{//refrescar tabla
      this.fileInfosInformePractica = this.comisionTitulacionPracticaService.getFilesInformeEstudiante();
    });
  }

  alertaEliminarInformePractica(name:String):void{
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
        this.deleteInformePractica(name);
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
  downloadInformePractica(name:String){
    var filenombre= name;
    this.comisionTitulacionPracticaService.downloadInformeEstudiante(filenombre)
    .subscribe(data=>{
      let downloadURL=window.URL.createObjectURL(data);
      saveAs(downloadURL,filenombre.toString());
    });
  }
  deleteInformePractica(name:String){
    var filenombre= name;
    this.comisionTitulacionPracticaService.deleteFileInformeEstudiante(filenombre)
    .subscribe((res)=>{
      console.log(res);
    });
  }
}
