import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: './components/home/home.module#HomePageModule' },
  { path: 'login', loadChildren: './components/login/login.module#LoginPageModule' },
  { path: 'register', loadChildren: './components/register/register.module#RegisterPageModule' },
  { path: 'list/:categoryName', loadChildren: './components/list/list.module#ListPageModule' },
  { path: 'details', loadChildren: './components/details/details.module#DetailsPageModule' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
