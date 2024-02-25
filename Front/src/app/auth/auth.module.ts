import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './pages/login/login.component';
import { MainComponent } from './pages/main/main.component';
import { RegisterComponent } from './pages/register/registerEmpresa/register.component';
import { RegisterContactoComponent } from './pages/register/register-contacto/register-contacto.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { NewPasswordComponent } from './pages/new-password/new-password.component';
import { SolicitarEstudianteComponent } from './pages/solicitar-estudiante/solicitar-estudiante.component';
import { BuscarEmpresaComponent } from './pages/register/register-contacto/buscar-empresa/buscar-empresa.component';


// ANGULAR MATERIAL
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    MainComponent,
    RegisterContactoComponent,
    ForgotPasswordComponent,
    NewPasswordComponent,
    SolicitarEstudianteComponent,
    BuscarEmpresaComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule
  ]
})
export class AuthModule { }
