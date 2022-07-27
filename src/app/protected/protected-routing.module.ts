import { UploadInformeComponent } from './estudiante/pages/upload-informe/upload-informe.component';
import { UploadContenidoComponent } from './comision-titulacion-practica/pages/upload-contenido/upload-contenido.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RegisterUsuarioComponent } from './administrador/register-usuario/register-usuario.component';
import { DeleteUsuarioComponent } from './administrador/delete-usuario/delete-usuario.component';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { EditUsuarioComponent } from './administrador/edit-usuario/edit-usuario.component';
import { EditComponent } from './administrador/edit-usuario/edit-usuario/edit.component';
import { UsuarioEditResolver, EstudianteEditResolver, ProfesorCCEditResolver, ProfesorGuiaCPEditResolver, EncargadoEmpresaEditResolver } from './administrador/administrador.resolver';
import { VerSolicitudesEstudianteComponent } from './encargado-practica-titulacion/pages/ver-solicitudes-estudiante/ver-solicitudes-estudiante.component';
import { SolicitudEstudianteResolver } from './encargado-practica-titulacion/encargado.resolver';
import { VerSolicitudComponent } from './encargado-practica-titulacion/pages/ver-solicitudes-estudiante/ver-solicitud/ver-solicitud.component';
import { PublicacionesCTComponent } from './comision-titulacion-practica/pages/publicaciones/publicaciones.component';
import { CrearPublicacionComponent } from './comision-titulacion-practica/pages/crear-publicacion/crear-publicacion.component';
import { DownloadDocumentComponent } from './comision-titulacion-practica/pages/download-document/download-document.component';
import { SolicitarEstudianteMenuComponent } from './encargado-empresa/pages/solicitar-estudiante/solicitar-estudiante.component';
import { VerPublicacionCTComponent } from './comision-titulacion-practica/pages/publicaciones/ver-publicacion/ver-publicacion.component';
import { PublicacionResolver } from './comision-titulacion-practica/comision-titulacion-practica.resolver';
import { PublicacionesComponent } from './estudiante/pages/publicaciones/publicaciones.component';
import { VerPublicacionComponent } from './estudiante/pages/publicaciones/ver-publicacion/ver-publicacion.component';
import { VerListaVacantesComponent } from './estudiante/pages/ver-lista-vacantes/ver-lista-vacantes.component';
import { SolicitarCartaVacanteComponent } from './estudiante/pages/solicitar-carta-vacante/solicitar-carta-vacante.component';
import { AutorizarCartaVacanteComponent } from './secretaria/pages/autorizar-carta-vacante/autorizar-carta-vacante.component';
import { DownloadInformeComponent } from './comision-correccion-practica/pages/download-informe/download-informe.component';
import { ResponderCartaSolicitudComponent } from './encargado-empresa/pages/responder-carta-solicitud/responder-carta-solicitud.component';
import { VerCartaSolicitudComponent } from './encargado-empresa/pages/responder-carta-solicitud/ver-carta-solicitud/ver-carta-solicitud.component';
import { ResponderCartaVacanteResolver } from './encargado-empresa/encargado-empresa.resolver';
import { ControlarSegurosComponent } from './secretaria/pages/controlar-seguros/controlar-seguros.component';
import { CreateComisionCorreccionComponent } from './comision-titulacion-practica/pages/create-comision-correccion/create-comision-correccion.component';
import { AsignarProfesoresCcComponent } from './comision-titulacion-practica/pages/create-comision-correccion/asignar-profesores-cc/asignar-profesores-cc.component';
import { HemerotecaComponent } from './secretaria/pages/hemeroteca/hemeroteca.component';
import { EvaluarEstudianteComponent } from './encargado-empresa/pages/evaluar-estudiante/evaluar-estudiante.component';
import { RegistroDatosPracticaComponent } from './comision-titulacion-practica/pages/registro-datos-practica/registro-datos-practica.component';
import { EvaluarDefensaComponent } from './comision-correccion-practica/pages/evaluar-defensa/evaluar-defensa.component';
import { GenerarActaEvaluacionComponent } from './comision-titulacion-practica/pages/generar-acta-evaluacion/generar-acta-evaluacion.component';


