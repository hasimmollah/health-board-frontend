import { Component, OnInit,OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, interval, Subscription } from  "rxjs";
import * as $ from "jquery";
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';

import { ApplicationDataResponse } from './application-data.model';
import { HealthBoardService } from './healthboard.service';
import { AppCONFIG } from '../../config';

import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';


@Component({
  selector: 'app-healthboard',
  templateUrl: './healthboard.component.html',
  styleUrls: ['./healthboard.component.css']
})
export class HealthboardComponent implements OnInit,OnDestroy {
 
 private _jsonURL = './ApplicationJson.json';
 applicationDataResponse:ApplicationDataResponse[] ;
 updateSubscription: Subscription;
  webSocketEndPoint: string = AppCONFIG.SOCKET_ENDPOINT;
    topic: string = AppCONFIG.SOCKET_TOPIC;
    stompClient: any;
	mySubscription: any;

  constructor(private http: HttpClient, private tHealthBoardService: HealthBoardService, private router: Router) { 
   this.router.routeReuseStrategy.shouldReuseRoute = function () {
  return false;
};
this.mySubscription = this.router.events.subscribe((event) => {
  if (event instanceof NavigationEnd) {
    // Trick the Router into believing it's last link wasn't previously loaded
    this.router.navigated = false;
  }
});
   
  }

  ngOnInit() {
	  this.loadApplications();
	  this.connect();
	 
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
	  this.disconnect();
	if (this.updateSubscription) {
    this.updateSubscription.unsubscribe();
  }
  }
  showhide(tag){
	 console.log(tag);
	 console.log($(tag).html());
	  $('#'+tag).toggle();
	 
 }
 
 connect() {
        console.log("Initialize WebSocket Connection");
        let ws = new SockJS(this.webSocketEndPoint);
        this.stompClient = Stomp.over(ws);
        const _this = this;
        _this.stompClient.connect({}, function (frame) {
            _this.stompClient.subscribe(_this.topic, function (sdkEvent) {
                _this.onMessageReceived(sdkEvent);
            });
            //_this.stompClient.reconnect_delay = 2000;
        }, this.errorCallBack);
    }
 disconnect() {
        if (this.stompClient !== null) {
            this.stompClient.disconnect();
        }
        console.log("Disconnected");
    }
	
	errorCallBack(error) {
		const _this = this;
        console.log("errorCallBack -> " + error)
        setTimeout(() => {
            _this.connect();
        }, 5000);
    }
	
	onMessageReceived(message) {
        console.log("Message Recieved from Server :: " + message.body);
		
        this.applicationDataResponse=JSON.parse(message.body);
		
    }
	
	
}
