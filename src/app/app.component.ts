import { AfterContentInit, AfterViewChecked, ChangeDetectionStrategy, ChangeDetectorRef, Component, DoCheck, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { PostsService } from './services/posts.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PageService } from './services/page.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'postsApp';

  userSet: boolean = false;

  constructor(private pageService: PageService) {

  }




  ngOnInit(): void{
    this.pageService.page$.subscribe(page=>{
      if(page.length>0){
        this.userSet = true;
      }
    })

  }


}
