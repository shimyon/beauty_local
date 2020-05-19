import { Component, ViewChild, OnInit, Inject, LOCALE_ID } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { LookupService } from '../../_services/app-services/lookup.service';
import { lookup } from '../../_models/lookup/lookup.model';
import { appGlob } from '../../../environments/app_glob';
import { TenantService } from '../../_services/app-services/tenant.service';
import { tenant } from '../../_models/tenant/tenant.model';
import { AppointmentService } from '../../_services/app-services/appointment.service';
import { TosteService } from '../../_services';
import { Appointment } from '../../_models/appointment/appointment.model';
import { HttpParams } from '@angular/common/http';


@Component({
  selector: 'app-add-new',
  templateUrl: './add-new.component.html',
  styleUrls: ['./add-new.component.scss'],
})
export class AddNewComponent implements OnInit {
  userdet = appGlob.User.UserDetailsGet();
  status: any[] = [];
  statusSel: number;
  AppointmentId: any;
  isCustomer:boolean = appGlob.User.isCustomer();

  tenants: any[] = [];
  tenantSel: number;

  services: any[] = [];
  servicesSel: number[] = [];
  event = {
    title: '',
    desc: '',
    startTime: ''
  };

  minDate = new Date().toISOString();

  eventSource = [];
  viewTitle;

  calendar = {
    mode: 'month',
    currentDate: new Date(),
  };

  constructor(
    public Toste: TosteService,
    private tenantsrv: TenantService,
    private lookupsrv: LookupService,
    private apptsrv: AppointmentService,
    private route: ActivatedRoute,
    private router: Router,
    private alertCtrl: AlertController, @Inject(LOCALE_ID) private locale: string) {

  }

  async ngOnInit() {
    this.resetEvent();
    await this.getTenants();
    await this.getStatus();
    await this.getServices();
    if (this.status.length) {
      let selstatus = this.status.filter(s => s.Class == "New Appointment");
      if (selstatus.length) {
        this.statusSel = selstatus[0].LookUpId;
      }
    }

    this.event.title = this.userdet.firstname + ' ' + this.userdet.surname + ' - Appt';
    this.route.params.subscribe(params => {
      if (params['AppointmentId']) {
        this.AppointmentId = params['AppointmentId'] || 0;
        this.getData();
      }
    })
  }

  async getData() {
    let params = new HttpParams();
    params = params.append("isSingleRecord", "Y");
    params = params.append("AppointmentId", this.AppointmentId);
    return new Promise((success, rejected) => {
      this.apptsrv.getList(params).subscribe(s => {
        let data = <Appointment>s;
        this.event.startTime = data.ApptDate.toString();
        this.statusSel = data.StatusId;
        this.tenantSel = data.TenantId;
        this.event.title = data.Subject;
        this.event.desc = data.Message;
        this.servicesSel = data.ApptServiceIds.split(',');
        success(this.status);
      }, err => {
        rejected(err);
      });
    });
  }

  async getStatus() {
    let lkup: lookup = new lookup();
    lkup.GroupName = 'AppStatus';
    return new Promise((success, rejected) => {
      this.lookupsrv.getList(lkup).subscribe(s => {
        this.status = <[]>s;
        success(this.status);
      }, err => {
        rejected(err);
      });
    });
  }


  async getTenants() {
    let dt: tenant = new tenant();
    dt.BusinessType = 'Salon';
    return new Promise((success, rejected) => {
      this.tenantsrv.getList(dt).subscribe(s => {
        this.tenants = <[]>s;
        success(this.tenants);
      }, err => {
        rejected(err);
      });
    });
  }

  async getServices() {
    let lkup: lookup = new lookup();
    lkup.BusinessType = 'Salon';
    lkup.GroupName = 'parlour_service';
    return new Promise((success, rejected) => {
      this.lookupsrv.getList(lkup).subscribe(s => {
        this.services = <[]>s;
        success(this.services);
      }, err => {
        rejected(err);
      });
    });
  }

  compareWithTenant = (o1, o2) => {
    return o1 && o2 ? o1.TenantId === o2.TenantId : o1 === o2;
  };

  compareWithFn = (o1, o2) => {
    return o1 && o2 ? o1.LookUpId === o2.LookUpId : o1 === o2;
  };

  showservice() {
    return this.services.filter(f => this.servicesSel.indexOf(f.LookUpId) != -1).map(m => m.Value);
  }

  resetEvent() {
    this.event = {
      title: '',
      desc: '',
      startTime: new Date().toISOString()
    };
  }

  EnableSubmit() {
    if (this.event.title != '' && this.statusSel && this.servicesSel.length > 0 && this.tenantSel) {
      return false;
    }
    return true;
  }

  Submit() {
    debugger
    let appt: Appointment = new Appointment();
    appt.AppointmentId = this.AppointmentId;
    appt.Message = this.event.desc;
    appt.Subject = this.event.title;
    appt.ApptDate = new Date(this.event.startTime);
    
    appt.StatusId = this.statusSel;
    appt.TenantId = this.tenantSel;
    if (appGlob.User.isCustomer()) {
      appt.CustomerId = parseInt(this.userdet.userid);
    }
    appt.Services = this.servicesSel.join(',');

    this.apptsrv.SaveData(appt)
      .subscribe(
        dt => {
          let data = <any>dt;
          if (!data.IsOk) {
            this.Toste.ShowAutoHide(data.Error);
          } else {
            this.GoAppt();
          }
        },
        err => {
          this.Toste.Show(err.error.error_description);
        });
  }

  // Create the right event format and reload source
  addEvent() {
    let eventCopy = {
      title: this.event.title,
      startTime: new Date(this.event.startTime),
      desc: this.event.desc
    }

    this.eventSource.push(eventCopy);
    this.resetEvent();
  }

  GoAppt() {
    this.router.navigateByUrl('/appointment/list');
  }
}
