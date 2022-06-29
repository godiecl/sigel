export interface SolicitudEstudiante {
    id_solicitudEstudiante: string,
    nombreProyecto: string,
    problemaResolver: string,
    area: string,
    solucion: string,
    entregableFinal: string,
    importancia: string,
    plazo: string,
    infoAdicional?: string,
    disposicionMonetaria: string,
    modalidad: string,
    fechaEnvio: Date,
    estadoAsignacionCP?: boolean,
    estadoAutorizacion?: boolean,
    comentarioAutorizacion?: string,
    descripcionRequerimientoPractica?: string,
    id_encargadoEmpresa: number
}