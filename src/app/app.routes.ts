import { Routes } from '@angular/router';
import { IntroduccionComponent } from './components/introduccion/introduccion.component';
import { CaracteristicasComponent } from './components/caracteristicas/caracteristicas.component';
import { TriviaComponent } from './components/trivia/trivia.component';

export const routes: Routes = [
  { path: '', redirectTo: 'introduccion', pathMatch: 'full' },
  { path: 'introduccion', component: IntroduccionComponent },
  { path: 'caracteristicas', component: CaracteristicasComponent },
  { path: 'trivia', component: TriviaComponent },
  { path: '**', redirectTo: 'introduccion' }
];
