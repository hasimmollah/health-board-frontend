import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response} from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from  "rxjs";
import { AppCONFIG } from '../../config';

import { ApplicationDataResponse } from './application-data.model';

@Injectable()
export class HealthBoardService {
	private _jsonURL = 'assets/ApplicationJson.json';
    constructor(private http: HttpClient){
		
	}
	 inputData = '';

	 httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
    
  })
};
    
	
	getApplications() {
		
		this.httpOptions = {
		headers: new HttpHeaders({
			'Content-Type':  'application/json'    
		})
		};
		return this.http.get<ApplicationDataResponse[]>(AppCONFIG.API_ENDPOINT +'/applications', this.httpOptions);
		//return this.http.get(this._jsonURL);
  // return this.http.get<Application[]>('/health-dashboard-api/v1.0/applications', this.httpOptions);
	}
	
}