import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, Subscription } from 'rxjs';
import { Post } from '../interfaces/post.interface';
import { PostsService } from '../services/posts.service';
import { UserDetailsService } from '../services/user-details.service';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent implements OnInit, OnDestroy {

  userId: number = -1;

  userDetailsSubscription: Subscription = new Subscription();

  constructor(private modalService: NgbModal ,public postsService: PostsService, private userDetailsService: UserDetailsService) { }

  ngOnInit(): void {

    this.userDetailsService.userDetails$.subscribe(user=>{
      this.userId = user.id;
      this.postsService.setPostsByUserId(this.userId);
    })

  }

  onDelete(id: number){
    const modalRef = this.modalService.open(DeleteDialogComponent);
    modalRef.componentInstance.postId = id;
    modalRef.componentInstance.postsLength = this.postsService.getLength()-1;
    modalRef.componentInstance.userId = this.userId;
  }

  ngOnDestroy(): void{
    this.userDetailsSubscription.unsubscribe();
  }


}
