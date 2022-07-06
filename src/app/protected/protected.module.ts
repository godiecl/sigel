import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Material
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCommonModule} from '@angular/material/core';
import {MatCardModule} from '@angular/material/card';
import {MatSelectModule} from '@angular/material/select';

import { ProtectedRoutingModule } from './protected-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RegisterUsuarioComponent } from './administrador/register-usuario/register-usuario.component';
import { EditUsuarioComponent } from './administrador/edit-usuario/edit-usuario.component';
import { DeleteUsuarioComponent } from './administrador/delete-usuario/delete-usuario.component';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { EditComponent } from './administrador/edit-usuario/edit-usuario/edit.component';
import { ComisionTitulacionPracticaComponent } from './comision-titulacion-practica/comision-titulacion-practica.component';
import { PublicacionesCTComponent } from './comision-titulacion-practica/pages/publicaciones/publicaciones.component';
import { VerSolicitudesEstudianteComponent } from './encargado-practica-titulacion/pages/ver-solicitudes-estudiante/ver-solicitudes-estudiante.component';
import { VerSolicitudComponent } from './encargado-practica-titulacion/pages/ver-solicitudes-estudiante/ver-solicitud/ver-solicitud.component';
import { EvaluarDialog } from './encargado-practica-titulacion/pages/ver-solicitudes-estudiante/ver-solicitud/dialog/evaluar-dialog.component';
import { CrearPublicacionComponent } from './comision-titulacion-practica/pages/crear-publicacion/crear-publicacion.component';
import { PublicacionesComponent } from './estudiante/pages/publicaciones/publicaciones.component';
import { DownloadDocumentComponent } from './comision-titulacion-practica/pages/download-document/download-document.component';
import { SolicitarEstudianteMenuComponent } from './encargado-empresa/pages/solicitar-estudiante/solicitar-estudiante.component';
import { EditarPublicacionComponent } from './comision-titulacion-practica/pages/publicaciones/ver-publicacion/editar-publicacion/editar-publicacion.component';
import { EliminarPublicacionComponent } from './comision-titulacion-practica/pages/publicaciones/ver-publicacion/eliminar-publicacion/eliminar-publicacion.component';
import { VerPublicacionCTComponent } from './comision-titulacion-practica/pages/publicaciones/ver-publicacion/ver-publicacion.component';
import { VerPublicacionComponent } from './estudiante/pages/publicaciones/ver-publicacion/ver-publicacion.component';
import { SolicitarCartaVacanteComponent } from './estudiante/pages/solicitar-carta-vacante/solicitar-carta-vacante.component';
import { AutorizarCartaVacanteComponent } from './secretaria/pages/autorizar-carta-vacante/autorizar-carta-vacante.component';
import { VerListaVacantesComponent } from './estudiante/pages/ver-lista-vacantes/ver-lista-vacantes.component';



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
    PublicacionesCTComponent,
    VerSolicitudesEstudianteComponent,
    VerSolicitudComponent,
    EvaluarDialog,
    CrearPublicacionComponent,
    DownloadDocumentComponent,
    SolicitarEstudianteMenuComponent,
    VerPublicacionCTComponent,
    VerPublicacionComponent,
    EditarPublicacionComponent,
    EliminarPublicacionComponent,
    SolicitarCartaVacanteComponent,
    AutorizarCartaVacanteComponent,
    VerListaVacantesComponent,
  ],
  imports: [
    CommonModule,
    ProtectedRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatSelectModule,
    MatTableModule,
    MatButtonModule,
    MatDialogModule
  ]
})
export class ProtectedModule { }
