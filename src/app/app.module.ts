import { XlsxModule } from './admin/file/xlsx/xlsx.module';
import { AuthService } from './guard/auth.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { LocationStrategy, HashLocationStrategy,PathLocationStrategy } from '@angular/common';

import { AppComponent } from './app.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { NAV_DROPDOWN_DIRECTIVES } from './shared/nav-dropdown.directive';

import { ChartsModule } from 'ng2-charts/ng2-charts';
import { SIDEBAR_TOGGLE_DIRECTIVES } from './shared/sidebar.directive';
import { AsideToggleDirective } from './shared/aside.directive';
import { BreadcrumbsComponent } from './shared/breadcrumb.component';

import { HttpModule } from '@angular/http';
// Routing Module
import { AppRoutingModule } from './app.routing';

// Layouts
import { FullLayoutComponent } from './layouts/full-layout.component';
import { SimpleLayoutComponent } from './layouts/simple-layout.component';
import { AuthGuard } from './guard/auth.guard';
import { OAuthService } from 'angular-oauth2-oidc';
import { SpinnerService } from './loader/spinner/spinner.service';
import { UserService } from './admin/user/user.service';
import { FormsModule ,ReactiveFormsModule } from '@angular/forms';
import { UploadModule } from './admin/file/upload/upload.module';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    UploadModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    ChartsModule,    
  ],
  declarations: [
    AppComponent,
    FullLayoutComponent,
    SimpleLayoutComponent,
    NAV_DROPDOWN_DIRECTIVES,
    BreadcrumbsComponent,
    SIDEBAR_TOGGLE_DIRECTIVES,
    AsideToggleDirective,
  ],
  providers: [{
    provide: LocationStrategy,
    useClass: HashLocationStrategy    
  }, AuthService,AuthGuard,OAuthService,SpinnerService,UserService ],
  bootstrap: [ AppComponent ]
})

export class AppModule { }
