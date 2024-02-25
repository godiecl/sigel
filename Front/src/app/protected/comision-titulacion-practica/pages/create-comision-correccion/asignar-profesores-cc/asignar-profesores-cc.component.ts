import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';
import { ComisionTitulacionPracticaService } from '../../../comision-titulacion-practica.service';
import { takeUntil } from 'rxjs';
import { Router } from '@angular/router';
import {MatSort, Sort} from '@angular/material/sort';
import Swal from 'sweetalert2';
import {MatTableDataSource} from '@angular/material/table';
import {LiveAnnouncer} from '@angular/cdk/a11y';

@Component({
  selector: 'app-asignar-profesores-cc',
  templateUrl: './asignar-profesores-cc.component.html',
  styleUrls: ['./asignar-profesores-cc.component.css']
})
export class AsignarProfesoresCcComponent implements OnInit, OnDestroy, AfterViewInit {

  dataSource!: MatTableDataSource<never>;
  dataSourceProfes!: MatTableDataSource<never>;

  @ViewChild('estudiantesSort') estudiantesSort = new MatSort();
  @ViewChild('profeSort') profeSort = new MatSort();

  

  listaProfesores!:[];
  listaEstudiantes!:[];
  displayedColumns = ['nombre', 'estado','boton']
  displayedColumns2 = ['nombreEstudiante', 'estadoEstudiante','boton']
  // activarBoton: boolean = true;
  private _unsubscribeAll: Subject<any>;
  comisionNueva!: [];
  profesoresPorAsignar:any[] =[];

  constructor(
    private comisiontpS: ComisionTitulacionPracticaService,
    private router: Router,
    private _liveAnnouncer: LiveAnnouncer
  ) { 
    this._unsubscribeAll = new Subject();
    this.comisiontpS.getProfesoresCC().pipe(takeUntil(this._unsubscribeAll)).subscribe((data)=>{
      // console.log(data);
      this.listaProfesores = data;
      this.dataSourceProfes = new MatTableDataSource(this.listaProfesores);
      console.log(this.listaProfesores)
    })

    this.comisiontpS.getEstudiantes().pipe(takeUntil(this._unsubscribeAll)).subscribe((datos)=>{
      console.log(datos)
      this.listaEstudiantes = datos;
      this.dataSource = new MatTableDataSource(this.listaEstudiantes);
    })

  }
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();

  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {    
    this.dataSource.sort = this.estudiantesSort;
    this.dataSourceProfes.sort = this.profeSort;
  }

  announceSortChange(sortState: Sort) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
  

  cambiarEstado(estado: string, id: any){

    // this.activarBoton = estado;


    let item:any = this.listaProfesores.find((elem: any)=>{
      return elem.id_profesorCC === id;
    })

    item.estado = estado;
    
  }

  cambiarEstadoEstudiante(estado: string, id: any){

    let item:any = this.listaEstudiantes.find((elem: any)=>{
      return elem.id_estudiante === id;
    })

    item.estadoEstudiante = estado;

  }

