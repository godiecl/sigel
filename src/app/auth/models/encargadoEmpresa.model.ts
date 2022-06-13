import { EncargadoEmpresa } from "../interfaces/encargadoEmpresa.interface";


export class EncargadoEmpresaModel implements EncargadoEmpresa {
    
    cargo: string;
    telefono: string;
    id_usuario: number;
    constructor(cargo: string, telefono: string, id: number){
     this.cargo = cargo;
     this.telefono = telefono;  
     this.id_usuario = id
    }
   
}