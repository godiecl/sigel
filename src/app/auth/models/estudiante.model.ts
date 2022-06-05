import { Estudiante } from "../interfaces/estudiante.interface";


export class EstudianteModel implements Estudiante {
    _id_estudiante: number;
    _id_user: number;
    correoPersonal: string;
    carrera: number;
    practicaAprobada: boolean;
    telefono: string;
    estadoAsignacionCP: boolean;
    _id_CCpractica: number;
    _id_preinscripcionCP: number;

    constructor(id: number, iduser: number, correoPersonal: string, carrera: number, practicaAp: boolean, tel: string, eacp: boolean, idccp: number, idprecp: number){

        this._id_estudiante= id;
        this._id_user= iduser;
        this.correoPersonal= correoPersonal;
        this.carrera= carrera;
        this.practicaAprobada= practicaAp;
        this.telefono= tel;
        this.estadoAsignacionCP= eacp;
        this._id_CCpractica= idccp;
        this._id_preinscripcionCP= idprecp;
    }
   
}