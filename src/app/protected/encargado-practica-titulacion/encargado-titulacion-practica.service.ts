import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SolicitudEstudiante } from '../../auth/interfaces/documentos/solicitudEstudiante.interface';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { EncargadoEmpresa } from 'src/app/auth/interfaces/encargadoEmpresa.interface';
import { Empresa } from '../../auth/interfaces/empresa.interface';

@Injectable({
  providedIn: 'root'
})
export class EncargadoTitulacionPracticaService {

  private baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getSolicitudesEstudiante(): Observable<SolicitudEstudiante[]> {

    const url = `${this.baseUrl}solicitud-estudiantes`;
    return this.http.get<any>(url)
  }

  getSolicitudesEstudianteTabla(): Observable<any> {

    const url = `${this.baseUrl}solicitud-estudiantes/tabla`;
    return this.http.get<any>(url)
  }

  getSolicitudEstudiante(id_solicitudEstudiante: any): Observable<any>{
    // console.log('envie peticion get solicitud')
    const url = `${this.baseUrl}solicitud-estudiantes${id_solicitudEstudiante}`;
    return this.http.get<any>(url);
  }

  actualizarSolicitudEstudiante(solicitud: SolicitudEstudiante): Observable<any>{

    const url = `${this.baseUrl}solicitud-estudiantes${solicitud.id_solicitudEstudiante}` ;
    const body = solicitud;
    // // console.log('console', url)
    // // console.log('body', body);
    return this.http.patch<any>(url, body);
  }
  
  obtenerEncargadoEmpresa(id_encargadoEmpresa: any): Observable<EncargadoEmpresa> {

    // console.log('peticion get enviada a encargadoEmpresas');
    const url = `${this.baseUrl}encargadoEmpresas/${id_encargadoEmpresa}`;
    return this.http.get<EncargadoEmpresa>(url);
  }

  obtenerEmpresa(id_empresa: any): Observable<Empresa> {

    // console.log('peticion get enviada a empresas');
    const url = `${this.baseUrl}empresas${id_empresa}`;
    return this.http.get<Empresa>(url);
  }

  obtenerEmpresaPorRut(rut: any): Observable<Empresa> {

    // console.log('peticion get por rut enviada a empresas');
    const url = `${this.baseUrl}empresas/${rut}`;
    return this.http.get<Empresa>(url);
  }

  
}
