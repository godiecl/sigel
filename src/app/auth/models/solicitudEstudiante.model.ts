import { SolicitudEstudiante } from '../interfaces/solicitudEstudiante.interface';


export class SolicitudEstudianteModel implements SolicitudEstudiante {
    id: string;
    nombreProyecto: string;
    problemaResolver: string;
    area: string;
    solucion: string;
    entregableFinal: string;
    importancia: string;
    plazo: string;
    infoAdicional?: string;
    disposicionMonetaria: string;
    modalidad: string;
    fechaEnvio: Date;
    estadoAsignacionCP?: boolean | undefined;
    estadoAutorizacion?: boolean | undefined;
    comentarioAutorizacion?: string | undefined;
    descripcionRequerimientoPractica?: string | undefined;
    id_encargadoEmpresa: string;
    
    constructor(id: string, nombreProyecto: string, problema: string, 
                area: string, solucion: string, entregable: string, importancia: string,
                plazo: string, disposicion: string, modalidad: string, fechaEnvio: Date, id_encargadoEmpresa: string){

                    this.id  = id;
                    this.nombreProyecto  = nombreProyecto
                    this.problemaResolver  = problema 
                    this.area  = area
                    this.solucion  = solucion
                    this.entregableFinal  = entregable
                    this.importancia  = area
                    this.plazo  = plazo
                    this.disposicionMonetaria  = disposicion 
                    this.modalidad  = modalidad
                    this.fechaEnvio  = fechaEnvio 
                    this.id_encargadoEmpresa = id_encargadoEmpresa
                }
}