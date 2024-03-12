import { Component, OnInit, OnDestroy, OnChanges, SimpleChanges, ChangeDetectorRef, DoCheck, AfterContentInit, AfterContentChecked } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';
import { ComisionTitulacionPracticaService } from '../../comision-titulacion-practica.service';
import { takeUntil } from 'rxjs';
import { Publicacion } from '../../../../auth/interfaces/documentos/publicacion.interface';
import {  Router } from '@angular/router';

@Component({
  selector: 'app-publicaciones',
  templateUrl: './publicaciones.component.html',
  styleUrls: ['./publicaciones.component.css']
})
export class PublicacionesCTComponent implements OnInit, OnDestroy, AfterContentInit, AfterContentChecked {

  private _unsubscribeAll: Subject<any>;
  publicaciones!: any[];
  longText = `The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog
  from Japan. A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was
  originally bred for hunting.`;

  constructor(
    private comisionService: ComisionTitulacionPracticaService,
    private router: Router,
    private cd: ChangeDetectorRef,
  ) { 
    this._unsubscribeAll = new Subject();
  }
  ngAfterContentChecked(): void {
    // if()
    // // console.log('si');
    //  this.cd.detectChanges()
    //  // console.log('tambien');
    // this.cd.detach()
    // // console.log('igual');
  }
  ngAfterContentInit(): void {
    // console.log('Method not implemented.');
  }
  
  


  ngOnInit(): void {

    // console.log('lol')
    this.comisionService.getPublicaciones().pipe(takeUntil(this._unsubscribeAll)).subscribe((publicacions)=>{
      this.publicaciones = publicacions;
    })
   
  }

  ngOnDestroy(): void {

    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

  isRoute(route: string){
    // // console.log('route ',route);
    // // console.log('ruta del ruter', this.router.url)
    if(this.router.url === route){
      return true
    }
    return false;
  }

  irCrearPublicacion(): void{
    this.router.navigateByUrl('/dashboard/comision-titulacion-practica/crear-publicacion')
  }

  verPublicacion(id_publicacion: number): void{
    
    const url = `/dashboard/comision-titulacion-practica/administrar-publicaciones/${id_publicacion}`
    // console.log(url)
    this.router.navigateByUrl(url)
  }

}
