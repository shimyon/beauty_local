import { HttpParams } from '@angular/common/http';
import { Component, ViewChild, OnInit, Inject, LOCALE_ID } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { CalendarComponent } from 'ionic2-calendar/calendar';
import { formatDate } from '@angular/common';
import { Router } from '@angular/router';
import { AppointmentService } from '../_services/app-services/appointment.service';
import { isTabSwitch } from '@ionic/angular/directives/navigation/stack-utils';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.page.html',
  styleUrls: ['./appointment.page.scss'],
})
export class AppointmentPage implements OnInit {
  data = [];
  totaldata = 0;

  event = {
    title: '',
    desc: '',
    startTime: '',
    endTime: '',
    allDay: false
  };

  minDate = new Date().toISOString();

  eventSource = [];
  viewTitle;

  calendar = {
    mode: 'month',
    currentDate: new Date(),
  };

  @ViewChild(CalendarComponent, { static: false }) myCal: CalendarComponent;

  constructor(
    private apptsrv: AppointmentService,
    private router: Router,
    private alertCtrl: AlertController, @Inject(LOCALE_ID) private locale: string) { }

  ngOnInit() {
    
  }

  ionViewWillEnter() {
    console.log('ionViewWillEnter');
    this.resetEvent();
    this.data = [];
    this.AddData();
  }

  resetEvent() {
    this.event = {
      title: '',
      desc: '',
      startTime: new Date().toISOString(),
      endTime: new Date().toISOString(),
      allDay: false
    };
  }

  // Create the right event format and reload source
  addEvent() {
    let eventCopy = {
      title: this.event.title,
      startTime: new Date(this.event.startTime),
      endTime: new Date(this.event.endTime),
      allDay: this.event.allDay,
      desc: this.event.desc
    }

    if (eventCopy.allDay) {
      let start = eventCopy.startTime;
      let end = eventCopy.endTime;

      eventCopy.startTime = new Date(Date.UTC(start.getUTCFullYear(), start.getUTCMonth(), start.getUTCDate()));
      eventCopy.endTime = new Date(Date.UTC(end.getUTCFullYear(), end.getUTCMonth(), end.getUTCDate() + 1));
    }

    this.eventSource.push(eventCopy);
    this.myCal.loadEvents();
    this.resetEvent();
  }

  // Change current month/week/day
  next() {
    var swiper = document.querySelector('.swiper-container')['swiper'];
    swiper.slideNext();
  }

  back() {
    var swiper = document.querySelector('.swiper-container')['swiper'];
    swiper.slidePrev();
  }

  BookAppt() {
    this.router.navigateByUrl('/appointment/new');
  }

  // Change between month/week/day
  changeMode(mode) {
    this.calendar.mode = mode;
  }

  // Focus today
  today() {
    this.calendar.currentDate = new Date();
  }

  // Selected date reange and hence title changed
  onViewTitleChanged(title) {
    this.viewTitle = title;
  }

  // Calendar event was clicked
  async onEventSelected(event) {
    // Use Angular date pipe for conversion
    let start = formatDate(event.startTime, 'medium', this.locale);
    let end = formatDate(event.endTime, 'medium', this.locale);

    const alert = await this.alertCtrl.create({
      header: event.title,
      subHeader: event.desc,
      message: 'From: ' + start + '<br><br>To: ' + end,
      buttons: ['OK']
    });
    alert.present();
  }

  // Time slot was clicked
  onTimeSelected(ev) {
    let selected = new Date(ev.selectedTime);
    this.event.startTime = selected.toISOString();
    selected.setHours(selected.getHours() + 1);
    this.event.endTime = (selected.toISOString());
  }


  /* Get Data */

  AddData() {
    // for (let index = 0; index < 50; index++) {
    //   this.data.push(index);
    // }
    let params = new HttpParams();
    this.apptsrv.getList(params).subscribe(s => {
      var alldata = s[0];
      this.totaldata = s[1][0].Count;
      this.data = this.data.concat(alldata);
      for (const key in this.data) {
        var data = this.data[key];
        this.event = {
          title: data.Subject,
          desc: data.TenantName,
          startTime: new Date(data.ApptDateDtFt).toISOString(),
          endTime: new Date(data.ApptDateDtFt).toISOString(),
          allDay: true
        };
        this.addEvent();
      }
    });
  }

}
