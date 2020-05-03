import { Injectable } from '@angular/core';
import { Observer } from 'rxjs/internal/types';
import { Observable } from 'rxjs/internal/Observable';
@Injectable({
  providedIn: 'root'
})
export class AppSharedService {

  data: any;
  dataChange: Observable<any>;
  dataChangeObserver: Observer<any>;

  constructor() {
    this.dataChange = new Observable((observer: Observer<any>) => {
      this.dataChangeObserver = observer;
    });
  }

  setData(data: any) {
    this.data = data;
    this.dataChangeObserver.next(this.data);
  }
}
