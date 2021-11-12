import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PageService {

  private pageSubject = new BehaviorSubject<string>('');
  page$: Observable<string> = this.pageSubject.asObservable();

  constructor() { }

  setPage(pageNAme: string){
    this.pageSubject.next(pageNAme);
  }
}
