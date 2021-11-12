import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Post } from '../interfaces/post.interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'platform'
})
export class PostsService {

  private postsSubject = new BehaviorSubject<Post[]>([]);
  posts$: Observable<Post[]> = this.postsSubject.asObservable();


  constructor(private http:HttpClient) {

   }

  setPosts(posts: Post[]): void{
    this.postsSubject.next(posts);
  }

  setPostsByUserId(userId: number):void{
      const usersPosts = this.postsSubject.value.find(post=>post.userId===userId);
      if(!usersPosts){
        console.log('setting posts');
        this.http.get<Post[]>(`${environment.API_END_POINT}/posts/?userId=${userId}`)
          .subscribe(posts=>{
            this.postsSubject.next(posts);
          });
      }

    }

  delete(id: number): void{
    this.http.delete(`${environment.API_END_POINT}/posts/${id}`).subscribe(()=>{
      const currentPosts = this.postsSubject.value;
      const updatedPosts = currentPosts.filter(post=>post.id!==id);
      this.postsSubject.next(updatedPosts);
    });
  }

  searchPosts(term: string, userId: number): Observable<Post[]> {
    if (!term.trim()) {
      return of([]);
    }

    const postsByterm: Post[] = this.postsSubject.value.filter(post=>post.title.includes(term));
    if(postsByterm.length!==0){
      return of(postsByterm);
    }else{
      return this.http.get<Post[]>(`${environment.API_END_POINT}/posts/?userId=${userId}`)
        .pipe(map(posts=>{
          const postsByTerm = posts.filter(post=>post.title.includes(term));
          return postsByTerm;
        }));
    }

  }

  getLength(): number{
    return this.postsSubject.value.length;
  }
}

