import { Estudiante } from "../interfaces/estudiante.interface";


export class EstudianteModel implements Estudiante {
    id_estudiante: number;
    id_usuario: number;
    correoPersonal: string;
    carrera: number;
    practicaAprobada: boolean;
    telefono: string;
    estadoAsignacionCP: boolean;
    id_CCpractica: number;
    id_preinscripcionCP: number;

    constructor(id: number, iduser: number, correoPersonal: string, carrera: number, practicaAp: boolean, tel: string, eacp: boolean, idccp: number, idprecp: number){

        this.id_estudiante= id;
        this.id_usuario= iduser;
        this.correoPersonal= correoPersonal;
        this.carrera= carrera;
        this.practicaAprobada= practicaAp;
        this.telefono= tel;
        this.estadoAsignacionCP= eacp;
        this.id_CCpractica= idccp;
        this.id_preinscripcionCP= idprecp;
    }
   
}