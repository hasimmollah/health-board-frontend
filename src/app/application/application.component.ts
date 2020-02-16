import { Component, OnInit } from '@angular/core';
import { Application } from '../_models/index';
import { ApplicationService } from '../_services/index';

import { Observable } from 'rxjs';

import {BrowserModule} from "@angular/platform-browser";
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';


import { ActivatedRoute,Router } from '@angular/router';
@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.css']
})
export class ApplicationComponent implements OnInit {
 applications:any = [];
 sub:any;
 application:Application;
 applicationResponse:Observable<Application[]> ;
 appId:string;
 
  constructor(private route: ActivatedRoute, private router: Router,private applicationService: ApplicationService) { 
  
  }

  ngOnInit() {
	 this.sub = this.route.params.subscribe(params => {
       this.appId = params['appId']; // (+) converts string 'id' to a number

       // In a real app: dispatch action to load the details here.
    });
	 this.viewApplication(this.appId);
	 
  }
  

  loadApplications() {
	   return  this.applicationService.getApplications().subscribe((data: {}) => {
		this.applications = data;
		});
}

	viewApplication(appId:string){
		
	return  this.applicationService.getApplication(appId).subscribe(data => {
		this.application = data;
		});
}
}
