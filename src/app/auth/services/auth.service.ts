import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, of, tap, Observable, BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthResponse } from '../interfaces/authResponse.interface';
import { UsuarioLog } from '../interfaces/usuarioLog.interface';
import { Empresa } from '../interfaces/empresa.interface';
import { EncargadoEmpresa } from '../interfaces/encargadoEmpresa.interface';
import { SolicitudEstudiante } from '../interfaces/documentos/solicitudEstudiante.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = environment.baseUrl;
  private _usuario!: UsuarioLog;
  private _empresa = new BehaviorSubject<number>(0);
  // private _usuarioLogeado!: UsuarioLog;
  private _encargadoEmpresa = new BehaviorSubject<number>(0);
  empresaActual = this._empresa.asObservable();
  encargadoActual = this._encargadoEmpresa.asObservable();

  get usuario(){
    return {... this._usuario};
  }

  // set usuario(usuarioAct: UsuarioLog){
  //   this._usuario = usuarioAct;
  // }

  // get usuarioLogeado(){
  //   return {... this._usuarioLogeado}
  // }

  constructor(private http: HttpClient) { }

  actualizarEmpresaActual(idEmpresa: number){
    this._empresa.next(idEmpresa);
  }

  actualizarEncargadoEmpresaActual(id_encargado: number){
    this._encargadoEmpresa.next(id_encargado);
  }


  login(correo: string, password: string)
  { 
    
    const url = `${this.baseUrl}auth`;
    const body = { correo, password}

    return this.http.post<AuthResponse>(url, body)
      .pipe(
        tap(resp => {
          if(resp.ok){
            // // console.log('usuario del login  ',resp)
            localStorage.setItem('token', resp.token! )
            this._usuario = {
              nombre: resp.nombre!,
              roles: resp.roles!,
              apellidop: resp.apellidop!,
              apellidom: resp.apellidom!,
              id: resp.id!,
            }
            // this._usuarioLogeado = {
            //   nombre: resp.nombre!,
            //   roles: resp.roles!,
            //   apellidop: resp.apellidop!,
            //   apellidom: resp.apellidom!,
            //   id: resp.id!,
            // }
          }
        }),
        map(resp => resp.ok),
        catchError(err => of(err.error.msg) )
      )
  }

  comprobarCorreo(correo: string){
    const url = `${this.baseUrl}auth`;
    const body = { correo }
    return this.http.post<AuthResponse>(url, body)
      .pipe(
        tap(resp => {
          if(resp.ok){
            localStorage.setItem('token', resp.token! )
            this._usuario = {
              nombre: resp.nombre!,
              id: resp.id!,
            }
          }
        }),
        map(resp => resp.ok),
        catchError(err => of(err.error.msg) )
      )

  }

  logout(){
    localStorage.clear();
  }

  validarToken(): Observable<boolean>{
    const url = `${this.baseUrl}auth/renew`;
    const headers = new HttpHeaders()
      .set('x-token', localStorage.getItem('token') || '');

    return this.http.get<AuthResponse>(url,{ headers })
      .pipe(
        map( resp => {
          
          // // console.log('usuario del validar token  ',resp)
          localStorage.setItem('token', resp.token! );
          this._usuario = {
            nombre: resp.nombre!,
            id: resp.id!,
            roles: resp.roles!,
            apellidop: resp.apellidop!,
            apellidom: resp.apellidom!,
           }

          return resp.ok;
        }),
        catchError(err => of(false))
      );

  }

  /*
    EMPRESA
   */

  crearEmpresa(empresa: Empresa): Observable<any> {
    const url = `${this.baseUrl}empresas`
    // ESTE CODIGO RETORNA BIEN LA EMPRESA
    return this.http.post<any>(url, {empresa});


    // ESTE CODIGO RETORNA BIEN EL ERROR
    // return this.http.post<any>(url, {empresa}).pipe(
    //   map(resp => resp.ok),
    //   catchError(err => of(err.error.msg) )
    // )
  }

  crearEncargadoEmpresa(encargadoEmpresa: EncargadoEmpresa){
    const url = `${this.baseUrl}encargadoEmpresas`
    return this.http.post<EncargadoEmpresa>(url, {encargadoEmpresa}); 
  }

  forgotPassword(correo: string): Observable<any>{

    // console.log('service correo', correo)
    const url = `${this.baseUrl}auth/forgot-password`;
    const body = { correo };
    // console.log(body);  
    
    return this.http.put<any>(url, body);
  }

  cambiarPassword(newPassword: string, token: string | null): Observable<any>{
    // console.log('service cambiar pass');
    const url = `${this.baseUrl}auth/new-password/${token}`
    const body = {newPassword, token}
    return this.http.put<any>(url, body);
  }

  crearSolicitudEstudiante(solicitud: SolicitudEstudiante): Observable<any>{
    // console.log('crear solicitud estudiante');
    const url = `${this.baseUrl}solicitud-estudiantes`
    const body = {solicitud}

    return this.http.post<any>(url, body);
  }

}
