export interface SolicitudCartaVacante{
    id_solicitudCartaVacante: number,
    periodoRealizar: string,
    ciudadRealizar: string,
    anioRealizar: string,
    estado?: string,
    estadoRespuesta?: string,
    fechaInicio?: Date,
    fechaFinal?: Date,
    // id_empresa?: number,
    id_solicitudEstudiante?: number,
    id_estudiante?: number,
}