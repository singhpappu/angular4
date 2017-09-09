import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { OAuthService } from 'angular-oauth2-oidc';
@Injectable()
export class AuthService {

  constructor( 
    private oauthService: OAuthService
  ) { }

  setAuthorizationHeader(){
    let headers = new Headers();
    headers.set('Authorization', this.oauthService.authorizationHeader());
    headers.set('X-Requested-With', 'XMLHttpRequest');
    headers.set('X-CSRF-TOKEN', 'F9Q9OEmyrheJG8EqbjR1JSdjfHmUTWD5ywXqYjg7');    
    return { headers: headers };
  }
  setFileUploadAuthHeader() {
    return {'Authorization': this.oauthService.authorizationHeader()}
  }
}
