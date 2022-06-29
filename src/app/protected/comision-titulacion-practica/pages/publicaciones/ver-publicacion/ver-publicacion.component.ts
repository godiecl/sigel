import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Publicacion } from '../../../../../auth/interfaces/documentos/publicacion.interface';

@Component({
  selector: 'app-ver-publicacion',
  templateUrl: './ver-publicacion.component.html',
  styleUrls: ['./ver-publicacion.component.css']
})
export class VerPublicacionComponent implements OnInit {

  publicacionActual!: Publicacion;

  constructor(private route: ActivatedRoute, 
    ) { }

  ngOnInit(): void {
    this.route.data.subscribe(({publicacion}) => {
      console.log('si',publicacion)

      this.publicacionActual= publicacion.publicacion;
    })
  }

}
