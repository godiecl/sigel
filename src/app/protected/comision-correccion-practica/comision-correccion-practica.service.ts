import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ComisionCorreccionPracticaService {

  private baseUrl: string = environment.baseUrl;
  private _refresh$ = new Subject<void>();

  constructor(private http: HttpClient) { }

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
}
