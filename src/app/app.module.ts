import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { ContenidoPracticacapstoneComponent } from './contenido-practicacapstone/contenido-practicacapstone.component';
import { DocumentPracticacapstoneComponent } from './document-practicacapstone/document-practicacapstone.component';
import { DownloadDocumentComponent } from './download-document/download-document.component';
import { ContenidoPracticaComponent } from './contenido-practica/contenido-practica.component';
import { ContenidoCapstoneComponent } from './contenido-capstone/contenido-capstone.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FooterComponent,
    HeaderComponent,
    ContenidoPracticacapstoneComponent,
    DocumentPracticacapstoneComponent,
    DownloadDocumentComponent,
    ContenidoPracticaComponent,
    ContenidoCapstoneComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
