import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PostsService } from '../../services/posts.service';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.scss'],

})
export class DeleteDialogComponent implements OnInit {
  @Input() public postId: number = -1;
  @Input() public postsLength: number = -1;
  @Input() public userId: number = -1;

  constructor(public activeModal: NgbActiveModal, private postsService: PostsService, private usersService: UsersService) { }

  ngOnInit(): void {
  }

  close(){
    this.activeModal.close();
  }
  delete(){
    this.postsService.delete(this.postId);
    this.usersService.updateNumberOfPosts(this.postsLength, this.userId);
    this.activeModal.close();
  }

}
