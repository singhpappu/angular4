import { Injectable } from '@angular/core';
import {Lead } from './leads';
import { Http } from '@angular/http';
import { environment } from '../../../environments/environment';
import { AuthService } from '../../guard/auth.service';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs';

@Injectable()
export class LeadService {

  public filesSubject: Subject<File>;

  constructor(
    private http: Http,
    private authService: AuthService
  ) { }

  private url = `${environment.apiUrl}`;
  private headers = this.authService.setAuthorizationHeader();
  getLeads():Promise <Lead[]> {
    return this.http.get(`${this.url}leads/get`, this.headers)
      .toPromise()
      .then(response => response.json() as Lead[])
      .catch();
  }

  importXlxsData(data):Promise <Lead[]> {
    return this.http.post(`${this.url}leads/import`,data, this.headers)
    .toPromise()
    .then(response => response.json() as Lead[])
    .catch(); 
  }
}
