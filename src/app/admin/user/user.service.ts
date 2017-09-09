import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { environment } from '../../../environments/environment';
import { AuthService } from '../../guard/auth.service';
import { Subject } from 'rxjs/Rx';
import { OAuthService } from 'angular-oauth2-oidc';
export class Users { }

@Injectable()
export class UserService {

  public userSubject = new Subject<Users[]>();

  constructor(
    private http: Http,
    private authService: AuthService,
    private oauthService: OAuthService
  ) { }
  private url = `${environment.apiUrl}`;
  private headers = this.authService.setAuthorizationHeader();

  getUser(): Promise<Users[]> {
    return this.http.get(`${this.url}users`, this.headers)
      .toPromise()
      .then(response => response.json().payload as Users[])
      .catch();
  }

  changeStatus(user): Promise<any[]> {
      return this.http.patch(`${this.url}users`, user, this.headers)
      .toPromise()
      .then(response => response.json().payload)
      .catch();
  }

  loadProfile() {
    this.oauthService.userinfoEndpoint = `${this.url}getUserProfile`;
    return this.oauthService.loadUserProfile();
  }
}
