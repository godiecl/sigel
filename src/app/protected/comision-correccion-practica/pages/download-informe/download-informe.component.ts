import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ComisionTitulacionPracticaService } from 'src/app/protected/comision-titulacion-practica/comision-titulacion-practica.service';
import Swal from 'sweetalert2';
import {saveAs} from 'file-saver';
import { Observable, Subscription } from 'rxjs';
import { TablaInforme } from '../../../../auth/interfaces/documentos/tablaInforme.interface';
import { UsuarioLog } from '../../../../auth/interfaces/usuarioLog.interface';
import { AuthService } from '../../../../auth/services/auth.service';
import { AdministradorService } from '../../../administrador/services/administrador.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-download-informe',
  templateUrl: './download-informe.component.html',
  styleUrls: ['./download-informe.component.css']
})
export class DownloadInformeComponent implements OnInit {

  suscriptionInformePractica!:Subscription;
  // data!: TablaInforme;
  fileInfosInformePractica !: [];
  profesores!: any;
  displayedColumns!: string[];
  estados: string []= ['pendiente', 'aprobado', 'reprobado'];
  usuarioLog!: UsuarioLog;
  profesorCCLog!: any;
  notasForm: FormGroup = this.fb.group({
    notaEvaluador1: ['', []],
    notaEvaluador2: ['', []]
  })

  constructor(
    private cdr: ChangeDetectorRef,
    private comisionTitulacionPracticaService:ComisionTitulacionPracticaService,
    private authS: AuthService,
    private adminS: AdministradorService,
    private fb: FormBuilder,
    ) {
      

     }

  ngOnInit(): void {

    // console.log('this profe nginit', this.profesorCCLog)
    this.usuarioLog = this.authS.usuario;
      this.adminS.obtenerProfesorCCPorIdUsuario(this.usuarioLog.id).subscribe((profesor: any)=>{
        // console.log(profesor);
        if(profesor.id_comisionCorreccion !== null){
          this.profesorCCLog = profesor;
        // console.log(this.profesorCCLog)
        this.comisionTitulacionPracticaService.getFilesInformeEstudiante(this.profesorCCLog.id_comisionCorreccion).subscribe(
          (resp:any)=>{
            console.log('console log de get files ',resp)
            this.fileInfosInformePractica = resp[0].informes;
            this.profesores = resp[0].profesores;
            console.log(this.profesores)
            console.log(this.fileInfosInformePractica)
            this.displayedColumns = ['nombreEstudiante','rutEstudiante','nombre', 'notaEvaluador1','notaEvaluador2','notaFinal', 'descargar', 'evaluar']
          }
        )
        }else{
          Swal.fire('No perteneces a una comisión de corrección','','error')
        }
      })

    
    this.comisionTitulacionPracticaService.refresh$.subscribe(()=>{//refrescar tabla
      this.comisionTitulacionPracticaService.getFilesInformeEstudiante(this.profesorCCLog.id_comisionCorreccion).subscribe(
        (resp)=>{
          console.log('console log de refresh',resp)
          this.fileInfosInformePractica = resp;
        }
      )
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
        // window.setTimeout(function(){location.reload()},1500)

        
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
    .subscribe((res:any)=>{
      console.log(' resp delete',res);
      if(res.ok){
        
      let actualizar: any = this.fileInfosInformePractica.find((obj:any)=>{
        return obj.name === filenombre;
      })
      this.fileInfosInformePractica.splice(actualizar, 1);
      // console.log('solicitud completada:',actualizar)
      this.cdr.detectChanges();
      }

    });
  }

  evaluarInforme(name: string){
    
  }
}
