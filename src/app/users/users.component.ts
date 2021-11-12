import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { distinct, distinctUntilChanged, first, last, take } from 'rxjs/operators';
import { User } from '../interfaces/user.interface';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],

})
export class UsersComponent implements OnInit {

  constructor(public usersService: UsersService) { }

  ngOnInit(): void {
    this.usersService.setAllUsers();

    this.usersService.users$.pipe(distinct(),take(2)).subscribe(users=>{
      if(users.length>0){
        this.usersService.setNumberOfPosts(users);
      }

    })
  }


}
