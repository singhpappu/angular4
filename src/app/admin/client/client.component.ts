import { Component, OnInit, ViewChild } from '@angular/core';
import { ClientService } from './client.service';
import { ModalDirective } from 'ngx-bootstrap/modal/modal.component';
import { FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { SpinnerService } from '../../loader/spinner/spinner.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit {

  clientForm:FormGroup;
  private name : AbstractControl;
  private redirect : AbstractControl;
  constructor(fb: FormBuilder,
    private clientService:ClientService,
    private spinner: SpinnerService
    ) {
    this.clientForm = fb.group({
      'name': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      'redirect': ['', Validators.compose([Validators.required])],
    });
    this.name = this.clientForm.controls['name'];
    this.redirect = this.clientForm.controls['redirect'];    
  }
  public clients: any[];
  ngOnInit() {
    this.spinner.show();
    this.clientService.getClients().then((response:any)=>{
      this.clients = response;
      this.spinner.hide();
      console.log("Clients::", response);
    });
  }

  createClient(value) {
    console.log("value",value);
    this.clientService.createClient(value).then((response) => {
        this.clients.push(response);
    });
  }

  authorizeClient(client) {
    this.clientService.authorizeClient(client).then((response) => {
        this.clients.push(response);
    });
  }

}
