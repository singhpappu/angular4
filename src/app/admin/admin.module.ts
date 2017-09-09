import { ClientModule } from './client/client.module';
import { SpinnerService } from '../loader/spinner/spinner.service';
import { UserModule } from './user/user.module';
import { AdminComponent } from './admin.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { UserComponent } from './user/user.component';
import { ClientComponent } from './client/client.component';
import { BlogComponent } from './blog/blog.component';
import { BlogModule } from './blog/blog.module';
import { LeadComponent } from './lead/lead.component';
import { LeadModule } from './lead/lead.module';
import { XlsxComponent } from './file/xlsx/xlsx.component';
import { UploadComponent } from './file/upload/upload.component';

@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    UserModule,
    ClientModule,
    BlogModule,
    LeadModule
  ],
  declarations: [AdminComponent, LeadComponent, XlsxComponent],
  providers: [SpinnerService]
})
export class AdminModule { }
