import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { PostsService } from '../../services/posts.service';
import { UserDetailsService } from '../../services/user-details.service';
import { User } from '../../interfaces/user.interface';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit, OnDestroy {

  private searchTerms = new Subject<string>();

  currentUser: User = {} as User;

  searchSubscription: Subscription = new Subscription();
  userDetailsSubscription: Subscription = new Subscription();

  constructor(private postsService: PostsService, private userDetailsService: UserDetailsService) { }

  search(term: string): void {
      this.searchTerms.next(term.trim());

  }

  onOut(value: string){
    if(!value){
      if(this.currentUser){
        this.postsService.setPostsByUserId(this.currentUser.id);
      }
    }
  }

  ngOnInit(): void {
    this.userDetailsSubscription = this.userDetailsService.userDetails$.subscribe(user=>{
      this.currentUser = user;
    })

    this.searchSubscription = this.searchTerms.pipe(

      debounceTime(300),

      distinctUntilChanged(),

      switchMap((term: string) => this.postsService.searchPosts(term, this.currentUser.id)),
    ).subscribe(posts=>{
      this.postsService.setPosts(posts);
    });
  }

  ngOnDestroy(): void{
    this.searchSubscription.unsubscribe();
    this.userDetailsSubscription.unsubscribe();
  }

}


