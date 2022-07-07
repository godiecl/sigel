import { Component, OnInit } from '@angular/core';
import { Empresa } from 'src/app/auth/interfaces/empresa.interface';
import { EncargadoEmpresa } from 'src/app/auth/interfaces/encargadoEmpresa.interface';
import { EstudianteService } from '../../estudiante.service';

@Component({
  selector: 'app-ver-lista-vacantes',
  templateUrl: './ver-lista-vacantes.component.html',
  styleUrls: ['./ver-lista-vacantes.component.css']
})
export class VerListaVacantesComponent implements OnInit {

  
  displayedColumns!: string[];
  vacantes!: any[];
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
  constructor(private estudianteS: EstudianteService , 
              // private route: ActivatedRoute ,
              // private router: Router
              ) { 
    
  }

  ngOnInit(): void {

    // console.log(this.ELEMENT_DATA)

    this.estudianteS.getListaVacantes().subscribe((vacantes) => {
      console.log(vacantes)

      this.vacantes = vacantes
      this.displayedColumns = ['nombreEmpresa', 'descripcionRequerimientoPractica', 'nombreEncargado', 'apellidoEncargado', 'telefono', 'correo']
      
    })
    
  }

  // isRoute(route: string){
  //   // console.log('route ',route);
  //   // console.log('ruta del ruter', this.router.url)
  //   if(this.router.url === route){
  //     return true
  //   }
  //   return false;
  // }

  // verSolicitud(id: string){

  //   const url =`/dashboard/encargado-practica/ver-solicitudes-estudiante/${id}`
  //   // console.log('si', url)
  //   this.router.navigateByUrl(url)
  // }
  
}


