import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TosteService, AuthenticationService, AppSharedService } from '../../_services';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { ContactService } from '../../_services/app-services/contact.service';
import { customer } from '../../_models/cutomer/customer.model';
import { from } from 'rxjs';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  AppForClient: boolean = false;
  returnUrl: string;
  @ViewChild('form', { static: true }) public userFrm: NgForm;
  formvalue = {
    environment: '',
    username: '',
    password: '',
    email: '',
    phone: '',
    connfirmpassword: ''
  }
  constructor(
    public Toste: TosteService,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private appsharesrv: AppSharedService,
    private contactsrv: ContactService
  ) { }

  ngOnInit() {
    this.AppForClient = environment.AppFor == "Client";

  }

  register(form: NgForm) {
    let params = new customer;
    params.loginname = form.value.username;
    params.Surname = form.value.Surname;
    params.Firstname = form.value.Firstname;
    params.Lastname = form.value.Lastname;
    params.email = form.value.email;
    params.phone = form.value.phone;
    params.password = form.value.password;
    this.contactsrv.SaveData(params).subscribe(s => {
      let data: any = s;
      if (!data.IsOk) {
        this.Toste.ShowAutoHide(data.Error);
      } else {
        this.Toste.Show(`user created successfully. <br>userid: ${params.loginname}`).then(s => {
          localStorage.setItem('currentUser', params.loginname);
          this.gotologin();
        });
      }
    },
      err => {
        this.Toste.Show(err.error.error_description);
      });
  }

  gotologin() {
    this.router.navigateByUrl("login");
  }

  signup() {
    this.router.navigateByUrl("login/signup");
  }

}

