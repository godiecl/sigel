import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, Subject, tap } from 'rxjs';
import { SolicitudCartaVacante } from '../../auth/interfaces/documentos/solicitudCartaVacante';
@Injectable({
  providedIn: 'root'
})
export class SecretariaService {

  private baseUrl: string = environment.baseUrl;
  private _refresh$ = new Subject<void>();

  constructor(private http: HttpClient) { }
  get refresh$(){
    return this._refresh$;
  }
  getSolicitudesCartaVacante(): Observable<SolicitudCartaVacante[]> {

    const url = `${this.baseUrl}solicitud-carta-vacantes`;
    return this.http.get<any>(url)
  }

  getListaVacantes(): Observable<any>{
    // console.log('get a lista-carta-vacante')
    const url = `${this.baseUrl}lista-carta-vacante`;
    return this.http.get<any>(url)
  }

  enviarCorreo(correo: string): Observable<any>{
    
    const url = `${this.baseUrl}correo-carta-vacante`;
    return this.http.post<any>(url, {correo})
  }

  aprobarSolicitudCartaVacante(id_solicitudCartaVacante: number): Observable<any>{
    const url = `${this.baseUrl}aprobar-solicitud-carta-vacante${id_solicitudCartaVacante}`;
    return this.http.patch<any>(url,{})
  }

  reprobarSolicitudCartaVacante(id_solicitudCartaVacante: number): Observable<any>{
    const url = `${this.baseUrl}reprobar-solicitud-carta-vacante${id_solicitudCartaVacante}`;
    return this.http.patch<any>(url,{})
  }

  dejarPendienteSolicitudCartaVacante(id_solicitudCartaVacante: number): Observable<any>{
    const url = `${this.baseUrl}pendiente-solicitud-carta-vacante${id_solicitudCartaVacante}`;
    return this.http.patch<any>(url,{})
  }

  getSeguros(): Observable<any>{
    const url = `${this.baseUrl}seguros`;
    return this.http.get(url);
  }

  dejarPendienteSeguro(id_seguro: number): Observable<any>{
    const url = `${this.baseUrl}pendiente-seguro${id_seguro}`;
    return this.http.patch<any>(url,{})
  }

  aprobarSeguro(id_seguro: number): Observable<any>{
    const url = `${this.baseUrl}aprobar-seguro${id_seguro}`;
    return this.http.patch<any>(url,{})
  }
  ocultarSeguro(id_seguro: number): Observable<any>{
    const url = `${this.baseUrl}ocultar-seguro${id_seguro}`;
    return this.http.patch<any>(url,{}).pipe(
      tap(()=>{
        this._refresh$.next();
      })
    );
  }

}