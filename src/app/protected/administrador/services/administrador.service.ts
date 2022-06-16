import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from 'src/app/auth/interfaces/user.interface';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Estudiante } from '../../../auth/interfaces/estudiante.interface';
import { ProfesorCC } from '../../../auth/interfaces/profesorCC.interface';
import { ProfesorGuiaCP } from '../../../auth/interfaces/profesorGuiaCP.interface';

@Injectable({
  providedIn: 'root'
})
export class AdministradorService {

  private baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) { }


  /**
   * 
   * USUARIO 
   * 
   * 
   * 
   *   
   */
  crearUsuario(user: User): Observable<any>{

    console.log('peticion post enviada a users');
    const url = `${this.baseUrl}users`;
    //  const body = { user.nombre, user.apellidoP, user.apellidoM, user.}
    return this.http.post<User>(url, {user});
  }

  eliminarUsuario(id: string): any {
    console.log('peticion delete enviada a users', id);
    const url = `${this.baseUrl}users${id}`;

    return this.http.delete<any>(url);

  }

  obtenerUsuarioPorID(id: string | null): Observable<User>{

    console.log('peticion obtener por id');
    const url = `${this.baseUrl}users${id}`;
    return this.http.get<User>(url);

  }
  
  obtenerUsuarioPorRut(rut: string): Observable<any>{
    console.log('peticion obtener por rut', rut);
    const url = `${this.baseUrl}users/rut${rut}`;
    console.log('url', url);
    return this.http.get<any>(url);

  }

  actualizarUsuario(user: any): Observable<User>{

    const url = `${this.baseUrl}users${user.id}`
    return this.http.patch<User>(url, {user});
  }

  /** ESTUDIANTE
   * 
   * @param estudiante 
   * @returns 
   */
  crearEstudiante(estudiante: Estudiante): Observable<Estudiante>{
    console.log('peticion post enviada a estudiantes');
    const url = `${this.baseUrl}estudiantes`;
    return this.http.post<Estudiante>(url, {estudiante});
  }

  // eliminarEstudiante(id: number): any {
  //   console.log('peticion delete enviada a estudiante');
  //   const url = `${this.baseUrl}estudiantes/${id}`;
  //   return this.http.delete(url);
  // } 

  obtenerEstudiante(idUser: any): Observable<Estudiante>{
    console.log('peticion get enviada a estudiantes');
    const url = `${this.baseUrl}estudiantes${idUser}`;
    return this.http.get<Estudiante>(url);
  }

  /** ADMINS
   * 
   * @param idUser 
   * 
   * @returns 
   */
  crearAdmin(idUser: number): Observable<any>{
    console.log('peticion enviada a admins');
    const url = `${this.baseUrl}admins`;
    return this.http.post<any>(url, {idUser});
  }

  // eliminarAdmin(idUser: number): any{
  //   console.log('peticion delete enviada a admins');
  //   const url = `${this.baseUrl}admins`;
  //   return this.http.post(url, idUser)
  // }

  /** ENCARGADO PRACTICA
   * 
   * @param idUser 
   * @returns 
   */
  crearEncargadoPracticaCP(idUser: number): Observable<any>{
    console.log('peticion enviada a encargadoPracticaCapstones');
    const url = `${this.baseUrl}encargadoPracticaCPs`;
    return this.http.post<any>(url, {idUser})
  }

  // eliminarEncargadoPracticaCP(idUser: number): any{
  //   console.log('peticion delete enviada a encargadoPracticaCPs');
  //   const url = `${this.baseUrl}encargadoPracticaCPs`;
  //   return this.http.post(url, idUser)
  // }

  /** ASISTENTE ACADEMICA
   * 
   * @param idUser 
   * @returns 
   */
  crearAsistenteAcademica(idUser: number): Observable<any>{
    console.log('peticion enviada a asistenteAcademicas');
    const url = `${this.baseUrl}asistenteAcademicas`;
    return this.http.post<any>(url, {idUser});
  }

  // eliminarAsistenteAcademica(idUser: number): any{
  //   console.log('peticion delete enviada a asistenteAcademicas');
  //   const url = `${this.baseUrl}asistenteAcademicas`;
  //   return this.http.post(url, idUser)
  // }

  /** COMISION TITULACION PRACTICA
   * 
   * @param idUser 
   * @param jefeCarrera 
   * @returns 
   */

  crearComisionTitulacion(idUser: number, jefeCarrera: boolean): Observable<any>{

    console.log('peticion enviada a comisionTitulacionPracticas');
    const url = `${this.baseUrl}comisionTitulacionPracticas`;
    return this.http.post<any>(url, {idUser, jefeCarrera});

  }

  // eliminarComisionTitulacion(idUser: number): any{
  //   console.log('peticion delete enviada a comisionTitulacionPracticas');
  //   const url = `${this.baseUrl}comisionTitulacionPracticas`;
  //   return this.http.post(url, idUser)
  // }

  /** PROFESOR COMISION CORRECCION
   * 
   * @param profesorCC 
   * @returns 
   */
  crearProfesorCC(profesorCC: ProfesorCC): Observable<any>{
    console.log('peticion post enviada a profesorCCs');
    const url = `${this.baseUrl}profesorCCs`;
    return this.http.post<any>(url, {profesorCC});
  }

  obtenerProfesorCC(idUser: any): Observable<ProfesorCC>{
    console.log('peticion get enviada a profesorCCs');
    const url = `${this.baseUrl}profesorCCs${idUser}`;
    return this.http.get<ProfesorCC>(url);
  }

  // eliminarProfesorCC(idUser: number): any{
  //   console.log('peticion delete enviada a profesorCCs');
  //   const url = `${this.baseUrl}profesorCCs`;
  //   return this.http.post(url, idUser)
  // }

  /** PROFESOR GUIA CAPSTONE
   * *
   * 
   */
  crearProfesorGuiaCP(profesorGuiaCP: ProfesorGuiaCP): Observable<any>{
    console.log('peticion enviada a profesorGuiaCPs');
    const url = `${this.baseUrl}profesorGuiaCPs`;
    return this.http.post<any>(url, {profesorGuiaCP});
  }

  obtenerProfesorGuiaCP(idUser: any): Observable<ProfesorGuiaCP>{
    console.log('peticion get enviada a profesorGuiaCPs');
    const url = `${this.baseUrl}profesorGuiaCPs${idUser}`;
    return this.http.get<ProfesorGuiaCP>(url);
  }

  // eliminarProfesorGuiaCP(idUser: number): any{
  //   console.log('peticion delete enviada a profesorGuiaCPs');
  //   const url = `${this.baseUrl}profesorGuiaCPs`;
  //   return this.http.post(url, idUser)
  // }
  
}
