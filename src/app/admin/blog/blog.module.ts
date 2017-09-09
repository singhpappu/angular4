import { BlogService } from './blog.service';
import { BlogComponent } from './blog.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BlogManageComponent } from './manage/manage.component';
import { CKEditorModule } from 'ng2-ckeditor';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { UploadComponent } from '../file/upload/upload.component';
import { UploadModule } from '../file/upload/upload.module';
import { UploadService } from '../file/upload/upload.service';
import { NgUploaderModule } from 'ngx-uploader';
@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    CKEditorModule,
    NgUploaderModule
  ],
  declarations: [BlogComponent, BlogManageComponent,UploadComponent],
  providers: [BlogService,UploadService]
})
export class BlogModule { }
