import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Subject, take, takeUntil } from 'rxjs';
import {saveAs} from 'file-saver';
import Swal from 'sweetalert2';
import { SecretariaService } from '../../secretaria.service';
import { ComisionTitulacionPracticaService } from '../../../comision-titulacion-practica/comision-titulacion-practica.service';

@Component({
  selector: 'app-hemeroteca',
  templateUrl: './hemeroteca.component.html',
  styleUrls: ['./hemeroteca.component.css']
})
export class HemerotecaComponent implements OnInit {
  
  informes: [] = [];
  displayedColumns!: string[];
  dataSource!: MatTableDataSource<never>;

  constructor(
    private secretariaS: SecretariaService,
    private ctpS: ComisionTitulacionPracticaService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {

    this.secretariaS.getTodosInforme().pipe(take(1))
    .subscribe((data: any)=>{
      console.log('data: ',data);
      if(data.ok){

        this.informes = data.datos;
        this.dataSource = new MatTableDataSource(this.informes);
      }else{
        Swal.fire('No hay informes disponibles.','','error')
        this.router.navigateByUrl('/dashboard/main-menu')
      }
      
      
    })
    
  this.displayedColumns = ['nombre','nombreEstudiante', 'rutEstudiante', 'fecha']

  }

  filtrar(event: Event) {
    const filtro = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filtro.trim().toLowerCase();
  } 

  downloadInformePractica(filename :String){
    let nombreArchivo = filename
    this.ctpS.downloadInformeEstudiante(filename)
    .subscribe(data=>{
      let downloadURL=window.URL.createObjectURL(data);
      saveAs(downloadURL, nombreArchivo.toString());
    });
  }

}
