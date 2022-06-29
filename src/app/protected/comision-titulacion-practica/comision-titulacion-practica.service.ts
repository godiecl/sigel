import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Publicacion } from '../../auth/interfaces/documentos/publicacion.interface';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ComisionTitulacionPracticaService {

  private baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) { }

  
  crearPublicacion(publicacion: Publicacion): Observable<any>{
    
  const url = `${this.baseUrl}publicaciones`;
  return this.http.post<any>(url, {publicacion});
  
  }

  getPublicaciones() :Observable<Publicacion[]> {
    const url = `${this.baseUrl}publicaciones`;
    return this.http.get<any>(url)
  }

  getPublicacion(id_publicacion: any) :Observable<Publicacion[]> {
    const url = `${this.baseUrl}publicaciones${id_publicacion}`;
    return this.http.get<any>(url)
  }

  sendPostContenidoPractica(body:FormData): Observable <any>{
    const url= `${this.baseUrl}upload-contenido/practica`;
    return this.http.post(url,body);

  }
  sendPostContenidoCapstone(body:FormData): Observable <any>{
    const url= `${this.baseUrl}upload-contenido/capstone`;
    return this.http.post(url,body);
  }
}

