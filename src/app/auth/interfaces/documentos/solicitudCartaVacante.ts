export interface SolicitudCartaVacante{
    id_solicitudCartaVacante: number,
    periodoRealizar: string,
    ciudadRealizar: string,
    anioRealizar: string,
    estado?: string,
    // id_empresa?: number,
    id_solicitudEstudiante?: number,
    id_estudiante?: number,
}