import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/auth/interfaces/user.interface';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdministradorService {

  private baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) { }

  crearUsuario(user: User): Observable<User>{

    console.log('peticion enviada');
    const url = `${this.baseUrl}users`;
    console.log(url);
    //  const body = { user.nombre, user.apellidoP, user.apellidoM, user.}

    return this.http.post<User>(url, {user});
  }
}
