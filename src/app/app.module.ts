import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListBookComponent } from './components/admin/list-book/list-book.component';
import { DetailsBookComponent } from './components/admin/details-book/details-book.component';
import { HeroComponent } from './components/admin/hero/hero.component';
import { HomeComponent } from './components/admin/home/home.component';
import { ModalComponent } from './components/modal/modal.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { OffersComponent } from './components/offers/offers.component';
import { LoginComponent } from './components/users/login/login.component';
import { ProfileComponent } from './components/users/profile/profile.component';
import { RegisterComponent } from './components/users/register/register.component';
import { Page404Component } from './components/page404/page404.component';
import {FormsModule} from '@angular/forms';
import {environment} from '../environments/environment';

import {AngularFireModule} from '@angular/fire';
import {AngularFireDatabaseModule, AngularFireDatabase} from '@angular/fire/database';
import {AngularFireAuth} from '@angular/fire/auth';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';

import { Truncar } from './pipes/myPipes.pipe';
import { SuperAdminComponent } from './components/admin/super-admin/super-admin.component'

@NgModule({
  declarations: [
    AppComponent,
    ListBookComponent,
    DetailsBookComponent,
    HeroComponent,
    HomeComponent,
    ModalComponent,
    NavbarComponent,
    OffersComponent,
    LoginComponent,
    ProfileComponent,
    RegisterComponent,
    Page404Component,
    Truncar,
    SuperAdminComponent    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireStorageModule   
  ],
  providers: [AngularFireAuth,
              AngularFirestore],
  bootstrap: [AppComponent]
})
export class AppModule { }
