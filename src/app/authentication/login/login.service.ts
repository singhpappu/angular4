import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { OAuthService } from 'angular-oauth2-oidc';

@Injectable()
export class LoginService {

  private url = `${environment.oauthUrl}oauth/token`;

  constructor(
    private oauthService: OAuthService,
    
  ) { }

  ngOnInit() {
    // this.oauthService.
   }

  authenticate(values) {
    this.oauthService.setStorage(sessionStorage);
    this.oauthService.clientId = `${environment.client_id}`;
    this.oauthService.tokenEndpoint = this.url;
    this.oauthService.scope = 'admin';
    this.oauthService.dummyClientSecret = `${environment.client_secret}`;
    let self = this;
    return this.oauthService.fetchTokenUsingPasswordFlow(values.username, values.password);
  }
  
}
