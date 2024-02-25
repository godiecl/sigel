import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './pages/main/main.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/registerEmpresa/register.component';
import { RegisterContactoComponent } from './pages/register/register-contacto/register-contacto.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { NewPasswordComponent } from './pages/new-password/new-password.component';
import { SolicitarEstudianteComponent } from './pages/solicitar-estudiante/solicitar-estudiante.component';
import { BuscarEmpresaComponent } from './pages/register/register-contacto/buscar-empresa/buscar-empresa.component';

const routes: Routes = [

  {
    path:'',
    component: MainComponent,
    children: [
      { path:'login', component: LoginComponent},
      { path:'register-empresa', component: RegisterComponent},
      { path:'buscar-empresa', component: BuscarEmpresaComponent},
      { path:'register-contacto', component: RegisterContactoComponent},
      { path:'forgot-password', component: ForgotPasswordComponent },
      { path:'new-password/:token', component: NewPasswordComponent },
      { path:'solicitar-estudiante', component: SolicitarEstudianteComponent },
      { path:'**', redirectTo: 'login'}
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
