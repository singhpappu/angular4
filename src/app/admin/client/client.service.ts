import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { environment } from '../../../environments/environment';
import { AuthService } from '../../guard/auth.service';
import { OAuthService } from 'angular-oauth2-oidc';
export class Clients { }

@Injectable()
export class ClientService {
  constructor(
    private http: Http,
    private authService: AuthService,
    private oauthService: OAuthService
  ) { }
  private url = `${environment.oauthUrl}`;
  private headers = this.authService.setAuthorizationHeader();

  getClients(): Promise<Clients[]> {
    return this.http.get(`${this.url}oauth/clients`, this.headers)
      .toPromise()
      .then(response => response.json() as Clients[])
      .catch();
  }

  createClient(value): Promise<Clients[]> {
      return this.http.post(`${this.url}oauth/clients`, value , this.headers)
      .toPromise()
      .then(response => response.json() as Clients[])
      .catch();
  }


  authorizeClient(value): Promise<Clients[]> {
      let query: String = '?client_id='+ value.id + '&redirect_uri='+ value.redirect + '&response_type =code&scope=*&grant_type=password';
      return this.http.get(`${this.url}oauth/authorize`+ query, this.headers)
      .toPromise()
      .then(response => response.json() as Clients[])
      .catch();
  }
}
