import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService, TosteService } from '../_services';
import { NgForm } from '@angular/forms';
import { appGlob } from '../../environments/app_glob';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  AppForClient:boolean = false;
  model: any = {};
  loading = false;
  returnUrl: string;
  formvalue = {
    environment: localStorage.getItem('tenantid') || '',
    username: localStorage.getItem('currentUser') || '',
    password: ''
  }
  @ViewChild('form', { static: true }) public userFrm: NgForm;

  constructor(
    public Toste: TosteService,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService) { }

  ngOnInit() {
    // reset login status
    // appGlob.User.UserDetailsClear();
    this.AppForClient = environment.AppFor == "Client";
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    if (localStorage.getItem('currentUser')) {
      this.formvalue.username = localStorage.getItem('currentUser');
    }
    if (localStorage.getItem('isLogin')) {
      this.loginsuccess();
    }
    // if (localStorage.getItem('apiurl')) {
    //   this.formvalue.environment = localStorage.getItem('apiurl');
    // }
  }

  register(form: NgForm) {
    // environment.apiurl = form.value.environment;
    localStorage.setItem('tenantid', form.value.environment);
    localStorage.setItem('currentUser', form.value.username);
    // localStorage.setItem('isLogin', "Y");
    // this.router.navigateByUrl("waybills");
    // return;
    // debugger
    this.loading = true;


    this.authenticationService.login(form.value.environment, form.value.username, form.value.password)
      .subscribe(
        data => {
          this.loading = false;
          if (!data.isOk) {
            this.Toste.ShowAutoHide(data.msg);
          } else {
           this.loginsuccess();
          }
        },
        err => {
          this.Toste.ShowAutoHide(err.error.error_description);
          // login failed so display error
          // this.alertService.error(error);
          this.loading = false;
        });
  }

  loginsuccess() {
    this.router.navigateByUrl("appointment");
  }
}
