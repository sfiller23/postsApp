import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { UsersService } from '../services/users.service';
import { UserDetailsService } from '../services/user-details.service';
import { PageService } from '../services/page.service';

@Injectable({
  providedIn: 'root'
})
export class UserResolver implements Resolve<boolean> {

  constructor(private usersService: UsersService, private userDetailsService: UserDetailsService, private pageService: PageService){

  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    const url = state.url;
    this.pageService.setPage(url);
    const userId = route.paramMap.get("id");
    if(userId){
      this.usersService.getUser(+userId).subscribe(user=>{
        this.userDetailsService.setUser(user);
      })
      return of(true);
    }else{
      return of(false);
    }

  }
}
