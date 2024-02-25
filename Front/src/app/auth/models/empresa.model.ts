import { Empresa } from "../interfaces/empresa.interface";


export class EmpresaModel implements Empresa {


    id_empresa: number;
    nombreEmpresa: string;
    rutEmpresa: string;
    giroEmpresa: string;
    constructor(id: number, nombre: string, rut: string, giro :string){
     this.id_empresa = id;
     this.nombreEmpresa = nombre;
     this.rutEmpresa = rut;
     this.giroEmpresa = giro;   
    }
   
}