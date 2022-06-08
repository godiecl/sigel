import { ProfesorGuiaCP } from '../interfaces/profesorGuiaCP.interface';


export class ProfesorGuiaCPModel implements ProfesorGuiaCP {
    _id_profesorGuia: number;
    disc_empresa: string;
    interesOtroCP: boolean;
    _id_user: number;
    telefono: string;

    constructor(id: number, iduser: number, telefono: string, estado: boolean, disc_empresa: string){

        this._id_profesorGuia = id,
        this.disc_empresa = disc_empresa,
        this.interesOtroCP = estado,
        this.telefono = telefono,
        this._id_user = iduser
    }
   
   
}