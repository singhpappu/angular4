import { Component, OnInit, NgZone } from '@angular/core';
import { UserService } from './user.service';
import { Http } from '@angular/http';
import { SpinnerService } from '../../loader/spinner/spinner.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  constructor(
    private userService: UserService,
    private zone: NgZone,
    private spinner: SpinnerService,    
  ) {
    this.spinner.show();
    // this.loadProfile();
   }

  public users: any[];
  ngOnInit() {
    this.getUser();
    let self = this;
    this.userService.userSubject.subscribe(
      data => {
        self.zone.run(() => {
          this.users = data;         
        });
      }
    )

    // console.log("loader");
    // this.spinner.show();

  }

  /* fetch user listing */
  getUser() {
    this.userService.getUser()
      .then((response) => {
        this.users = response;
        this.spinner.hide();
      })
      .catch();
  }

  changeStatus(index) {
    this.spinner.show();
    this.userService.changeStatus(this.users[index]).then((response: any) => {
      this.users[index].is_active = response.is_active; 
      this.spinner.hide();    
    });
  }

  loadProfile(): any {
    this.userService.loadProfile().then((response)=>{
        console.log("Profile",response);
    })
  }

}
