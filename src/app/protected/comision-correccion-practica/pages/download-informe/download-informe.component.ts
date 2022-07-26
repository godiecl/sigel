import { Component, OnInit, ChangeDetectorRef, Inject } from '@angular/core';
import { ComisionTitulacionPracticaService } from 'src/app/protected/comision-titulacion-practica/comision-titulacion-practica.service';
import Swal from 'sweetalert2';
import {saveAs} from 'file-saver';
import { Observable, Subscription } from 'rxjs';
import { UsuarioLog } from '../../../../auth/interfaces/usuarioLog.interface';
import { AuthService } from '../../../../auth/services/auth.service';
import { AdministradorService } from '../../../administrador/services/administrador.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ComisionCorreccionPracticaService } from '../../comision-correccion-practica.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogObservacionesComponent } from './dialog-observaciones/dialog-observaciones.component';


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
    notaEvaluador1: [null, []],
    notaEvaluador2: [null, []]
  })
  observacionesEvaluador1!: string;
  observacionesEvaluador2!: string;
  nombreProfesor1!: string;
  nombreProfesor2!: string;

  constructor(
    private cdr: ChangeDetectorRef,
    private comisionTitulacionPracticaService:ComisionTitulacionPracticaService,
    private comisionCCService: ComisionCorreccionPracticaService,
    private authS: AuthService,
    private adminS: AdministradorService,
    private fb: FormBuilder,
    public dialog: MatDialog
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
            // this.observacionesEvaluador1 = this.fileInfosInformePractica[]
            this.profesores = resp[0].profesores;
            this.nombreProfesor1 = this.profesores[0].nombre + ' '+ this.profesores[0].apellidop + ' '+ this.profesores[0].apellidom
            this.nombreProfesor2 = this.profesores[1].nombre + ' '+ this.profesores[1].apellidop + ' '+ this.profesores[1].apellidom
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


  downloadInformePractica(name:String){
    var filenombre= name;
    this.comisionTitulacionPracticaService.downloadInformeEstudiante(filenombre)
    .subscribe(data=>{
      let downloadURL=window.URL.createObjectURL(data);
      saveAs(downloadURL,filenombre.toString());
    });
  }

  openDialog(id_informePractica: any): void {

    console.log('id informe: ',id_informePractica)

    if(!this.notasForm.value.notaEvaluador1 && !this.notasForm.value.notaEvaluador2 ){
      Swal.fire('No ha ingresado nota o notas','','warning');
      return;
    }
    if(this.notasForm.value.notaEvaluador1 > 7 || this.notasForm.value.notaEvaluador2  > 7){
      Swal.fire('El máximo de notas es 7.0 ','','warning');
      return;
    }
    const informe: any = this.fileInfosInformePractica.find((info:any)=>{
      return info.id_informePractica === id_informePractica;
    })
    this.observacionesEvaluador1 = informe.observacionesEvaluador1;
    this.observacionesEvaluador2 = informe.observacionesEvaluador2;

    console.log('observacion 1 ', this.observacionesEvaluador1)
    console.log('observacion 2 ', this.observacionesEvaluador2) 

    const dialogRef = this.dialog.open(DialogObservacionesComponent, {
      width: '850px',
      data: {
        nombreProfesor1: this.nombreProfesor1,
        nombreProfesor2: this.nombreProfesor2,
        observacionesEvaluador1: this.observacionesEvaluador1, 
        observacionesEvaluador2: this.observacionesEvaluador2,

      },
    });

    dialogRef.afterClosed().subscribe(result => {
      if(!result){
        Swal.fire('No se ha evaluado el informe de práctica', '', 'info')
        return 
      }
      
      console.log('The dialog was closed', result);
      this.observacionesEvaluador1 = result.observacionEvaluador1;
      this.observacionesEvaluador2 = result.observacionEvaluador2;
      this.calificarInforme(id_informePractica);
    });
  
  }



  calificarInforme(id_informePractica: any){
    console.log(id_informePractica)
    let data = this.notasForm.getRawValue()
    data.observacionesEvaluador1 = this.observacionesEvaluador1;
    data.observacionesEvaluador2 = this.observacionesEvaluador2;
    console.log(data);
    this.comisionCCService.evaluarInforme(id_informePractica, data).subscribe((resp)=>{
      if(resp.ok){
        Swal.fire(resp.msg, '', 'success');
        let informe:any = this.fileInfosInformePractica.find((obj:any)=>{
          return obj.id_informePractica === id_informePractica
        })
        informe.notaEvaluador1 = this.notasForm.value.notaEvaluador1;
        informe.notaEvaluador2 = this.notasForm.value.notaEvaluador2;
        if(informe.notaEvaluador2 > 0 && informe.notaEvaluador1 > 0){
          this.comisionCCService.getNotaFinal(id_informePractica).subscribe((resp:any)=>{
            if(resp.ok){
              console.log(resp);
              // let informe:any = this.fileInfosInformePractica.find((obj:any)=>{
                // return obj.id_informePractica === id_informePractica
              // })
              informe.notaFinal = resp.notaFinal;
              informe.editarNota = false;
              this.cdr.detectChanges();
            }
          })
        }
        // this.cdr.detectChanges();
      }else{
        Swal.fire(resp.msg, '', 'error')
      }
    })
  }

  editarNota(id: any){
    let informe:any = this.fileInfosInformePractica.find((obj:any)=>{
             return obj.id_informePractica === id
    })
    informe.editarNota = true;
    this.notasForm = this.fb.group({
      notaEvaluador1: [informe.notaEvaluador1, ],
      notaEvaluador2: [informe.notaEvaluador2, ]
    })
    informe.notaEvaluador1 = null;
    informe.notaEvaluador2 = null;

  }

  // getNotaFinal(id_informePractica: any) {
   
  // }

    // deleteInformePractica(name:String){
  //   var filenombre= name;
  //   this.comisionTitulacionPracticaService.deleteFileInformeEstudiante(filenombre)
  //   .subscribe((res:any)=>{
  //     console.log(' resp delete',res);
  //     if(res.ok){
        
  //     let actualizar: any = this.fileInfosInformePractica.find((obj:any)=>{
  //       return obj.name === filenombre;
  //     })
  //     this.fileInfosInformePractica.splice(actualizar, 1);
  //     // console.log('solicitud completada:',actualizar)
  //     this.cdr.detectChanges();
  //     }

  //   });
  // }
}


  // alertaEliminarInformePractica(name:String):void{
  //   Swal.fire({
  //     title: '¿Está seguro de querer eliminar este archivo?',
  //     showDenyButton: true,
  //     showCancelButton: false,
  //     confirmButtonText: 'Si',
  //     denyButtonText: 'No',
  //     customClass: {
  //       actions: 'my-actions',
  //       cancelButton: 'order-1 right-gap',
  //       confirmButton: 'order-2',
  //       denyButton: 'order-3',
  //     }
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       //
  //       this.deleteInformePractica(name);
  //       //alerta
  //       Swal.fire({
  //         position: 'center',
  //         icon: 'success',
  //         title: 'Se ha eliminado el archivo con exito!!',
  //         showConfirmButton: false,
  //         timer: 1500
  //       })
  //       //timer reload 
  //       // window.setTimeout(function(){location.reload()},1500)

        
  //     } else if (result.isDenied) {
  //       Swal.fire('No se ha eliminado el contenido', '', 'info')
  //     }
  //   })
  // }

    // alertaSeguroCalificar(id_informePractica: any){

  //   // if(this.notasForm.value.notaEvaluador1 < 1 || this.notasForm.value.notaEvaluador2  < 1){
  //   //   Swal.fire('El mínimo de notas es 1.0 ','','warning');
  //   //   return;
  //   // }

  //   // Swal.fire({
  //   //   title: '¿Está seguro de querer calificar este informe?',
  //   //   showDenyButton: true,
  //   //   showCancelButton: false,
  //   //   confirmButtonText: 'Si',
  //   //   denyButtonText: 'No',
  //   //   customClass: {
  //   //     actions: 'my-actions',
  //   //     cancelButton: 'order-1 right-gap',
  //   //     confirmButton: 'order-2',
  //   //     denyButton: 'order-3',
  //   //   }
  //   // }).then((result) => {
  //   //   if (result.isConfirmed) {
  //       //
        
  //       //alerta
  //       // Swal.fire({
  //       //   position: 'center',
  //       //   icon: 'success',
  //       //   title: 'Se ha eliminado el archivo con exito!!',
  //       //   showConfirmButton: false,
  //       //   timer: 1500
  //       // })
  //       //timer reload 
  //       // window.setTimeout(function(){location.reload()},1500)

        
  //     // } else if (result.isDenied) {
       
  //   //   }
  //   // })
  // }
