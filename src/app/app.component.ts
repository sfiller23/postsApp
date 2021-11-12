import { Component, OnInit } from '@angular/core';
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
