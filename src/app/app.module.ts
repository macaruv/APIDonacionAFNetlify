import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { routes } from './app.routes';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';

import { CentrosDeDonacionComponent } from './components/centros-de-donacion/centros-de-donacion.component';
import { CentroDeDonacionFormComponent } from './components/centro-de-donacion-form/centro-de-donacion-form.component';
import { IntermediariosComponent } from './components/intermediarios/intermediarios.component'; 
import { IntermediarioFormComponent } from './components/intermediarios-form/intermediarios-form.component';
import { PersonasComponent } from './components/personas/personas.component';
import { PersonaFormComponent } from './components/persona-form/persona-form.component';
import { DonadoresComponent } from './components/donadores/donadores.component';
import { DonadorFormComponent } from './components/donador-form/donador-form.component';
import { BeneficiariosComponent } from './components/beneficiarios/beneficiarios.component';
import { BeneficiarioFormComponent } from './components/beneficiario-form/beneficiario-form.component';

import { PdfReportComponent } from './components/pdf-report/pdf-report.component';

import { FileUploadService } from './services/file-upload.service';
import { PersonaService } from './services/persona.service';


@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(routes),
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    HttpClientModule,

    CentrosDeDonacionComponent,
    CentroDeDonacionFormComponent,
    IntermediariosComponent,
    IntermediarioFormComponent,
    PersonasComponent,
    PersonaFormComponent,
    DonadoresComponent,
    DonadorFormComponent,
    BeneficiariosComponent,
    BeneficiarioFormComponent,
    PdfReportComponent
  ],
  providers: [FileUploadService,PersonaService],
  bootstrap: []
})
export class AppModule { }
