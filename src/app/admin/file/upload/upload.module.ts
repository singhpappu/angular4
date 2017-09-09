import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../guard/auth.service';
import { BlogService } from '../../blog/blog.service';
@NgModule({
  imports: [
    CommonModule,    
  ],
  declarations: [],
  providers:[
    AuthService,
    BlogService
  ]
})
export class UploadModule { }
