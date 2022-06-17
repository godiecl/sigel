import { EncargadoEmpresa } from "../interfaces/encargadoEmpresa.interface";


export class EncargadoEmpresaModel implements EncargadoEmpresa {
    
    cargo: string;
    telefono: string;
    id_usuario: number;
    id_empresa: number;
    id_encargadoEmpresa: number;
    constructor(id_encargado: number,cargo: string, telefono: string, id: number, id_empresa: number){
     this.id_encargadoEmpresa = id_encargado;
     this.cargo = cargo;
     this.telefono = telefono;  
     this.id_usuario = id;
     this.id_empresa = id_empresa;
    }
   
}