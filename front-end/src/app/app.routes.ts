import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { CharactersComponent } from './components/characters/characters.component';
//import { ShowCharacterComponent } from './components/show-character/show-character.component';

const APP_ROUTES: Routes = [

  {path: 'home', component: HomeComponent },
  {path: 'about', component: AboutComponent },
  {path: 'characters', component: CharactersComponent },
  // {path: 'show-character/:id', component: ShowCharacterComponent },
  {path: '**', pathMatch: 'full', redirectTo: 'home' }

  ];

  export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES);
