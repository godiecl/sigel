import { Component, OnInit } from '@angular/core';


// import { Component } from "@angular/core";
import { EncargadoTitulacionPracticaService } from '../../encargado-titulacion-practica.service';
import { SolicitudEstudiante } from '../../../../auth/interfaces/documentos/solicitudEstudiante.interface';
import { EncargadoEmpresa } from 'src/app/auth/interfaces/encargadoEmpresa.interface';
import { Empresa } from '../../../../auth/interfaces/empresa.interface';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-ver-solicitudes-estudiante',
  templateUrl: './ver-solicitudes-estudiante.component.html',
  styleUrls: ['./ver-solicitudes-estudiante.component.css']
})
export class VerSolicitudesEstudianteComponent implements OnInit {

  
  // const solicitudesEstudiante: SolicitudEstudiante[] = this.encargadoTP.solicitudesEstudiante().subscribe((solicitudes: SolicitudEstudiante[]) => {
  //   // console.log(solicitudes)
  //   this.solicitudesEstudiante = solicitudes;
    
  // })
  displayedColumns!: string[];
  solicitudesEstudiante!: [];
  encargadosEmpresa!: EncargadoEmpresa[];
  empresas!: Empresa[];

//   ELEMENT_DATA: PeriodicElement[] = [
//   {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
//   {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
//   {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
//   {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
//   {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
//   {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
//   {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
//   {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
//   {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
//   {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
// ];
  constructor(private encargadoTP: EncargadoTitulacionPracticaService, 
              private route: ActivatedRoute ,
              private router: Router
              ) { 
    
  }

  ngOnInit(): void {

    // // console.log(this.ELEMENT_DATA)

    this.encargadoTP.getSolicitudesEstudianteTabla().subscribe((solicitudes) => {
      // // console.log(solicitudes)

      this.solicitudesEstudiante = solicitudes
      this.displayedColumns = ['nombreProyecto', 'nombreEmpresa', 'nombreEncargado', 'apellidoEncargado', 'telefono', 'estado', 'boton']
      
    })
    
  }

  isRoute(route: string){
    // // console.log('route ',route);
    // // console.log('ruta del ruter', this.router.url)
    if(this.router.url === route){
      return true
    }
    return false;
  }

  verSolicitud(id: string){
    const url =`/dashboard/encargado-practica/ver-solicitudes-estudiante/${id}`
    // // console.log('si', url)
    this.router.navigateByUrl(url)
  }
  
}

// export interface PeriodicElement {
//   name: string;
//   position: number;
//   weight: number;
//   symbol: string;
// }

// const ELEMENT_DATA: PeriodicElement[] = [
//   {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
//   {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
//   {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
//   {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
//   {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
//   {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
//   {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
//   {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
//   {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
//   {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
// ];

// /**
//  * @title Styling columns using their auto-generated column names
//  */
// @Component({
//     selector: 'app-ver-solicitudes-estudiante',
//   templateUrl: './ver-solicitudes-estudiante.component.html',
//   styleUrls: ['./ver-solicitudes-estudiante.component.css']
// })
// export class VerSolicitudesEstudianteComponent {
//   displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
//   dataSource = ELEMENT_DATA;
// }
