import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/auth/interfaces/user.interface';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Estudiante } from '../../../auth/interfaces/estudiante.interface';

@Injectable({
  providedIn: 'root'
})
export class AdministradorService {

  private baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) { }


  crearUsuario(user: User): Observable<User>{

    console.log('peticion enviada a users');
    const url = `${this.baseUrl}users`;
    //  const body = { user.nombre, user.apellidoP, user.apellidoM, user.}
    return this.http.post<User>(url, {user});

  }

  // obtenerUsuarioPorID(id: string){

  //   const url = `{this.baseUrl}users/{id}`;
  //   return this.http.get(url);

  // }

  crearEstudiante(estudiante: Estudiante): Observable<Estudiante>{

    console.log('peticion enviada a estudiantes');
    const url = `${this.baseUrl}estudiantes`;
    return this.http.post<Estudiante>(url, {estudiante});

  }

  crearAdmin(idUser: string): Observable<any>{

    console.log('peticion enviada a admins');
    const url = `${this.baseUrl}admins`;
    return this.http.post<any>(url, {idUser});

  }

  
}
