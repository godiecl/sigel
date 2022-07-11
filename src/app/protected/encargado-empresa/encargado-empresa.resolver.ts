import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs/internal/Observable";
import { EncargadoEmpresaService } from './encargado-empresa.service';
import { AdministradorService } from '../administrador/services/administrador.service';




@Injectable({
    providedIn: 'root'
})
export class ResponderCartaVacanteResolver implements Resolve<any>
{
    /**
     * Constructor
     */
    constructor(
        private _encEmpresaS: EncargadoEmpresaService ,
        private _adminS: AdministradorService,
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
        //  // console.log(' HOLA',route.paramMap.get('id'));
        const id = route.paramMap.get('id');
        return this._encEmpresaS.verSolicitudCartaVacante(id);
                
    }
}

// @Injectable({
//     providedIn: 'root'
// })
// export class EstudianteVacanteResolver implements Resolve<any>
// {
//     /**
//      * Constructor
//      */
//     constructor(
//         private _admin: AdministradorService ,
//         private _router: Router
//     )
//     {
//     }

//     // -----------------------------------------------------------------------------------------------------
//     // @ Public methods
//     // -----------------------------------------------------------------------------------------------------

//     /**
//      * Resolver
//      *
//      * @param route
//      * @param _state
//      */
//     resolve(route: ActivatedRouteSnapshot, _state: RouterStateSnapshot): Observable<any>
//     {
//         //  // console.log(' HOLA',route.paramMap.get('id'));
//         const id = route.paramMap.get('id');
//         return this._admin.obtenerEstudiante(id)
                  
                
//     }
// }

