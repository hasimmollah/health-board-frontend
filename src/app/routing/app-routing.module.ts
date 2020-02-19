import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from '../dashboard/dashboard.component';
import { HealthboardComponent } from '../healthboard/healthboard.component';
import { ApplicationComponent } from '../application/application.component';
import { HomeComponent } from '../home/home.component';

const routes: Routes = [
{ path: '', redirectTo: '/dashboard', pathMatch: 'full' },
{ path: 'dashboard', component: HealthboardComponent },
{ path: 'add-application', component: ApplicationComponent },
 { path: 'view-application/:appId', component: ApplicationComponent },
 { path: 'home', component: HomeComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
