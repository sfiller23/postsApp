import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed, waitForAsync } from '@angular/core/testing';

import { PostsService } from './posts.service';
import { PostsModule } from '../posts/posts.module';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { POSTS } from '../../../server/db-data';

describe('PostsService', () => {

  let service: PostsService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(waitForAsync(() => {

    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        PostsModule,
      ]
    }).compileComponents()
    .then(() => {
      service = TestBed.inject(PostsService);
    });

    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  }));

  it('Search test', () => {
    const postUrl: string = `${environment.API_END_POINT}/posts/?userId=1`;
    service.searchPosts('qui est esse',1)
        .subscribe(posts => {
          if(posts.length>0){
            expect(posts).toBeTruthy();
            expect(posts[0].id).toBe(2);
          }

        });

    const req = httpTestingController.expectOne(postUrl);

    expect(req.request.method).toEqual("GET");

    req.flush([POSTS[1]]);

});

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  afterEach(() => {
    httpTestingController.verify();
  });
});
