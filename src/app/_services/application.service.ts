import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response} from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from  "rxjs";
import { Application } from '../_models/index';
import { AppCONFIG } from '../config';

@Injectable()
export class ApplicationService {
    constructor(private http: HttpClient){}
	 inputData = '';

    httpOptions = {
	headers: new HttpHeaders({
	'Content-Type': 'application/json'
		})
}  
	
	getApplications(): Observable<Application[]> {
   return this.http.get<Application[]>(AppCONFIG.API_ENDPOINT +'/applications', this.httpOptions);
  // return this.http.get<Application[]>('/health-dashboard-api/v1.0/applications', this.httpOptions);
}
	getApplication(id:string): Observable<Application> {
   return this.http.get<Application>(AppCONFIG.API_ENDPOINT +'/applications/application/'+id, this.httpOptions);
   //return this.http.get<Application>('/health-dashboard-api/v1.0/applications/application/'+id, this.httpOptions);
}
}