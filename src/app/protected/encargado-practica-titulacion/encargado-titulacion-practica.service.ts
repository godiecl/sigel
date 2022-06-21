import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SolicitudEstudiante } from '../../auth/interfaces/documentos/solicitudEstudiante.interface';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

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
}
