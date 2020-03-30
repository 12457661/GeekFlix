import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { MovieComponent } from './components/movie/movie.component';


const routes: Routes = [
  {path: '', redirectTo: '/page/1', pathMatch: 'full'},
  {path: 'page/:id', component: HomeComponent},
  {path: 'movie/:id', component: MovieComponent},
  {path: '**', component: PageNotFoundComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponenets = [HomeComponent, PageNotFoundComponent]
