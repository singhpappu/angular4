import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { UserComponent } from './user/user.component';
import { ClientComponent } from './client/client.component';
import { BlogComponent } from './blog/blog.component';
import { BlogManageComponent } from './blog/manage/manage.component';
import { LeadComponent } from './lead/lead.component';
const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Admin '
    },
    children: [
      {
        path: 'users',
        component: UserComponent,
        data: {
          title: 'User Listing'
        }
      },
      {
        path: 'client',
        component: ClientComponent,
        data: {
          title: 'Manage Client'
        }
      },
      {
        path: 'blogs/all',
        component: BlogComponent,
        data: {
          title: 'All Blogs'
        }
      },
      {
        path: 'blogs/post',
        component: BlogManageComponent,
        data: {
          title: 'Post New Blog'
        }
      },
      {
        path: 'blogs/post/:id',
        component: BlogManageComponent,
        data: {
          title: 'Post New Blog'
        }
      },
      {
        path: 'leads',
        component: LeadComponent,
        data: {
          title: 'All Leads'
        }
      }     
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
