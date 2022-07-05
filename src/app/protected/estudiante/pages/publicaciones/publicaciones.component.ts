import { Component, OnInit, OnDestroy, OnChanges, SimpleChanges, ChangeDetectorRef, DoCheck, AfterContentInit, AfterContentChecked } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs';
import {  Router } from '@angular/router';
import { ComisionTitulacionPracticaService } from 'src/app/protected/comision-titulacion-practica/comision-titulacion-practica.service';

@Component({
  selector: 'app-publicaciones',
  templateUrl: './publicaciones.component.html',
  styleUrls: ['./publicaciones.component.css']
})
export class PublicacionesComponent implements OnInit, OnDestroy, AfterContentInit, AfterContentChecked {

  private _unsubscribeAll: Subject<any>;
  publicaciones!: any[];

  constructor(
    private comisionService: ComisionTitulacionPracticaService,
    private router: Router,
    private cd: ChangeDetectorRef,
  ) { 
    this._unsubscribeAll = new Subject();
  }
  ngAfterContentChecked(): void {
    // if()
    // console.log('si');
    //  this.cd.detectChanges()
    //  console.log('tambien');
    // this.cd.detach()
    // console.log('igual');
  }
  ngAfterContentInit(): void {
    console.log('Method not implemented.');
  }
  
  


  ngOnInit(): void {

    console.log('lol')
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
    // console.log('route ',route);
    // console.log('ruta del ruter', this.router.url)
    if(this.router.url === route){
      return true
    }
    return false;
  }

  
  verPublicacion(id_publicacion: number): void{
    
    const url = `/dashboard/estudiante/ver-publicaciones/${id_publicacion}`
    console.log(url)
    this.router.navigateByUrl(url)
  }

}
