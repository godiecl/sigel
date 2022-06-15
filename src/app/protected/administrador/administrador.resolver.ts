import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from "@angular/router";
import { catchError, Observable, pipe, throwError } from "rxjs";
import { User } from "src/app/auth/interfaces/user.interface";
import { AdministradorService } from './services/administrador.service';

@Injectable({
    providedIn: 'root'
})



export class UsuarioEditResolver implements Resolve<User>
{
    /**
     * Constructor
     */
    constructor(
        private _adminService: AdministradorService ,
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
     * @param state
     */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<User>
    {
        console.log(' HOLA',route.paramMap.get('id'));
        const id = route.paramMap.get('id');
        return this._adminService.obtenerUsuarioPorID(id)
                   .pipe(
                       // Error here means the requested contact is not available
                       catchError((error) => {

                           // Log the error
                           console.error(error);

                           // Get the parent url
                           const parentUrl = state.url.split('/').slice(0, -1).join('/');

                           // Navigate to there
                           this._router.navigateByUrl(parentUrl);

                           // Throw an error
                           return throwError(error);
                       })
                   );
    }
}