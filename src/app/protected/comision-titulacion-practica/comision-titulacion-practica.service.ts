import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Publicacion } from '../../auth/interfaces/documentos/publicacion.interface';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ComisionTitulacionPracticaService {

  private baseUrl: string = environment.baseUrl;
  // private _publicaciones: BehaviorSubject<any[]> = new BehaviorSubject([]);

  // getPublicaciones(): Observable<any[]>
  //   {
  //     const url = `${this.baseUrl}publicaciones`;
  //       return this.http.get<any[]>(url).pipe(
  //           tap((resp: any) => {

  //               this._publicaciones.next(resp.entidades);
  //           })
  //       );
  //   }

  constructor(private http: HttpClient) { }

  getPublicaciones() :Observable<Publicacion[]> {
    const url = `${this.baseUrl}publicaciones`;
    return this.http.get<any>(url)
  }

  crearPublicacion(publicacion: Publicacion): Observable<any>{
    
  const url = `${this.baseUrl}publicaciones`;
  return this.http.post<any>(url, {publicacion});
  
  }

  getPublicacion(id_publicacion: any) :Observable<Publicacion[]> {
    const url = `${this.baseUrl}publicaciones${id_publicacion}`;
    return this.http.get<any>(url)
  }

  eliminarPublicacion(id_publicacion: any) : Observable<any> {
    const url = `${this.baseUrl}publicaciones${id_publicacion}`;
    return this.http.delete<any>(url);
  }

  actualizarPublicacion(publicacion: Publicacion) : Observable<any> {
    const url = `${this.baseUrl}publicaciones${publicacion.id_publicacion}`;
    return this.http.patch<any>(url, {publicacion});
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

