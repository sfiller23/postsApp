import { Component, OnInit } from '@angular/core';
import { User } from '../interfaces/user.interface';
import { UserDetailsService } from '../services/user-details.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss'],
})
export class UserDetailsComponent implements OnInit {

  user: User = {} as User;

  constructor(private userDetailsService: UserDetailsService) { }

  ngOnInit(): void {
    this.userDetailsService.userDetails$.subscribe(user=>{
      this.user = user;
    })

  }

}
