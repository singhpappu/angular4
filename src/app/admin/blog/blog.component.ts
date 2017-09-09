import { Component, OnInit } from '@angular/core';
import { BlogService } from './blog.service';
import { SpinnerService } from '../../loader/spinner/spinner.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {

  

  constructor(
    private blogService: BlogService,
    private spinner: SpinnerService
  ) { }

  ngOnInit() {
      this.getAllBlog();
      this.spinner.show();
  }
  public blogs:any;
  getAllBlog() {
    this.blogService.getAllBlog().then((response:any) => {
        this.blogs = response;
        this.spinner.hide();
        console.log("GET All Blog::",response);
    })
  }


}
