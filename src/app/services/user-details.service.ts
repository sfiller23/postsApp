import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserDetailsService {

  private userDetailsSubject = new BehaviorSubject<User>({} as User);
  userDetails$: Observable<User> = this.userDetailsSubject.asObservable();

  constructor() { }

  setUser(user: User){
    this.userDetailsSubject.next(user);
  }
}
