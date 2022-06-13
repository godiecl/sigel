import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RegisterUsuarioComponent } from './administrador/register-usuario/register-usuario.component';
import { DeleteUsuarioComponent } from './administrador/delete-usuario/delete-usuario.component';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { EditUsuarioComponent } from './administrador/edit-usuario/edit-usuario.component';

const routes: Routes = [


  {
    path:'',
    component: DashboardComponent,
    children: [
      { path:'',},
      { path:'register-usuario', component: RegisterUsuarioComponent},
      { path:'delete-usuario', component: DeleteUsuarioComponent},
      { path:'edit-usuario', component: EditUsuarioComponent},
      { path:'main-menu', component: MainMenuComponent},
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
