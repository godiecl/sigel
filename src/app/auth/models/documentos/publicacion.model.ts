import { Publicacion } from "../../interfaces/documentos/publicacion.interface";


export class PublicacionModel implements Publicacion {
    id_publicacion: string;
    remitente: string;
    asunto: string;
    mensaje: string;
    fecha: Date;

    constructor( id_publicacion: string, remitente: string, asunto: string, mensaje: string, fecha: Date){

        this.id_publicacion = id_publicacion ;
        this.remitente = remitente;
        this.asunto =asunto ;
        this.mensaje = mensaje;
        this.fecha = fecha;
    }
    
}