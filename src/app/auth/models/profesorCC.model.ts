import { ProfesorCC } from '../interfaces/profesorCC.interface';



export class ProfesorCCModel implements ProfesorCC {
    _id_profesorCC: number;
    _id_user: number;
    estadoDisponible: boolean;
    telefono: string;

    constructor(id: number, iduser: number, estado: boolean, tel: string){

        this._id_profesorCC= id;
        this._id_user= iduser;
        this.estadoDisponible= estado;
        this.telefono= tel;
    }
   
}