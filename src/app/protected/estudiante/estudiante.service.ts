import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/internal/Observable";
import { SolicitudCartaVacante } from "src/app/auth/interfaces/documentos/solicitudCartaVacante";
import { environment } from "src/environments/environment";


@Injectable({
    providedIn: 'root'
  })
  export class EstudianteService {
  
    private baseUrl: string = environment.baseUrl;
  
    constructor(private http: HttpClient) { }

    getListaVacantes(): Observable<any[]> {

        const url = `${this.baseUrl}lista-vacantes`;
        return this.http.get<any>(url)
    }

    getEmpresasSolicitadoEstudiante(): Observable<any[]> {

      const url = `${this.baseUrl}emp-solicitado-estudiante`;
      return this.http.get<any>(url)
    }

    crearSolicitudVacante(solicitud: SolicitudCartaVacante): Observable<SolicitudCartaVacante>{

      const url = `${this.baseUrl}solicitud-carta-vacantes`;
      return this.http.post<SolicitudCartaVacante>(url, {solicitud})
    }
  
}