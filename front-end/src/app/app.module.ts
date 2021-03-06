import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';
import { FlashMessagesModule } from 'angular2-flash-messages';


// routes
import { APP_ROUTING  } from './app.routes';

// components
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { CharactersComponent } from './components/characters/characters.component';
import { ShowCharacterComponent } from './components/show-character/show-character.component';
import { AddCharacterComponent } from './components/add-character/add-character.component';
import { SearchComponent } from './components/search/search.component';


// services
import { CharactersService } from './services/characters.service';
import { CategoriesService } from './services/categories.service';
import { FlashMessagesService } from 'angular2-flash-messages';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    AboutComponent,
    CharactersComponent,
    ShowCharacterComponent,
    AddCharacterComponent,
    SearchComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    APP_ROUTING,
    NgbModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    FlashMessagesModule
  ],
  providers: [
    CharactersService, FlashMessagesService, NgbActiveModal, CategoriesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
