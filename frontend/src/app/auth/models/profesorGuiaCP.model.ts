import { ProfesorGuiaCP } from '../interfaces/profesorGuiaCP.interface';


export class ProfesorGuiaCPModel implements ProfesorGuiaCP {
    id_profesorGuia: number;
    disc_empresa: string;
    interesOtroCP: boolean;
    id_usuario: number;
    telefono: string;

    constructor(id: number, iduser: number, telefono: string, estado: boolean, disc_empresa: string){

        this.id_profesorGuia = id,
        this.disc_empresa = disc_empresa,
        this.interesOtroCP = estado,
        this.telefono = telefono,
        this.id_usuario = iduser
    }
   
   
}