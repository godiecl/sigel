import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SolicitudEstudiante } from '../../auth/interfaces/documentos/solicitudEstudiante.interface';
import { environment } from 'src/environments/environment';
import { Observable, Subject, tap } from 'rxjs';
import { EncargadoEmpresa } from 'src/app/auth/interfaces/encargadoEmpresa.interface';
import { Empresa } from '../../auth/interfaces/empresa.interface';
import { SolicitudCartaVacante } from 'src/app/auth/interfaces/documentos/solicitudCartaVacante';

@Injectable({
  providedIn: 'root'
})
export class EncargadoEmpresaService {

  private baseUrl: string = environment.baseUrl;
  private _refreshRequired = new Subject<void>();

  get Refreshrequider(){
    return this._refreshRequired;
  }

  constructor(private http: HttpClient) { }
    
  getListaResponderCartaVacante(id_encargadoEmpresa: number): Observable<any>{

    const url = `${this.baseUrl}lista-responder-carta-vacante${id_encargadoEmpresa}`
    return this.http.get<any>(url)
  }

  getSolicitudCartaVacante(id_solicitudCartaVacante: any): Observable<SolicitudCartaVacante> {

    const url = `${this.baseUrl}solicitud-carta-vacantes${id_solicitudCartaVacante}`;
    return this.http.get<any>(url)
  }

  verSolicitudCartaVacante(id_solicitudCartaVacante: any): Observable<SolicitudCartaVacante> {

    const url = `${this.baseUrl}ver-solicitud-carta-vacantes${id_solicitudCartaVacante}`;
    return this.http.get<any>(url)
  }
  
  responderSolicitudCartaVacante(carta: any ): Observable<any> {

    const url = `${this.baseUrl}solicitud-carta-vacantes${carta.id_solicitudCartaVacante}`;
    return this.http.patch<any>(url, carta).pipe(
      tap(()=>{
        this._refreshRequired.next();
      })
    )
  }

  crearEvaluacionEmpresa(evaluacionEmpresa: any): Observable<any>{
    const url = `${this.baseUrl}evaluacion-empresa/`;
    return this.http.post<any>(url, evaluacionEmpresa)
  }

  getEstudiantesAsociados(id_encargadoEmpresa: any): Observable<any>{
    const url = `${this.baseUrl}evaluacion-empresa/listaEstudiantesAsociados${id_encargadoEmpresa}`;
    return this.http.get<any>(url)
  }
 
  getEstudiantesEditarEvaluacionEmpresa(id_usuario: any): Observable<any>{
    const url = `${this.baseUrl}estudiantes-editar-evaluacion-empresa/${id_usuario}`;
    return this.http.get<any>(url)
  }

  editarEvaluacionEmpresa(id_usuario: any, data: any): Observable<any>{
    const url = `${this.baseUrl}evaluacion-empresa/${id_usuario}`;
    return this.http.patch<any>(url, data).pipe(
      tap(()=>{
        this._refreshRequired.next();
      })
    )
  }

}