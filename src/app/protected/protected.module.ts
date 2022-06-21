import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

// Material
import {MatTableModule} from '@angular/material/table';

import { ProtectedRoutingModule } from './protected-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RegisterUsuarioComponent } from './administrador/register-usuario/register-usuario.component';
import { EditUsuarioComponent } from './administrador/edit-usuario/edit-usuario.component';
import { DeleteUsuarioComponent } from './administrador/delete-usuario/delete-usuario.component';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { EditComponent } from './administrador/edit-usuario/edit-usuario/edit.component';
import { ComisionTitulacionPracticaComponent } from './comision-titulacion-practica/comision-titulacion-practica.component';
import { PublicacionesComponent } from './comision-titulacion-practica/pages/publicaciones/publicaciones.component';
import { VerSolicitudesEstudianteComponent } from './encargado-practica-titulacion/pages/ver-solicitudes-estudiante/ver-solicitudes-estudiante.component';

@NgModule({
  declarations: [
    DashboardComponent,
    RegisterUsuarioComponent,
    DeleteUsuarioComponent,
    EditUsuarioComponent,
    DeleteUsuarioComponent,
    MainMenuComponent,
    EditComponent,
    ComisionTitulacionPracticaComponent,
    PublicacionesComponent,
    VerSolicitudesEstudianteComponent,
  ],
  imports: [
    CommonModule,
    ProtectedRoutingModule,
    ReactiveFormsModule,
    MatTableModule
  ]
})
export class ProtectedModule { }
