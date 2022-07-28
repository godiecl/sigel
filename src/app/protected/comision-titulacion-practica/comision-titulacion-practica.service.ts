import { tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Publicacion } from '../../auth/interfaces/documentos/publicacion.interface';
import { BehaviorSubject, Observable, Subject  } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ComisionTitulacionPracticaService {

  private baseUrl: string = environment.baseUrl;
  private _refresh$ = new Subject<void>();

  constructor(private http: HttpClient) { }
  get refresh$(){
    return this._refresh$;
  }
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

  //contenido practica
  sendPostContenidoPractica(body:FormData): Observable <any>{
    const url= `${this.baseUrl}upload-contenido/practica`;
    return this.http.post(url,body);
  }
  //contenido capstone
  sendPostContenidoCapstone(body:FormData): Observable <any>{
    const url= `${this.baseUrl}upload-contenido/capstone`;
    return this.http.post(url,body);
  }
  //documentos practica-estudiante
  sendPostDocPracticaEstudiante(body:FormData): Observable <any>{
    const url= `${this.baseUrl}upload-doc/practica-estudiante`;
    return this.http.post(url,body).pipe(
      tap(()=>{
        this._refresh$.next();
      })
    );
  }
  downloadFileDocPracticaEstudiante(file:String){
    var body = {filename:file};
    const url=`${this.baseUrl}download-doc/practica-estudiante`;
    return this.http.post(url,body,{responseType:'blob'});
  }
  getFilesDocPracticaEstudiante(): Observable<any> {
    const url=`${this.baseUrl}doc/practica-estudiante`;
    return this.http.get(url);
  }
  deleteFileDocPracticaEstudiante(file:String): Observable <any>{
    var body = {filename:file};
    const url=`${this.baseUrl}delete-doc/practica-estudiante`;
    return this.http.post(url,body)
    .pipe(
      tap(()=>{
        this._refresh$.next();
      })
    );
  }
  //documentos capstone-estudiante
  sendPostDocCapstoneEstudiante(body:FormData): Observable <any>{
    const url= `${this.baseUrl}upload-doc/capstone-estudiante`;
    return this.http.post(url,body)
    .pipe(
      tap(()=>{
        this._refresh$.next();
      })
    );
  }
  downloadFileDocCapstoneEstudiante(file:String){
    var body = {filename:file};
    const url=`${this.baseUrl}download-doc/capstone-estudiante`;
    return this.http.post(url,body,{responseType:'blob'});
  }
  getFilesDocCapstoneEstudiante(): Observable<any> {
    const url=`${this.baseUrl}doc/capstone-estudiante`;
    return this.http.get(url);
  }
  deleteFileDocCapstoneEstudiante(file:String): Observable <any>{
    var body = {filename:file};
    const url=`${this.baseUrl}delete-doc/capstone-estudiante`;
    return this.http.post(url,body)
    .pipe(
      tap(()=>{
        this._refresh$.next();
      })
    );
  }
  //documentos practica-profesor
  sendPostDocPracticaProfesor(body:FormData): Observable <any>{
    const url= `${this.baseUrl}upload-doc/practica-profesor`;
    return this.http.post(url,body)
    .pipe(
      tap(()=>{
        this._refresh$.next();
      })
    );
  }
  downloadFileDocPracticaProfesor(file:String){
    var body = {filename:file};
    const url=`${this.baseUrl}download-doc/practica-profesor`;
    return this.http.post(url,body,{responseType:'blob'});
  }
  getFilesDocPracticaProfesor(): Observable<any> {
    const url=`${this.baseUrl}doc/practica-profesor`;
    return this.http.get(url);
  }
  deleteFileDocPracticaProfesor(file:String){
    var body = {filename:file};
    const url=`${this.baseUrl}delete-doc/practica-profesor`;
    return this.http.post(url,body)
    .pipe(
      tap(()=>{
        this._refresh$.next();
      })
    );  
  }

  //documentos capstone profesor//
  sendPostDocCapstoneProfesor(body:FormData): Observable <any>{
    const url= `${this.baseUrl}upload-doc/capstone-profesor`;
    return this.http.post(url,body)
    .pipe(
      tap(()=>{
        this._refresh$.next();
      })
    );
  }
  downloadFileDocCapstoneProfesor(file:String){
    var body = {filename:file};
    const url=`${this.baseUrl}download-doc/capstone-profesor`;
    return this.http.post(url,body,{responseType:'blob'});
  }
  getFilesDocCapstoneProfesor(): Observable<any> {
    const url=`${this.baseUrl}doc/capstone-profesor`;
    return this.http.get(url);
  }
  deleteFileDocCapstoneProfesor(file:String){
    var body = {filename:file};
    const url=`${this.baseUrl}delete-doc/capstone-profesor`;
    return this.http.post(url,body)
    .pipe(tap(()=>{
        this._refresh$.next();
      })
    );
  }
  //informe estudiante
  sendPostInformeEstudiante(body:FormData): Observable <any>{
    const url= `${this.baseUrl}upload-informe/informe-estudiante`;
    return this.http.post(url,body)
    .pipe(
      tap(()=>{
        this._refresh$.next();
      })
    );
  }
  postInformePractica(data: any): Observable <any>{
    const url= `${this.baseUrl}guardar-informe/informe-estudiante`;
    return this.http.post(url, data);
  }


  downloadInformeEstudiante(file:String){
    var body = {filename:file};
    const url=`${this.baseUrl}download-informe/informe-estudiante`;
    return this.http.post(url,body,{responseType:'blob'});
  }
  getFilesInformeEstudiante(id_comisionCorreccion: any): Observable<any> {
    const url=`${this.baseUrl}get-informe/informe-estudiante/${id_comisionCorreccion}`;
    return this.http.get<any>(url);
  }
  deleteFileInformeEstudiante(file:String){
    var body = {filename:file};
    const url=`${this.baseUrl}delete-informe/informe-estudiante`;
    return this.http.post(url,body)
    .pipe(tap(()=>{
        this._refresh$.next();
      })
    );
  }

  postCCpractica(data: any){
    const url = `${this.baseUrl}crear-cc-practica`
    return this.http.post(url,{data})
  }
  getProfesoresCC(): Observable<any>{
    const url = `${this.baseUrl}profesoresCC`
    return this.http.get<any>(url);
  }

  getEstudiantes(): Observable<any>{
    const url = `${this.baseUrl}/practica-estudiantes`
    return this.http.get<any>(url);
  }

  getListaComisiones(): Observable<any>{
    const url = `${this.baseUrl}comision-correccion/lista`
    return this.http.get<any>(url);
  }

  eliminarComision(id_comisionCorreccion: any): Observable<any>{
    
    const url = `${this.baseUrl}comision-correccion/lista/eliminar${id_comisionCorreccion}`
    return this.http.delete<any>(url).pipe(
      (tap(()=>{
        this._refresh$.next();
      }))
    )
  }

  getEstudiantesAprobados(): Observable<any>{
    const url = `${this.baseUrl}estudiantes-aprobados`
    return this.http.get<any>(url);
    
  }

}

