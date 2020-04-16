import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';
import { AppointmentService } from '../../_services/app-services/appointment.service';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-appt-list',
  templateUrl: './appt-list.component.html',
  styleUrls: ['./appt-list.component.scss'],
})
export class ApptListComponent implements OnInit {
  @ViewChild(IonInfiniteScroll, { static: true }) infiniteScroll: IonInfiniteScroll;

  data = [];

  constructor(private apptsrv: AppointmentService) { }

  ngOnInit() {
    this.AddData();
  }

  AddData() {
    // for (let index = 0; index < 50; index++) {
    //   this.data.push(index);
    // }
    let params = new HttpParams();
    this.apptsrv.getList(params).subscribe(s => {
      this.data = this.data.concat(s);
      console.log(this.data);
    });
  }

  loadData(event) {
    setTimeout(() => {
      console.log('Done');
      event.target.complete();

      // App logic to determine if all data is loaded
      // and disable the infinite scroll
      if (this.data.length == 1000) {
        event.target.disabled = true;
      } else {
        this.AddData();
      }
    }, 500);
  }

  toggleInfiniteScroll() {
    this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
  }
}
