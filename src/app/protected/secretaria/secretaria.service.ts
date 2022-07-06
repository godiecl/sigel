import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { SolicitudCartaVacante } from '../../auth/interfaces/documentos/solicitudCartaVacante';
@Injectable({
  providedIn: 'root'
})
export class SecretariaService {

  private baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getSolicitudesEstudiante(): Observable<SolicitudCartaVacante[]> {

    const url = `${this.baseUrl}solicitud-carta-vacantes`;
    return this.http.get<any>(url)
  }

  getListaVacantes(): Observable<any>{
    console.log('get a lista-carta-vacante')
    const url = `${this.baseUrl}lista-carta-vacante`;
    return this.http.get<any>(url)
  }

  enviarCorreo(correo: string): Observable<any>{
    
    const url = `${this.baseUrl}correo-carta-vacante`;
    return this.http.post<any>(url, {correo})
  }

}