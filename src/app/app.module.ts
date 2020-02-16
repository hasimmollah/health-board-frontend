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
import { HealthboardComponent } from './healthboard/healthboard.component';

import { HealthBoardService } from './healthboard/healthboard.service';

import { ApplicationService } from './_services/index';


@NgModule({
  declarations: [
    AppComponent,
	HealthBoardFooterComponent,
	HealthBoardHeaderComponent,
	DashboardComponent,
	ApplicationComponent,
	HealthboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
	HttpClientModule,
	ReactiveFormsModule,
	StorageServiceModule
  ],
  providers: [
  ApplicationService,HealthBoardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
