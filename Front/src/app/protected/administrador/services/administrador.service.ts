import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from 'src/app/auth/interfaces/user.interface';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Estudiante } from '../../../auth/interfaces/estudiante.interface';
import { ProfesorCC } from '../../../auth/interfaces/profesorCC.interface';
import { ProfesorGuiaCP } from '../../../auth/interfaces/profesorGuiaCP.interface';
import { EncargadoEmpresa } from '../../../auth/interfaces/encargadoEmpresa.interface';

@Injectable({
  providedIn: 'root'
})
export class AdministradorService {

  private baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) { }

  crearUsuario(user: User): Observable<any>{

    // // console.log('peticion post enviada a users');
    const url = `${this.baseUrl}users`;
    //  const body = { user.nombre, user.apellidoP, user.apellidoM, user.}
    return this.http.post<User>(url, {user});
  }

  eliminarUsuario(id: string): any {
    // // console.log('peticion delete enviada a users', id);
    const url = `${this.baseUrl}users${id}`;

    return this.http.delete<any>(url);

  }

  obtenerUsuarioPorID(id: any | null): Observable<User>{

    // // console.log('peticion obtener por id');
    const url = `${this.baseUrl}users${id}`;
    return this.http.get<User>(url);

  }
  
  obtenerUsuarioPorRut(rut: string): Observable<any>{
    // // console.log('peticion obtener por rut', rut);
    const url = `${this.baseUrl}users/rut${rut}`;
    // console.log('url', url);
    return this.http.get<any>(url);

  }

  actualizarUsuario(user: User): Observable<User>{

    // // console.log(' user service',user);

    const url = `${this.baseUrl}users${user.id}`
    return this.http.patch<User>(url, {user});
  }

  /** ESTUDIANTE
   * 
   * @param estudiante 
   * @returns 
   */
  crearEstudiante(estudiante: Estudiante): Observable<Estudiante>{
    // console.log('peticion post enviada a estudiantes');
    const url = `${this.baseUrl}estudiantes`;
    return this.http.post<Estudiante>(url, {estudiante});
  }

  actualizarEstudiantePorId(estudiante: Estudiante): Observable<any>{
    // console.log('peticion patch enviada a estudiantes');
    const url = `${this.baseUrl}estudiantes`;
    return this.http.patch<any>(url, {estudiante});
  }

  eliminarEstudiante(id: number): any {
    // console.log('peticion delete enviada a estudiante');
    const url = `${this.baseUrl}estudiantes${id}`;
    return this.http.delete<any>(url);
  } 

  eliminarEstudiantePorIdUsuario(id_usuario: number): any {
    // console.log('peticion delete por id usuario enviada a estudiante');
    const url = `${this.baseUrl}estudiantes${id_usuario}`;
    // console.log('url', url);
    return this.http.delete<any>(url);
  } 

  obtenerEstudiante(id: any): Observable<Estudiante>{
    // console.log('peticion get enviada a estudiantes');
    const url = `${this.baseUrl}estudiantes${id}`;
    return this.http.get<Estudiante>(url);
  }

  obtenerEstudiantePorIdUsuario(id_usuario: any): Observable<Estudiante>{
    // console.log('peticion get enviada a estudiantes/');
    const url = `${this.baseUrl}estudiantes/${id_usuario}`;
    return this.http.get<Estudiante>(url);
  }

  /** ADMINS
   * 
   * @param idUser 
   * 
   * @returns 
   */
  crearAdmin(id_usuario: number): Observable<any>{
    // console.log('peticion enviada a admins');
    const url = `${this.baseUrl}admins`;
    return this.http.post<any>(url, {id_usuario});
  }

  eliminarAdmin(id_usuario: number): any{
    // console.log('peticion delete enviada a admins');
    const url = `${this.baseUrl}admins${id_usuario}`;
    return this.http.delete(url)
  }

  /** ENCARGADO PRACTICA
   * 
   * @param idUser 
   * @returns 
   */
  crearEncargadoPracticaCP(id_usuario: number): Observable<any>{
    // console.log('peticion enviada a encargadoPracticaCapstones');
    const url = `${this.baseUrl}encargadoPracticaCPs`;
    return this.http.post<any>(url, {id_usuario})
  }

  eliminarEncargadoPracticaCP(id_usuario: number): any{
    // console.log('peticion delete enviada a encargadoPracticaCPs');
    const url = `${this.baseUrl}encargadoPracticaCPs${id_usuario}`;
    return this.http.delete(url);
  }

  /** ASISTENTE ACADEMICA
   * 
   * @param idUser 
   * @returns 
   */
  crearAsistenteAcademica(id_usuario: number): Observable<any>{
    // console.log('peticion enviada a asistenteAcademicas');
    const url = `${this.baseUrl}asistenteAcademicas`;
    return this.http.post<any>(url, {id_usuario});
  }

  eliminarAsistenteAcademica(id_usuario: number): any{
    // console.log('peticion delete enviada a asistenteAcademicas');
    const url = `${this.baseUrl}asistenteAcademicas${id_usuario}`;
    return this.http.delete(url)
  }

  /** COMISION TITULACION PRACTICA
   * 
   * @param idUser 
   * @param jefeCarrera 
   * @returns 
   */

  obtenerComisionTitulacion(id_usuario: any): Observable<any>{
    
    // console.log('peticion enviada a comisionTitulacionPracticas');
    const url = `${this.baseUrl}comisionTitulacionPracticas${id_usuario}`;
    return this.http.get<any>(url);
  }

  crearComisionTitulacion(id_usuario: number, jefeCarrera: boolean): Observable<any>{

    // console.log('peticion enviada a comisionTitulacionPracticas');
    const url = `${this.baseUrl}comisionTitulacionPracticas`;
    return this.http.post<any>(url, {id_usuario, jefeCarrera});

  }

  actualizarComisionTitulacion(id_usuario: number, jefeCarrera: boolean): Observable<any>{

    // console.log('peticion patch enviada a comisionTitulacionPracticas');
    const url = `${this.baseUrl}comisionTitulacionPracticas`;
    return this.http.patch<any>(url, {id_usuario, jefeCarrera});

  }

  eliminarComisionTitulacion(id_usuario: number): any{
    // console.log('peticion delete enviada a comisionTitulacionPracticas');
    const url = `${this.baseUrl}comisionTitulacionPracticas${id_usuario}`;
    return this.http.delete<any>(url);
  }

  /** PROFESOR COMISION CORRECCION
   * 
   * @param profesorCC 
   * @returns 
   */
  crearProfesorCC(profesorCC: ProfesorCC): Observable<any>{
    // console.log('peticion post enviada a profesorCCs');
    const url = `${this.baseUrl}profesorCCs`;
    return this.http.post<any>(url, {profesorCC});
  }

  obtenerProfesorCCPorIdUsuario(id_usuario: any): Observable<ProfesorCC>{
    // console.log('peticion get enviada a profesorCCs');
    const url = `${this.baseUrl}profesorCCs/${id_usuario}`;
    return this.http.get<ProfesorCC>(url);
  }

  actualizarProfesorCC(profesorCC: ProfesorCC): Observable<any>{
    // console.log('peticion patch enviada a profesorCCs');
    const url = `${this.baseUrl}profesorCCs`;
    return this.http.patch<any>(url, {profesorCC});
  }

  eliminarProfesorCC(id_usuario: number): any{
    // console.log('peticion delete enviada a profesorCCs');
    const url = `${this.baseUrl}profesorCCs${id_usuario}`;
    return this.http.delete(url);
  }

  /** PROFESOR GUIA CAPSTONE
   * *
   * 
   */
  crearProfesorGuiaCP(profesorGuiaCP: ProfesorGuiaCP): Observable<any>{
    // console.log('peticion enviada a profesorGuiaCPs');
    const url = `${this.baseUrl}profesorGuiaCPs`;
    return this.http.post<any>(url, {profesorGuiaCP});
  }

  obtenerProfesorGuiaCPPorIdUsuario(id_usuario: any): Observable<ProfesorGuiaCP>{
    // console.log('peticion get enviada a profesorGuiaCPs');
    const url = `${this.baseUrl}profesorGuiaCPs/${id_usuario}`;
    return this.http.get<ProfesorGuiaCP>(url);
  }

  actualizarProfesorGuiaCP(profesorGuiaCP: ProfesorGuiaCP): Observable<any>{
    // console.log('peticion patch enviada a profesorGuiaCPs');
    const url = `${this.baseUrl}profesorGuiaCPs`;
    return this.http.patch<any>(url, {profesorGuiaCP});
  }

  eliminarProfesorGuiaCP(id_usuario: number): any{
    // console.log('peticion delete enviada a profesorGuiaCPs');
    const url = `${this.baseUrl}profesorGuiaCPs${id_usuario}`;
    return this.http.delete<any>(url)
  }

  /**  ENCARGADO EMPRESA
   * 
   * @param id_usuario 
   * @returns 
   */

  obtenerEncargadoEmpresaPorIdUsuario(id_usuario: any): Observable<EncargadoEmpresa> {

    // console.log('peticion get enviada a encargadoEmpresas');
    const url = `${this.baseUrl}encargadoEmpresas/${id_usuario}`;
    return this.http.get<EncargadoEmpresa>(url);
  }

  actualizarEncargadoEmpresaPorIdUsuario(encargadoEmpresa: EncargadoEmpresa): Observable<any> {

    // console.log('peticion update enviada a encargadoEmpresas');
    const url = `${this.baseUrl}encargadoEmpresas`;
    return this.http.patch<any>(url, {encargadoEmpresa});
  }

  eliminarEncargadoEmpresaPorIdUsuario(id_usuario: number): any{
    // console.log('peticion delete enviada a profesorGuiaCPs');
    const url = `${this.baseUrl}encargadoEmpresas${id_usuario}`;
    return this.http.delete(url)
  }

  
}
