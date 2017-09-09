import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  template: `
    <div id="preloader"></div>
    <router-outlet></router-outlet>
  `,
})
export class SimpleLayoutComponent implements OnInit {

  constructor() { }

  ngOnInit(): void { }
}
