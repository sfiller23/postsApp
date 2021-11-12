import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { UsersService } from './users.service';
import { environment } from 'src/environments/environment';
import { USERS, USERS as USERS2  } from '../../../server/db-data';
import { tap } from 'rxjs/operators';


describe('UsersService', () => {

    let service: UsersService;
    let httpClient: HttpClient;
    let httpTestingController: HttpTestingController;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [
          HttpClientTestingModule
        ]
      });

      service = TestBed.inject(UsersService);
      httpClient = TestBed.inject(HttpClient);
      httpTestingController = TestBed.inject(HttpTestingController);
    });

    it('should retrieve all users', () => {
      const usersUrl: string = `${environment.API_END_POINT}/users`;
      httpClient.get<any>(usersUrl).pipe(tap(()=>{
          service.setAllUsers();
        }
        )).subscribe(testUsers=>{
          service.users$.subscribe(serviceUsers=>{

            if(serviceUsers.length>0){
              expect(testUsers).toEqual(serviceUsers);
            }

          })
          const usersReq = httpTestingController.expectOne(usersUrl);
          expect(usersReq.request.method).toEqual("GET");

          usersReq.flush(USERS2);
      });

        const testRequest = httpTestingController.expectOne(usersUrl);

        expect(testRequest.request.method).toEqual("GET");
        testRequest.flush(USERS);


    });

    afterEach(() => {
      httpTestingController.verify();
    });

});