const routes: Routes = [


  {
    path:'',
    component: DashboardComponent,
    children: [
      { path:'',},
      { path:'register-usuario', component: RegisterUsuarioComponent},
      { path:'delete-usuario', component: DeleteUsuarioComponent},
      { path:'edit-usuario', component: EditUsuarioComponent, 
                              children: [ 
                                           {path:'',},
                                           {path:':id', component: EditComponent, 
                                           resolve: { user: UsuarioEditResolver, 
                                                       estudiante: EstudianteEditResolver, encargadoEmpresa: EncargadoEmpresaEditResolver,
                                                       profesorCC: ProfesorCCEditResolver, profesorGuia: ProfesorGuiaCPEditResolver 
                                                    }},
                                            
                                        ]

      },
      { path:'main-menu', component: MainMenuComponent},
      { path: 'upload-contenido', component:UploadContenidoComponent},
      { path: 'download-document',component:DownloadDocumentComponent},
      { path:'encargado-practica',
        // component: DashboardComponent,
        children: [
          {path:'',},
          {path: 'ver-solicitudes-estudiante', component: VerSolicitudesEstudianteComponent,
              children: [
                {path:'',},
                {
                  path: ':id', component: VerSolicitudComponent, resolve: { solicitud: SolicitudEstudianteResolver }
                }
              ]  
          },
          
        ]
      },
      { path:'estudiante',
      // component: DashboardComponent,
      children: [
        {path:'',},
        { path:'upload-informe',component:UploadInformeComponent},
        {path:'ver-lista-vacantes', component: VerListaVacantesComponent},
        {path:'solicitar-carta-vacante', component: SolicitarCartaVacanteComponent},
        {path: 'ver-publicaciones', component: PublicacionesComponent, 
        children: [
          {path:'',},
          {
          path: ':id', component: VerPublicacionComponent, resolve: { publicacion: PublicacionResolver }
          }
        ]  
        },
        
        
      ]
    },
    { path:'secretaria',
      // component: DashboardComponent,
      children: [
        {path:'',},
        {path:'controlar-seguros', component: ControlarSegurosComponent},
        {path:'autorizar-carta-vacante', component: AutorizarCartaVacanteComponent},
        {path:'hemeroteca', component: HemerotecaComponent }
      
      ]
    },
    { path:'encargado-empresa',
    // component: DashboardComponent,
    children: [
      {path:'',},
      {path: 'responder-carta-vacante', component: ResponderCartaSolicitudComponent, 
        children: [
          {path:'',},
          {path:':id', component: VerCartaSolicitudComponent, resolve: { cartaVacante: ResponderCartaVacanteResolver } }
        ]
      },
      {path: 'solicitar-estudiante', component: SolicitarEstudianteMenuComponent, },
      {path: 'evaluar-estudiante', component: EvaluarEstudianteComponent }
      
    ]
  },
    { path:'comision-titulacion-practica',
      // component: DashboardComponent,
      children: [
        {path:'',},
        {path: 'administrar-publicaciones', component: PublicacionesCTComponent, 
          children: [
            {path:'',},
            {
            path: ':id', component: VerPublicacionCTComponent, resolve: { publicacion: PublicacionResolver }
            }
          ]  
        },
        {path: 'crear-publicacion', component: CrearPublicacionComponent,},
        {path: 'generar-actas-practica', component: GenerarActaEvaluacionComponent,},
        {path: 'crear-comision-correccion', component: CreateComisionCorreccionComponent,},
        {path: 'asignar-comision-correccion', component: AsignarProfesoresCcComponent,},
        {path: 'registro-datos-practica', component: RegistroDatosPracticaComponent }
      ]
    },
      { path:'comision-correccion-practica',
      // component: DashboardComponent,
      children: [
          {path:'',},
          { path:'download-informe',component:DownloadInformeComponent}, 
          {path: 'evaluar-defensa', component: EvaluarDefensaComponent }
        ]
      },
    
      { path:'**', redirectTo: ''},
    ]
  },
  

  // {
  //   path:'',
  //   children: [
  //     { path: '', component: DashboardComponent},
  //     { path: 'register-usuario', component: RegisterUsuarioComponent},
  //     { path: '**', redirectTo: '' },
  //   ]
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProtectedRoutingModule { }
