import { Empresa } from "../interfaces/empresa.interface";


export class EmpresaModel implements Empresa {
    
    nombreEmpresa: string;
    rutEmpresa: string;
    giroEmpresa: string;
    constructor(nombre: string, rut: string, giro :string){
     this.nombreEmpresa = nombre;
     this.rutEmpresa = rut;
     this.giroEmpresa = giro;   
    }
   
}