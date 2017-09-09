import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';

import { OAuthService } from 'angular-oauth2-oidc';
@Injectable()
export class AuthGuard implements CanActivate {

    constructor(
      private oauthService: OAuthService,
      private router: Router
    ){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {

      // // URL of the SPA to redirect the user to after login
      //   this.oauthService.redirectUri = window.location.origin + "/dashboard";
 
      //   // The SPA's id. The SPA is registerd with this id at the auth-server
      //   this.oauthService.clientId = `${environment.client_id}`;
 
      //   // set the scope for the permissions the client should request
      //   // The first three are defined by OIDC. The 4th is a usecase-specific one
      //   this.oauthService.scope = "openid profile email voucher";
 
      //   // set to true, to receive also an id_token via OpenId Connect (OIDC) in addition to the
      //   // OAuth2-based access_token
      //   this.oauthService.oidc = true;
 
      //   // Use setStorage to use sessionStorage or another implementation of the TS-type Storage
      //   // instead of localStorage
      //   this.oauthService.setStorage(sessionStorage);
 
      //   // The name of the auth-server that has to be mentioned within the token
      //   this.oauthService.issuer = `${environment.oauthUrl}identity`;
        
      //   // Load Discovery Document and then try to login the user
      //   this.oauthService.loadDiscoveryDocument().then(() => {
 
      //       // This method just tries to parse the token(s) within the url when
      //       // the auth-server redirects the user back to the web-app
      //       // It dosn't send the user the the login page
      //       this.oauthService.tryLogin({});      
 
      //   });
 



      this.oauthService.setStorage(sessionStorage);
      let _isValid = this.oauthService.hasValidAccessToken();
      console.log("Authenticated ",_isValid);
      if(!_isValid)
        this.router.navigate(['/auth/login']); 
      return true;
  }
 
}
