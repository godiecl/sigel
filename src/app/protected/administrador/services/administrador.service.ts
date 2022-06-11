import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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

  eliminarUsuario(rut: string): any {
    console.log('peticion delete enviada a users');
    const url = `${this.baseUrl}users/${rut}`;

    return this.http.delete(url);

  }

  obtenerUsuarioPorID(id: string): Observable<User>{

    console.log('peticion obtener por id');
    const url = `${this.baseUrl}users/${id}`;
    return this.http.get<User>(url);

  }
  
  obtenerUsuarioPorRut(rut: string): Observable<User>{
    console.log('peticion obtener por id');
    const url = `${this.baseUrl}users/rut/${rut}}`;
    return this.http.get<User>(url);

  }

  /** ESTUDIANTE
   * 
   * @param estudiante 
   * @returns 
   */
  crearEstudiante(estudiante: Estudiante): Observable<Estudiante>{
    console.log('peticion enviada a estudiantes');
    const url = `${this.baseUrl}estudiantes`;
    return this.http.post<Estudiante>(url, {estudiante});
  }

  // eliminarEstudiante(id: number): any {
  //   console.log('peticion delete enviada a estudiante');
  //   const url = `${this.baseUrl}estudiantes/${id}`;
  //   return this.http.delete(url);
  // } 

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
    console.log('peticion enviada a profesorCCs');
    const url = `${this.baseUrl}profesorCCs`;
    return this.http.post<any>(url, {profesorCC});
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

  // eliminarProfesorGuiaCP(idUser: number): any{
  //   console.log('peticion delete enviada a profesorGuiaCPs');
  //   const url = `${this.baseUrl}profesorGuiaCPs`;
  //   return this.http.post(url, idUser)
  // }
  
}
