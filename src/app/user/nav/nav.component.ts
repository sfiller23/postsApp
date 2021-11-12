import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { User } from '../../interfaces/user.interface';
import { UserDetailsService } from '../../services/user-details.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],

})
export class NavComponent implements OnInit, OnDestroy {

  user: User = {} as User;

  userDetailsSubscription: Subscription = new Subscription();

  constructor(private userDetailsService: UserDetailsService) { }

  ngOnInit(): void {
    this.userDetailsService.userDetails$.subscribe(user=>{
      this.user = user;
    })
  }

  ngOnDestroy(){
    this.userDetailsSubscription.unsubscribe();
  }

}
