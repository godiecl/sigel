import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ComisionCorreccionPracticaService {

  private baseUrl: string = environment.baseUrl;
  private _refresh$ = new Subject<void>();

  constructor(private http: HttpClient) { }

  get refresh$(){
    return this._refresh$;
  }
  evaluarInforme(id_informePractica: any, data: any){
    const url = `${this.baseUrl}evaluar-informe/informe-estudiante${id_informePractica}`
    return this.http.patch<any>(url, data).pipe(tap(()=>{
      this._refresh$.next();
    }))
  }

  getNotaFinal(id_informePractica: any){
    const url = `${this.baseUrl}notafinal-informe/informe-estudiante${id_informePractica}`
    return this.http.get<any>(url).pipe(tap(()=>{
      this._refresh$.next();
    }))
  }
  getDatosAsociados(id_usuario: any){
    const url = `${this.baseUrl}evaluacion-defensa${id_usuario}`
    return this.http.get<any>(url)
  }

  actualizarEvaluacionDefensa(evaluacionDefensa: any): Observable<any>{
    const url = `${this.baseUrl}evaluacion-defensa`;
    return this.http.post<any>(url, evaluacionDefensa)
  }

  editarEvaluacionDefensa(evaluacionDefensa: any, id_usuario: any): Observable<any>{
    const url = `${this.baseUrl}evaluacion-defensa/${id_usuario}`;
    return this.http.patch<any>(url, evaluacionDefensa).pipe(tap(()=>{
      this._refresh$.next();
    }))
  }

  getEstudiantesEditarEvaluacionDefensa(id_usuario: any){
    const url = `${this.baseUrl}estudiantes-editar-evaluacion-defensa/${id_usuario}`
    return this.http.get<any>(url)
  }
}
