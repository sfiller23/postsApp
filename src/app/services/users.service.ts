import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../interfaces/user.interface';
import { BehaviorSubject, Observable, of, pipe } from 'rxjs';
import { first, tap } from 'rxjs/operators';
import { Post } from '../interfaces/post.interface';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private usersSubject = new BehaviorSubject<User[]>([]);
  users$: Observable<User[]> = this.usersSubject.asObservable();

  constructor(private http: HttpClient) {

   }

  setAllUsers(): void{
    this.http.get<User[]>(`${environment.API_END_POINT}/users`).subscribe(users=>{
      this.usersSubject.next(users);
    });
  }

  setNumberOfPosts(users: User[]): void{
    const usersLength = users.length;
    let numberOfRequests = 0;
    const usersArr: User[] = [];
    users.forEach(user=>{
      const currentUser: User = {...user};
      this.http.get<Post[]>(`${environment.API_END_POINT}/posts/?userId=${user.id}`)
        .pipe(
          first(),
          tap(posts=>{
          currentUser.numberOfposts = posts.length;
          usersArr.push(currentUser);
        }),
        ).subscribe(()=>{
          numberOfRequests++;
          if(numberOfRequests===usersLength){
            this.usersSubject.next(usersArr);
          }
        }
      );
    })
  }



  getUser(id: number): Observable<User>{
      const user: User | undefined = this.usersSubject.value.find(user=>user.id===id);
      if(user){
        return of(user);
      }else{
        return this.http.get<User>(`${environment.API_END_POINT}/users/${id}`);
      }
  }

  updateNumberOfPosts(numberOfPosts: number, userId: number) :void{
    const currentUsers: User[] = this.usersSubject.value;
    const userToUpdate: User | undefined = currentUsers.find(user=>user.id===userId);
    if(userToUpdate){
      userToUpdate.numberOfposts = numberOfPosts;
      const indexOfUpdatedUser: number = currentUsers.indexOf(userToUpdate);
      currentUsers[indexOfUpdatedUser] = userToUpdate;
      this.usersSubject.next(currentUsers);
    }

  }
}
