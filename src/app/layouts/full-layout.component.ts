import { Component, OnInit } from '@angular/core';
import { SpinnerService } from '../loader/spinner/spinner.service';
import { OAuthService } from 'angular-oauth2-oidc';
import { UserService } from '../admin/user/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './full-layout.component.html'
})


export class FullLayoutComponent implements OnInit {

  public disabled = false;
  public status: {isopen: boolean} = {isopen: false};

  constructor(
    private oauthService: OAuthService,
    private userService: UserService
  ){}

  public toggled(open: boolean): void {
    console.log('Dropdown is now: ', open);
  }

  public toggleDropdown($event: MouseEvent): void {
    $event.preventDefault();
    $event.stopPropagation();
    this.status.isopen = !this.status.isopen;
  }
  public activeUser: any = '';
  ngOnInit(): void {   
    this.userService.loadProfile().then((response: any) => {
        response.isSuccessful ? this.activeUser = response.payload:'Anonymous User';        
    })
  
  }



  public logout() {
    this.oauthService.logOut();
    window.location.reload();
  }
}
