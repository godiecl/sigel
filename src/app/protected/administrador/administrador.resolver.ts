import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from "@angular/router";
import { catchError, Observable, of, pipe, throwError } from "rxjs";
import { Estudiante } from "src/app/auth/interfaces/estudiante.interface";
import { User } from "src/app/auth/interfaces/user.interface";
import { AdministradorService } from './services/administrador.service';
import { ProfesorCC } from '../../auth/interfaces/profesorCC.interface';
import { ProfesorGuiaCP } from '../../auth/interfaces/profesorGuiaCP.interface';
import { UserModel } from '../../auth/models/user.model';
import { ProfesorGuiaCPModel } from '../../auth/models/profesorGuiaCP.model';
import { ProfesorCCModel } from '../../auth/models/profesorCC.model';
import { EstudianteModel } from '../../auth/models/estudiante.model';
import { EncargadoEmpresa } from '../../auth/interfaces/encargadoEmpresa.interface';
import { EncargadoEmpresaModel } from '../../auth/models/encargadoEmpresa.model';

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
        // console.log(' HOLA',route.paramMap.get('id'));
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


@Injectable({
    providedIn: 'root'
})
export class EstudianteEditResolver implements Resolve<Estudiante>
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
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Estudiante>
    {
        // console.log(' HOLA',route.paramMap.get('id'));
        const id = route.paramMap.get('id');
        const userVacio = new EstudianteModel(0,0,'',0,false, '',false,0,0)
        const user = this._adminService.obtenerEstudiantePorIdUsuario(id)
                   .pipe(
                       // Error here means the requested contact is not available
                       catchError((error) => {

                           // Log the error
                            // console.error(error);

                           // Get the parent url
                        //    const parentUrl = state.url.split('/').slice(0, -1).join('/');

                           // Navigate to there
                        //    this._router.navigateByUrl(parentUrl);
                           return of(userVacio)
                           // Throw an error
                        //    return throwError(error);
                       })
                   );
        // if(!user){
            
        // }
        return user;
    }
}


@Injectable({
    providedIn: 'root'
})
export class ProfesorCCEditResolver implements Resolve<ProfesorCC>
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
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ProfesorCC>
    {
        // console.log(' HOLA',route.paramMap.get('id'));
        const id = route.paramMap.get('id');
        const userVacio = new ProfesorCCModel(0,0,false,'');
        const user = this._adminService.obtenerProfesorCCPorIdUsuario(id)
                   .pipe(
                       // Error here means the requested contact is not available
                       catchError((error) => {

                           // Log the error
                        //    console.error(error);

                           // Get the parent url
                        //    const parentUrl = state.url.split('/').slice(0, -1).join('/');

                           // Navigate to there
                        //    this._router.navigateByUrl(parentUrl);

                           // Throw an error
                        //    return throwError(error);
                        return of(userVacio);
                       })
                   );
        // if(!user){
        // }
        return user;
    }
}

@Injectable({
    providedIn: 'root'
})
export class ProfesorGuiaCPEditResolver implements Resolve<ProfesorGuiaCP>
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
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ProfesorGuiaCP>
    {
        // console.log(' HOLA',route.paramMap.get('id'));
        const id = route.paramMap.get('id');
        const userVacio = new ProfesorGuiaCPModel(
            0, 0, '', false, ''
            );
        const user = this._adminService.obtenerProfesorGuiaCPPorIdUsuario(id)
                   .pipe(
                       // Error here means the requested contact is not available
                       catchError((error) => {
                        return of(userVacio);
                           // Log the error
                        //    console.error(error);

                        //    // Get the parent url
                        //    const parentUrl = state.url.split('/').slice(0, -1).join('/');

                           // Navigate to there
                        //    this._router.navigateByUrl(parentUrl);

                           // Throw an error
                        //    return throwError(error);
                       })
                   );

        // if(!user){
            
        // }
        return user;
    }

}

    @Injectable({
        providedIn: 'root'
    })

    export class EncargadoEmpresaEditResolver implements Resolve<EncargadoEmpresa>
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
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<EncargadoEmpresa>
    {
        // console.log(' HOLA',route.paramMap.get('id'));
        const id = route.paramMap.get('id');
        const userVacio = new EncargadoEmpresaModel(0,
            '','',0,0
            );
        const user = this._adminService.obtenerEncargadoEmpresaPorIdUsuario(id)
                   .pipe(
                       // Error here means the requested contact is not available
                       catchError((error) => {
                        return of(userVacio);
                           // Log the error
                        //    console.error(error);

                        //    // Get the parent url
                        //    const parentUrl = state.url.split('/').slice(0, -1).join('/');

                           // Navigate to there
                        //    this._router.navigateByUrl(parentUrl);

                           // Throw an error
                        //    return throwError(error);
                       })
                   );

        // if(!user){
            
        // }
        return user;
    }
}