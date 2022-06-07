import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthResponse } from '../interfaces/authResponse.interface';
import { UsuarioLog } from '../interfaces/usuarioLog.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = environment.baseUrl;
  private _usuario!: UsuarioLog;

  get usuario(){
    return {... this._usuario};
  }

  constructor(private http: HttpClient) { }


  login(correo: string, password: string)
  {
    
    const url = `${this.baseUrl}auth`;
    const body = { correo, password}

    return this.http.post<AuthResponse>(url, body)
      .pipe(
        tap(resp => {
          if(resp.ok){
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
}
