import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SolicitudEstudiante } from '../../auth/interfaces/documentos/solicitudEstudiante.interface';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { EncargadoEmpresa } from 'src/app/auth/interfaces/encargadoEmpresa.interface';
import { Empresa } from '../../auth/interfaces/empresa.interface';
import { SolicitudCartaVacante } from 'src/app/auth/interfaces/documentos/solicitudCartaVacante';

@Injectable({
  providedIn: 'root'
})
export class EncargadoEmpresaService {

  private baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) { }
    
  getListaResponderCartaVacante(id_encargadoEmpresa: number): Observable<any>{

    const url = `${this.baseUrl}lista-responder-carta-vacante${id_encargadoEmpresa}`
    return this.http.get<any>(url)
  }

  getSolicitudCartaVacante(id_solicitudCartaVacante: any): Observable<SolicitudCartaVacante> {

    const url = `${this.baseUrl}solicitud-carta-vacantes${id_solicitudCartaVacante}`;
    return this.http.get<any>(url)
  }
 
}