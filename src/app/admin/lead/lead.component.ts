import { LeadService } from './lead.service';
import { Component, OnInit } from '@angular/core';
import { Lead } from './leads';

@Component({
  selector: 'app-lead',
  templateUrl: './lead.component.html',
  styleUrls: ['./lead.component.scss']
})
export class LeadComponent implements OnInit {

  public leads = new Lead();
  public isDisplayContent: Boolean = false;
  constructor(
    private leadService: LeadService
  ) { }

  ngOnInit() {
    this.getLeads();
  }

  getLeads() {
    this.leadService.getLeads().then((response: any) => {
      this.leads  = response ;
      this.isDisplayContent = response.length ? true:false;
      console.log(this.leads);
    }).catch(error => {

    });
  }

}
