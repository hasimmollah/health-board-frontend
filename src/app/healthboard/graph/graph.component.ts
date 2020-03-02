import { Component, OnInit,OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, interval, Subscription } from  "rxjs";
import * as $ from "jquery";
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { ApplicationStatResponse } from './graph-data.model';
import { ApplicationStat } from './graph-data.model';
import { AppCONFIG } from '../../config';

import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})
export class GraphComponent implements OnInit,OnDestroy {
	
	
	 webSocketEndPoint: string = AppCONFIG.SOCKET_ENDPOINT;
    topic: string = AppCONFIG.TOPIC_STAT;
    stompClient: any;
	mySubscription: any;
 
public barChartOptions:any = {
    scaleShowVerticalLines: false,
    responsive: true,
	scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true
          }
        }
      ]
    }
  };
  public mbarChartEnvLabels:string[] = [];
  public mbarChartLabLabels:string[] = [];
  envData: any = [];
  applicationStatResponse:ApplicationStatResponse;
  environmentWiseStat: ApplicationStat[];
  labWiseStat: ApplicationStat[];
    public barChartType:string = 'bar';
    public barChartLegend:boolean = true;
   public barChartColors:Array<any> = [
    {
      backgroundColor: 'rgba(0, 102, 0,0.6)',
      borderColor: 'rgba(0, 102, 0,1)',
      pointBackgroundColor: 'rgba(0, 102, 0,1)',
      pointBorderColor: '#fafafa',
      pointHoverBackgroundColor: '#fafafa',
      pointHoverBorderColor: 'rgba(0, 102, 0)'
    },
    { 
      backgroundColor: 'rgba(255, 51, 0,0.6)',
      borderColor: 'rgba(255, 51, 0,1)',
      pointBackgroundColor: 'rgba(255, 51, 0,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(255, 51, 0,1)'
    }
  ];
  public barChartEnvLiveData:Array<any> =[];
  public barChartEnvDeadData:Array<any> =[];
   public barChartEnvData:any[] = [];
	public barChartLabLiveData:Array<any> =[];
  public barChartLabDeadData:Array<any> =[];
  
	public barChartLabData:any[] = [];
  
    // events
    public chartClicked(e:any):void {
      console.log(e);
    }
  
    public chartHovered(e:any):void {
      console.log(e);
    }
	
	 
  constructor(private tHttpClient:HttpClient, private router: Router) { 
   
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
	  this.connect();
	 
  }
  
  
  populateBarData(message){
	  
	  console.log("Stat Message Recieved from Server :: " + message.body);
	  this.applicationStatResponse = JSON.parse(message.body);;
	  this.mbarChartEnvLabels=[];
	  this.barChartEnvLiveData=[];
	   this.barChartEnvDeadData=[];
	   
	  this.applicationStatResponse.environment.forEach(environmentWiseStatData => {
		this.mbarChartEnvLabels.push(environmentWiseStatData.name);
		this.barChartEnvLiveData.push(environmentWiseStatData.liveCount);
		this.barChartEnvDeadData.push(environmentWiseStatData.deadCount);
      });
	  this.mbarChartLabLabels=[];
	  this.barChartLabLiveData=[];
	   this.barChartLabDeadData=[];
	  this.applicationStatResponse.lab.forEach(labWiseStatData => {
		this.mbarChartLabLabels.push(labWiseStatData.name);
		this.barChartLabLiveData.push(labWiseStatData.liveCount);
		this.barChartLabDeadData.push(labWiseStatData.deadCount);
      });
	  
	  //this.labWiseStat=this.applicationStatResponse.labWiseStat;
	  this.barChartEnvData=[];
	  
	  this.barChartEnvData.push({data:this.barChartEnvLiveData, label: 'Live App'});
	   this.barChartEnvData.push({data:this.barChartEnvDeadData, label: 'Dead App'});
	   
	   
	  this.barChartLabData=[];
	  
	  
	    this.barChartLabData.push({data:this.barChartLabLiveData, label: 'Live App'});
	   this.barChartLabData.push({data:this.barChartLabDeadData, label: 'Dead App'});
  }
 


  ngOnDestroy() {
	 this.disconnect();
	 if (this.mySubscription) {
    this.mySubscription.unsubscribe();
  }
  }
  
  
  connect() {
        console.log("Initialize WebSocket Connection");
        let ws = new SockJS(this.webSocketEndPoint);
        this.stompClient = Stomp.over(ws);
        const _this = this;
        _this.stompClient.connect({}, function (frame) {
            _this.stompClient.subscribe(_this.topic, function (sdkEvent) {
                _this.populateBarData(sdkEvent);
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
	
	
 	
}
