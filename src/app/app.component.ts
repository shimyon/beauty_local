import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';
import { appGlob } from '../environments/app_glob';
import { AppSharedService } from './_services/app-shared.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  user: any = {};
  public isShowNav: boolean = false;
  public selectedIndex = 0;
  public appPages = [
    // {
    //   title: 'Inbox',
    //   url: '/folder/Inbox',
    //   icon: 'mail'
    // },
    {
      title: 'Appointment',
      url: '/appointment/list',
      icon: 'list'
    },
    {
      title: 'Appointment',
      url: '/appointment',
      icon: 'calendar'
    },
    {
      title: 'Book Appointment',
      url: '/appointment/new',
      icon: 'add-circle'
    },
    {
      title: 'Accessories',
      url: '/accessories',
      icon: 'add-circle'
    }
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    private appsharesrv: AppSharedService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.getUserDetails();
      this.appsharesrv.dataChange.subscribe((data) => {
        if (data.type == "login") {
          this.getUserDetails();
        }
      });
    });
  }

  getUserDetails() {
    this.user = appGlob.User.UserDetailsGet();
  }

  ngOnInit() {
    const path = window.location.pathname.split('folder/')[1];
    if (path !== undefined) {
      this.selectedIndex = this.appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
    }
  }

  ionViewDidLeave() {

  }

  logout() {
    appGlob.User.UserDetailsClear();
    this.router.navigate(['/login']);
  }
}
