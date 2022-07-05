import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs/internal/Observable";
import { ComisionTitulacionPracticaService } from './comision-titulacion-practica.service';


@Injectable({
    providedIn: 'root'
})
export class PublicacionResolver implements Resolve<any>
{
    /**
     * Constructor
     */
    constructor(
        private comisionTPS: ComisionTitulacionPracticaService ,
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
        return this.comisionTPS.getPublicacion(id)
                  
                
    }
}