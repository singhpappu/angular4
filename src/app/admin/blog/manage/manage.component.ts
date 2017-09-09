import { BlogService } from '../blog.service';
import { Component, OnInit } from '@angular/core';
import { Category, category, Blog } from './blog';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SpinnerService } from '../../../loader/spinner/spinner.service';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class BlogManageComponent implements OnInit {

  categories:Category[];
  public ckeditorContent;
  public blog = new Blog;
  public isDisplay: boolean = true;
  
  postForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private blogService: BlogService,
    private route: ActivatedRoute,
    private spinner: SpinnerService,
    private sanitize: DomSanitizer,
    private router: Router
  ) { 
    this.createPostForm();
    this.spinner.show();
  }

  ngOnInit() {
    this.getCategory().then(response=>{
      this.categories = response;
    });
    let id = this.route.snapshot.params['id'];
    console.log(id);
    if(id) {
      this.isDisplay = false;
      this.getPostById(id);
      this.ckeditorContent = "";
    } else {
      this.spinner.hide();
    }
  }

  public title: AbstractControl;
  public description: AbstractControl;
  public slug: AbstractControl;
  public status: AbstractControl;
  public category: AbstractControl;
  public id: AbstractControl;

  createPostForm() {
      this.postForm = this.fb.group({
      'title': ['', Validators.compose([
                      Validators.required, 
                      Validators.minLength(4),
                      Validators.pattern("[a-zA-Z0-9,.'`][a-zA-Z0-9,.'` ]+")
                    ])],
      'description': ['', Validators.compose([Validators.required])],
      'slug': ['', Validators.compose([
                    Validators.required, 
                    Validators.minLength(4),
                    Validators.pattern("[a-zA-Z0-9\-,.'`][a-zA-Z0-9\-,.'` ]+")
                  ])],
      'status': [false],
      'id': '',
      'category':new FormArray([new FormControl()])
    });
    this.title = this.postForm.controls['title'];
    this.description = this.postForm.controls['description'];
    this.slug = this.postForm.controls['slug'];
    this.status = this.postForm.contains['status'];
    this.id = this.postForm.contains['id'];   
    this.category = this.postForm.contains['category'];
  }

  getCategory():Promise<Category[]> {
    return Promise.resolve(category)
  }

  addCategory(categoryId) {
    this.postForm.value.category.splice(0,0,categoryId);
  }

  submitPost(value) {
    this.spinner.show();
    if(value.id) {
      this.updatePost(value);
    } else {
       this.storePost(value);
    }
  }

  storePost(value) {
    this.blogService.mapServiceIds(value);
    this.blogService.postNewBlog(value).then((response:any) => {
      if(response.isSuccessfull) {
        this.blog = response.payload;
        this.isDisplay = false;
        this.spinner.hide();
      }
    });
  
  }

  updatePost(value) {
    this.blogService.mapServiceIds(value);
    this.blogService.updatePostBlog(value).then((response:any) => {
      if(response.isSuccessfull) {
        this.blog = response.payload;
        this.isDisplay = false;
        this.spinner.hide();
      }
    });
  }


  editPost(value) {
    this.isDisplay = true;
    this.postForm.patchValue(value);
  }

  getPostById(id) {
    this.blogService.getPostById(id).then((response:any)=>{
      
      this.ckeditorContent = response.payload.description; 
      this.blog = response.payload;
        
      this.blogService.next(response.payload);
      this.postForm.patchValue(response.payload);
      this.categories = this.blogService.checkCategory(this.blog,this.categories);
            
      this.spinner.hide();
      
    }).catch(error => {
      console.log(error);
      this.router.navigate(['/admin/blogs/post']); 
      this.spinner.hide();
    });
  }

  generateSlug(title) {
    this.postForm.patchValue({
      slug: title.value.toLowerCase().split(" ").join("-")
    });
  }

  photoURL(url) {
    return this.sanitize.bypassSecurityTrustResourceUrl(url);
  }

  typeof(t) {
    return typeof t
  }
}
