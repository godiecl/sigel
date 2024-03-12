import { ProfesorCC } from '../interfaces/profesorCC.interface';



export class ProfesorCCModel implements ProfesorCC {
    id_profesorCC: number;
    id_usuario: number;
    estadoDisponible: boolean;
    telefono: string;

    constructor(id: number, iduser: number, estado: boolean, tel: string){

        this.id_profesorCC= id;
        this.id_usuario= iduser;
        this.estadoDisponible= estado;
        this.telefono= tel;
    }
   
}