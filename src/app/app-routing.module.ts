import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OffersComponent } from './components/offers/offers.component';
import { DetailsBookComponent } from './components/admin/details-book/details-book.component';
import { ListBookComponent } from './components/admin/list-book/list-book.component';
import { LoginComponent } from './components/users/login/login.component';
import { RegisterComponent } from './components/users/register/register.component';
import { ProfileComponent } from './components/users/profile/profile.component';
import { Page404Component } from './components/page404/page404.component';
import { HomeComponent } from './components/admin/home/home.component';
import { AuthGuard } from './guards/auth.guard'
import { SuperAdminComponent } from './components/admin/super-admin/super-admin.component';
import { AdminGuard } from './guards/admin.guard'


const routes: Routes = [  
  {path: '', component : HomeComponent},
  {path : 'offers', component : OffersComponent, canActivate : [AuthGuard]},
  {path: 'book/:id', component : DetailsBookComponent},
  {path: 'admin/list-books', component : ListBookComponent , canActivate : [AuthGuard] },
  {path: 'admin/super-admin', component :  SuperAdminComponent, canActivate : [AdminGuard] },
  {path: 'user/login', component : LoginComponent},
  {path: 'user/register', component : RegisterComponent},
  {path: 'user/profile', component : ProfileComponent, canActivate : [AuthGuard]},  
  {path: '**', component: Page404Component}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
