import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CentrosDeDonacionComponent } from './components/centros-de-donacion/centros-de-donacion.component';
import { IntermediariosComponent } from './components/intermediarios/intermediarios.component'; 
import { PersonasComponent } from './components/personas/personas.component';
import { DonadoresComponent } from './components/donadores/donadores.component';
import { BeneficiariosComponent } from './components/beneficiarios/beneficiarios.component';

export const routes: Routes  = [
  { path: '', component: HomeComponent },
  { path: 'centros-de-donacion', component: CentrosDeDonacionComponent },
  { path: 'intermediarios', component: IntermediariosComponent },
  { path: 'personas', component: PersonasComponent },
  { path: 'donadores', component: DonadoresComponent },
  { path: 'beneficiarios', component: BeneficiariosComponent }
  
];
