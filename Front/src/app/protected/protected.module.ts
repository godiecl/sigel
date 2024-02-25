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
import {MatCommonModule, MatNativeDateModule, MAT_DATE_LOCALE} from '@angular/material/core';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatCardModule} from '@angular/material/card';
import {MatSelectModule} from '@angular/material/select';
import {MatSortModule} from '@angular/material/sort';
import {MatDividerModule} from '@angular/material/divider';
import {MatTabsModule} from '@angular/material/tabs';


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
import { ResponderCartaSolicitudComponent } from './encargado-empresa/pages/responder-carta-solicitud/responder-carta-solicitud.component';
import { VerCartaDialogComponent } from './encargado-empresa/pages/responder-carta-solicitud/ver-carta-dialog/ver-carta-dialog.component';
import { VerCartaSolicitudComponent } from './encargado-empresa/pages/responder-carta-solicitud/ver-carta-solicitud/ver-carta-solicitud.component';
import { SolicitarCartaVacanteComponent } from './estudiante/pages/solicitar-carta-vacante/solicitar-carta-vacante.component';
import { VerListaVacantesComponent } from './estudiante/pages/ver-lista-vacantes/ver-lista-vacantes.component';
import { AutorizarCartaVacanteComponent } from './secretaria/pages/autorizar-carta-vacante/autorizar-carta-vacante.component';
import { ControlarSegurosComponent } from './secretaria/pages/controlar-seguros/controlar-seguros.component';
import { UploadInformeComponent } from './estudiante/pages/upload-informe/upload-informe.component';
import { DownloadInformeComponent } from './comision-correccion-practica/pages/download-informe/download-informe.component';
import { CreateComisionCorreccionComponent } from './comision-titulacion-practica/pages/create-comision-correccion/create-comision-correccion.component';
import { AsignarProfesoresCcComponent } from './comision-titulacion-practica/pages/create-comision-correccion/asignar-profesores-cc/asignar-profesores-cc.component';
import { DialogObservacionesComponent } from './comision-correccion-practica/pages/download-informe/dialog-observaciones/dialog-observaciones.component';
import { EvaluarEstudianteComponent } from './encargado-empresa/pages/evaluar-estudiante/evaluar-estudiante.component';
import { RegistroDatosPracticaComponent } from './comision-titulacion-practica/pages/registro-datos-practica/registro-datos-practica.component';
import { HemerotecaComponent } from './secretaria/pages/hemeroteca/hemeroteca.component';
import { EvaluarDefensaComponent } from './comision-correccion-practica/pages/evaluar-defensa/evaluar-defensa.component';
import { GenerarActaEvaluacionComponent } from './comision-titulacion-practica/pages/generar-acta-evaluacion/generar-acta-evaluacion.component';
import { ModalExtenderSeguroComponent } from './secretaria/pages/controlar-seguros/modal-extender-seguro/modal-extender-seguro.component';
import { EditarEvaluarDefensaComponent } from './comision-correccion-practica/pages/editar-evaluar-defensa/editar-evaluar-defensa.component';
import { EditarEvaluarEstudianteComponent } from './encargado-empresa/pages/editar-evaluar-estudiante/editar-evaluar-estudiante.component';
import { UploadContenidoComponent } from './comision-titulacion-practica/pages/upload-contenido/upload-contenido.component';



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
    ResponderCartaSolicitudComponent,
    VerCartaSolicitudComponent,
    VerCartaDialogComponent,
    CreateComisionCorreccionComponent,
    ControlarSegurosComponent,
    UploadInformeComponent,
    DownloadInformeComponent,
    AsignarProfesoresCcComponent,
    DialogObservacionesComponent,
    EvaluarEstudianteComponent,
    RegistroDatosPracticaComponent,
    HemerotecaComponent,
    EvaluarDefensaComponent,
    GenerarActaEvaluacionComponent,
    ModalExtenderSeguroComponent,
    EditarEvaluarDefensaComponent,
    UploadContenidoComponent,
    EditarEvaluarEstudianteComponent,
  ],
  imports: [
    CommonModule,
    ProtectedRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MatCardModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatSelectModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatButtonModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'es-CL'},
    MatDatepickerModule,
    MatNativeDateModule
  ]
})
export class ProtectedModule { }