  alerta(){

    this.profesoresPorAsignar = this.listaProfesores.filter(this.asignando);
    let estudiantesPorAsignar: any = this.listaEstudiantes.filter(this.asignandoEstudiante);
    console.log(this.profesoresPorAsignar)

    if(this.profesoresPorAsignar.length !== 2){
      Swal.fire('Debe seleccionar una dupla de profesores.','','warning')
      return;
    }

    if(estudiantesPorAsignar.length < 1){
      Swal.fire('Seleccione entre 1 y 10 estudiantes.','','warning')
      return;
    }

    if(estudiantesPorAsignar.length > 10){
      Swal.fire('Seleccione entre 1 y 10 estudiantes.','','warning')
      return;
    }

    // if(estudiantesPorAsignar.length === 4){
      let estudiantes: string = 'Estudiantes: <br>';
      let estudiante: string;
      for(let i = 0; i < estudiantesPorAsignar.length; i ++){
        estudiante = `<b>${estudiantesPorAsignar[i].nombreEstudiante} ${estudiantesPorAsignar[i].apellidop} ${estudiantesPorAsignar[i].apellidom} </b> <br>`
        estudiantes = estudiantes + estudiante 
      }

      const mensaje  = `¿Está seguro de querer conformar esta comisión de corrección? <br>
      Profesores: 
      <b>${this.profesoresPorAsignar[0].nombre} ${this.profesoresPorAsignar[0].apellidop} ${this.profesoresPorAsignar[0].apellidom} </b> y
      <b>${this.profesoresPorAsignar[1].nombre} ${this.profesoresPorAsignar[1].apellidop} ${this.profesoresPorAsignar[1].apellidom} </b>
      `;
      const alerta = mensaje + estudiantes + '<br> Si está seguro, seleccione el profesor que será secretario:';
      
      // Estudiantes:
      // <b>${estudiantesPorAsignar[0].nombreEstudiante} ${estudiantesPorAsignar[0].apellidop} ${estudiantesPorAsignar[0].apellidom} </b>
      // <b>${estudiantesPorAsignar[1].nombreEstudiante} ${estudiantesPorAsignar[1].apellidop} ${estudiantesPorAsignar[1].apellidom} </b>
      // <b>${estudiantesPorAsignar[2].nombreEstudiante} ${estudiantesPorAsignar[2].apellidop} ${estudiantesPorAsignar[2].apellidom} </b>
      // <b>${estudiantesPorAsignar[3].nombreEstudiante} ${estudiantesPorAsignar[3].apellidop} ${estudiantesPorAsignar[3].apellidom} </b>

      Swal.fire({
        title: alerta,
        showDenyButton: true,
        showCancelButton: true,
        cancelButtonText: 'Cancelar',
        confirmButtonText: `${this.profesoresPorAsignar[0].nombre}`,
        denyButtonText: `${this.profesoresPorAsignar[1].nombre}`,
        customClass: {
          actions: 'my-actions',
          cancelButton: 'order-1 right-gap',
          confirmButton: 'order-2',
          denyButton: 'order-3',
        }
      }).then((result) => {
        if (result.isConfirmed) {
          
          let idProfesores = [];
          let idEstudiantes = [];
          
            
          idProfesores.push({idProfesor: this.profesoresPorAsignar[0].id_profesorCC, secretario: true })       
          idProfesores.push({idProfesor: this.profesoresPorAsignar[1].id_profesorCC, secretario: false }) 
        
          
          for(let i = 0; i < estudiantesPorAsignar.length ; i++){
            idEstudiantes.push(estudiantesPorAsignar[i].id_estudiante) 
          }
  
          //
          this.conformarComision(idProfesores, idEstudiantes);
  
          // Swal.fire('Usuario se ha agregado con exito!!', '', 'success')
          //se borra todo lo que contiene el formulario
          
        } else if (result.isDenied) {
          
          let idProfesores = [];
          let idEstudiantes = [];
          
          idProfesores.push({idProfesor: this.profesoresPorAsignar[1].id_profesorCC, secretario: true })       
          idProfesores.push({idProfesor: this.profesoresPorAsignar[0].id_profesorCC, secretario: false }) 
        

          for(let i = 0; i < estudiantesPorAsignar.length ; i++){
            idEstudiantes.push(estudiantesPorAsignar[i].id_estudiante) 
          }
  
          //
          this.conformarComision(idProfesores, idEstudiantes);
        } else if (result.isDismissed){
          return;
        }
      })
   
  }

  asignando(x: any){
    return x.estado === 'asignando';
  }

  asignandoEstudiante(x: any){
    return x.estadoEstudiante === 'asignando';
  }

  conformarComision(idProfesores: any, idEstudiantes: any){

    console.log(idProfesores)
    console.log(idEstudiantes)

    let data = {idEstudiantes, idProfesores}
    this.comisiontpS.postCCpractica(data).pipe(takeUntil(this._unsubscribeAll)).subscribe((resp:any)=>{
      if(resp.ok){
        Swal.fire('Se ha conformado la comisión de corrección exitosamente.','','success')
        this.router.navigateByUrl('/dashboard/comision-titulacion-practica/crear-comision-correccion')
      }else{
        Swal.fire('Ha ocurrido un error','','error');
      }
      
    })

  }

  volver(){
    this.router.navigateByUrl('/dashboard/comision-titulacion-practica/crear-comision-correccion')
  }


}
