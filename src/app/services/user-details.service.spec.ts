import { TestBed } from '@angular/core/testing';
import { tap } from 'rxjs/operators';
import { USERS } from 'server/db-data';

import { UserDetailsService } from './user-details.service';

describe('UserDetailsService', () => {
  let service: UserDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
    service.userDetails$.pipe(tap(()=>service.setUser(USERS[0]))).subscribe(user=>{
      if(user){
        expect(user.id).toEqual(1);
      }
    })
  });

});
