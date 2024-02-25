import { Publicacion } from "../../interfaces/documentos/publicacion.interface";


export class PublicacionModel implements Publicacion {
    id_publicacion: number;
    remitente: string;
    asunto: string;
    mensaje: string;
    id_comisionPracticaTitulacion: number;

    constructor( id_publicacion: number, remitente: string, asunto: string, mensaje: string, id_comisionPracticaTitulacion: number){

        this.id_publicacion = id_publicacion ;
        this.remitente = remitente;
        this.asunto =asunto ;
        this.mensaje = mensaje;
        this.id_comisionPracticaTitulacion = id_comisionPracticaTitulacion
    }
    
}