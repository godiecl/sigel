import { Publicacion } from "../../interfaces/documentos/publicacion.interface";


export class PublicacionModel implements Publicacion {
    id_publicacion: string;
    remitente: string;
    asunto: string;
    mensaje: string;
    fecha: Date;
    id_comisionPracticaTitulacion: string;

    constructor( id_publicacion: string, remitente: string, asunto: string, mensaje: string, fecha: Date, id_comisionPracticaTitulacion: string){

        this.id_publicacion = id_publicacion ;
        this.remitente = remitente;
        this.asunto =asunto ;
        this.mensaje = mensaje;
        this.fecha = fecha;
        this.id_comisionPracticaTitulacion = id_comisionPracticaTitulacion
    }
    
}