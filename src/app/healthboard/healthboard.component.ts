import { Component, OnInit,OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, interval, Subscription } from  "rxjs";
import * as $ from "jquery";

import { ApplicationDataResponse } from './application-data.model';
import { HealthBoardService } from './healthboard.service';
import { AppCONFIG } from '../config';

@Component({
  selector: 'app-healthboard',
  templateUrl: './healthboard.component.html',
  styleUrls: ['./healthboard.component.css']
})
export class HealthboardComponent implements OnInit,OnDestroy {
 
 private _jsonURL = './ApplicationJson.json';
 applicationDataResponse:ApplicationDataResponse[] ;
 updateSubscription: Subscription;

  constructor(private http: HttpClient, private tHealthBoardService: HealthBoardService) { 
   
   
  }

  ngOnInit() {
	  this.loadApplications();
	  this.updateSubscription = interval(AppCONFIG.API_REFRESH_TIME).subscribe(
        (val) => { 
		
		this.loadApplications();
      });
	 
  }
  
  loadApplications(){
	  return this
      .tHealthBoardService
      .getApplications()
      .subscribe((data: ApplicationDataResponse[]) => {
		  console.log(data);
        this.applicationDataResponse = data;
    });
  }


  ngOnDestroy() {
	if (this.updateSubscription) {
    this.updateSubscription.unsubscribe();
  }
  }
  showhide(tag){
	 console.log(tag);
	 console.log($(tag).html());
	  $('#'+tag).toggle();
	 
 }
}
