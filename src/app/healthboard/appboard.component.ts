import { Component, OnInit,OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, interval, Subscription } from  "rxjs";
import * as $ from "jquery";
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';


@Component({
  selector: 'app-appboard',
  templateUrl: './appboard.component.html',
  styleUrls: ['./appboard.component.css']
})
export class AppboardComponent implements OnInit,OnDestroy {
 


  constructor() { 
   

   
  }

  ngOnInit() {
	  
	 
  }
  
 


  ngOnDestroy() {
	 
  }
 	
}
