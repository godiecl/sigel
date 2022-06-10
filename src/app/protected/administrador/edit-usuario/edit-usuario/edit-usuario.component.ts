import { Component, OnInit } from '@angular/core';
import { AdministradorService } from '../../services/administrador.service';

@Component({
  selector: 'app-edit-usuario',
  templateUrl: './edit-usuario.component.html',
})
export class EditUsuarioComponent implements OnInit {

  constructor(private adminService: AdministradorService) { }

  ngOnInit(): void {

    
  }



  
}
