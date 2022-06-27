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
import { PublicacionesComponent } from './estudiante/pages/publicaciones/publicaciones.component';
import { PublicacionesCTComponent } from './comision-titulacion-practica/pages/publicaciones/publicaciones.component';
import { CrearPublicacionComponent } from './comision-titulacion-practica/pages/crear-publicacion/crear-publicacion.component';


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
        {path: 'ver-publicaciones', component: PublicacionesComponent, 
        },
        
        
      ]
    },
    { path:'comision-titulacion-practica',
      // component: DashboardComponent,
      children: [
        {path:'',},
        {path: 'administrar-publicaciones', component: PublicacionesCTComponent, 
        },
        {path: 'crear-publicacion', component: CrearPublicacionComponent, 
        },
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
