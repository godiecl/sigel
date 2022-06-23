import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';
import { SolicitudEstudiante } from '../../auth/interfaces/documentos/solicitudEstudiante.interface';
import { EncargadoTitulacionPracticaService } from './encargado-titulacion-practica.service';



@Injectable({
    providedIn: 'root'
})
export class SolicitudEstudianteResolver implements Resolve<any>
{
    /**
     * Constructor
     */
    constructor(
        private _encargadoService: EncargadoTitulacionPracticaService ,
        private _router: Router
    )
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Resolver
     *
     * @param route
     * @param _state
     */
    resolve(route: ActivatedRouteSnapshot, _state: RouterStateSnapshot): Observable<any>
    {
        //  console.log(' HOLA',route.paramMap.get('id'));
        const id = route.paramMap.get('id');
        return this._encargadoService.getSolicitudEstudiante(id)
                  
                
    }
}