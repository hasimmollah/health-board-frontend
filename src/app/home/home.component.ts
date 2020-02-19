import { Component, OnInit,OnDestroy } from '@angular/core';
import { Application } from '../_models/index';
import { ApplicationService } from '../_services/index';
import { Observable, interval, Subscription } from  "rxjs";
import { AppCONFIG } from '../config';

import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { ApplicationDataResponse } from '../healthboard/application-data.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit,OnDestroy {
 applications:any = [];
 applicationResponse:Observable<Application[]> ;
 updateSubscription: Subscription;
 currVal:string;
 applicationDataResponse: ApplicationDataResponse;
 webSocketEndPoint: string = 'http://localhost:9080/health-board-api/v1.0/health-board-websocket';
    topic: string = "/topic/greetings";
    stompClient: any;
    
  constructor(private applicationService: ApplicationService) { 
  
  }

  ngOnInit() {
	  this.connect();
  }
  ngOnDestroy() {
  this.disconnect();
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
        this.currVal = message.body;
		this.applicationDataResponse=JSON.parse(message.body);
    }

}
