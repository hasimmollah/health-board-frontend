import { Component, OnInit,OnDestroy } from '@angular/core';
import { Application } from '../_models/index';
import { ApplicationService } from '../_services/index';
import { Observable, interval, Subscription } from  "rxjs";
import { AppCONFIG } from '../config';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit,OnDestroy {
 applications:any = [];
 applicationResponse:Observable<Application[]> ;
 updateSubscription: Subscription;
 currVal:string;
  constructor(private applicationService: ApplicationService) { 
  
  }

  ngOnInit() {
	  this.loadApplications();
	  this.updateSubscription = interval(AppCONFIG.API_REFRESH_TIME).subscribe(
        (val) => { 
		
		this.loadApplications();
      });
	 
  }
  ngOnDestroy() {
  if (this.updateSubscription) {
    this.updateSubscription.unsubscribe();
  }
}


  loadApplications() {
	  
	   return  this.applicationService.getApplications().subscribe((data: {}) => {
		   console.log('loadApplications called '+data);
		this.applications = data;
		});
		
}

}
