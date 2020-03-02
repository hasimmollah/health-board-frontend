import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule  } from '@angular/forms';
import { StorageServiceModule } from 'ngx-webstorage-service';

import { AppRoutingModule } from './routing/app-routing.module';
import { AppComponent } from './app.component';
import { HealthBoardFooterComponent } from './footer/healthboard-footer.component';
import { HealthBoardHeaderComponent } from './header/healthboard-header.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ApplicationComponent } from './application/application.component';
import { HealthboardComponent } from './healthboard/dashboard/healthboard.component';
import { GraphComponent } from './healthboard/graph/graph.component';
import { AppboardComponent } from './healthboard/appboard.component';

import { HealthBoardService } from './healthboard/dashboard/healthboard.service';

import { ApplicationService } from './_services/index';
import { ChartsModule } from 'ng2-charts';



@NgModule({
  declarations: [
    AppComponent,
	HealthBoardFooterComponent,
	HealthBoardHeaderComponent,
	DashboardComponent,
	ApplicationComponent,
	HealthboardComponent,
	AppboardComponent,
	GraphComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
	HttpClientModule,
	ReactiveFormsModule,
	StorageServiceModule,
	ChartsModule
  ],
  providers: [
  ApplicationService,HealthBoardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
