import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostsComponent } from './posts.component';
import { PostsRoutingModule } from './posts-routing.module';
import { SearchComponent } from './search/search.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import { PostsService } from '../services/posts.service';



@NgModule({
  declarations: [
    PostsComponent,
    SearchComponent,
    DeleteDialogComponent,

  ],
  imports: [
    CommonModule,
    PostsRoutingModule,
    NgbModule,
  ],
  providers:[
    PostsService
  ]
})
export class PostsModule { }
