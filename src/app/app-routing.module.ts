import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './auth/signup/signup.component';
import { SigninComponent } from './auth/signin/signin.component';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: 'auth/signup', component: SignupComponent},
  { path: 'auth/signin', component: SigninComponent},
  { path: 'score', loadChildren: './pages/score/score.module#ScorePageModule'},
  { path: 'activite', loadChildren: './pages/activite/activite.module#ActivitePageModule'},
  { path: 'stats', loadChildren: './pages/stats/stats.module#StatsPageModule'},
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules}),
        IonicModule,
        ReactiveFormsModule
    ],
  declarations: [SignupComponent, SigninComponent],
  exports: [RouterModule]
})
export class AppRoutingModule { }
