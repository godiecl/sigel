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


  crearUsuario(user: User): Observable<any>{

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

  crearAdmin(idUser: number): Observable<any>{

    console.log('peticion enviada a admins');
    const url = `${this.baseUrl}admins`;
    return this.http.post<any>(url, {idUser});

  }
  crearEncargadoPracticaCP(idUser: number): Observable<any>{

    console.log('peticion enviada a encargadoPracticaCapstones');
    const url = `${this.baseUrl}encargadoPracticaCPs`;
    return this.http.post<any>(url, {idUser});

  }

  crearAsistenteAcademica(idUser: number): Observable<any>{

    console.log('peticion enviada a asistenteAcademicas');
    const url = `${this.baseUrl}asistenteAcademicas`;
    return this.http.post<any>(url, {idUser});

  }

  crearComisionTitulacion(idUser: number, jefeCarrera: boolean): Observable<any>{

    console.log('peticion enviada a comisionTitulacionPracticas');
    const url = `${this.baseUrl}comisionTitulacionPracticas`;
    return this.http.post<any>(url, {idUser, jefeCarrera});

  }

  crearProfesorCC(profesorCC: ProfesorCC): Observable<any>{

    console.log('peticion enviada a profesorCCs');
    const url = `${this.baseUrl}profesorCCs`;
    return this.http.post<any>(url, {profesorCC});

  }

  crearProfesorGuiaCP(profesorGuiaCP: ProfesorGuiaCP): Observable<any>{

    console.log('peticion enviada a profesorGuiaCPs');
    const url = `${this.baseUrl}profesorGuiaCPs`;
    return this.http.post<any>(url, {profesorGuiaCP});

  }
  
}
