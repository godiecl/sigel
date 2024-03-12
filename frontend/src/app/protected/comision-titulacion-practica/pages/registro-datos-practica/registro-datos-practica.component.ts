import { Component, OnInit, ViewChild, OnDestroy, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ComisionTitulacionPracticaService } from '../../comision-titulacion-practica.service';
import Swal from 'sweetalert2';
import { MatSort } from '@angular/material/sort';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-registro-datos-practica',
  templateUrl: './registro-datos-practica.component.html',
  styleUrls: ['./registro-datos-practica.component.css']
})
export class RegistroDatosPracticaComponent implements OnInit, OnDestroy, AfterViewInit {

  dataSource!: MatTableDataSource<any>;
  @ViewChild('seguimientoSort') seguimientoSort = new MatSort();

  private _unsubscribeAll: Subject<any> = new Subject();
  data!: any[];
  displayedColumns!: string[];
  constructor(
    private ctpSv: ComisionTitulacionPracticaService,
  ) { }
  ngAfterViewInit() {    
    this.dataSource.sort = this.seguimientoSort;
  }
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();

  }
  ngOnInit(): void {
    this.ctpSv.getEstudiantesRegistro().subscribe((resp)=>{
      if(resp.ok){
        console.log(resp)
        this.data = resp.datos
        console.log(this.data)
        this.dataSource = new MatTableDataSource(this.data)
        this.displayedColumns = ['apellidopEstudiante', 'apellidomEstudiante','nombreEstudiante','rut', 'carrera' , 'nombreProyecto', 'nombreEmpresa','rutEmpresa' ,'nombreProfesorS' ,'nombreProfesor2' , 'fechaInicio','fechaFinal', 'fechaDefensa' ,'notaEmpresa' ,'notaInforme','notaDefensa','notaFinal']
      }else{
        Swal.fire('Ha ocurrido un erorr',resp.msg,'error')
      }
    })
  }

  filtrar(event: Event) {
    const filtro = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filtro.trim().toLowerCase();
  } 

}
