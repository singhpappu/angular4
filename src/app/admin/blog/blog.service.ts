import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { environment } from '../../../environments/environment';
import { AuthService } from '../../guard/auth.service';
import { Subject } from 'rxjs/Rx';
export class Blogs{};
@Injectable()
export class BlogService {

  public blogSubject = new Subject<any>();

  constructor(
    private http: Http,
    private authService: AuthService
  ) { }

  private url = `${environment.apiUrl}`;
  private headers = this.authService.setAuthorizationHeader();


  getAllBlog():Promise <Blogs[]> {
    return this.http.get(`${this.url}blog/all`, this.headers)
      .toPromise()
      .then(response => response.json() as Blogs[])
      .catch();
  }

  postNewBlog(value):Promise <Blogs[]> {
    return this.http.post(`${this.url}blog/post`, value, this.headers)
      .toPromise()
      .then(response => response.json() as Blogs[])
      .catch();
  }

  updatePostBlog(value):Promise <Blogs[]> {
    return this.http.put(`${this.url}blog/update`, value, this.headers)
      .toPromise()
      .then(response => response.json() as Blogs[])
      .catch();
  }

  getPostById(id):Promise <Blogs[]> {
    return this.http.get(`${this.url}blog/${id}`, this.headers)
      .toPromise()
      .then(response => response.json() as Blogs[])
      .catch();
  }

  next(value) {
    this.blogSubject.next(value);
  }

  // Map service ids 
  
  mapServiceIds(value) {
    value.category.splice(value.category.indexOf(null),1);
    let unique = value.category.filter((elem, index, self) => {
      return index == self.indexOf(elem);
    })
    value.category = unique;
  }

  checkCategory(blog,categories) {
    let category: any = []
    blog.category.forEach(element => {
        category.push(element.service_id);
    });

    return categories = categories.filter(function (item) {
      if(category.indexOf(item.id) >= 0) {
          item.checked = true;
      }
      return item;
    });
  }
  

}
