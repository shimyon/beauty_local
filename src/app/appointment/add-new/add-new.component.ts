import { Component, ViewChild, OnInit, Inject, LOCALE_ID } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { LookupService } from '../../_services/app-services/lookup.service';
import { lookup } from '../../_models/lookup/lookup.model';
import { appGlob } from '../../../environments/app_glob';
import { TenantService } from '../../_services/app-services/tenant.service';
import { tenant } from '../../_models/tenant/tenant.model';


@Component({
  selector: 'app-add-new',
  templateUrl: './add-new.component.html',
  styleUrls: ['./add-new.component.scss'],
})
export class AddNewComponent implements OnInit {
  status: any[] = [];
  statusSel: number;


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
    private tenantsrv: TenantService,
    private lookupsrv: LookupService,
    private router: Router,
    private alertCtrl: AlertController, @Inject(LOCALE_ID) private locale: string) {

  }

  async ngOnInit() {
    this.resetEvent();
    await this.getTenants();
    await this.getStatus();
    await this.getServices();
    let userdet = appGlob.User.UserDetailsGet();
    this.event.title = userdet.firstname + ' ' + userdet.surname + ' - Appt';
  }

  async getStatus() {
    let lkup: lookup = new lookup();
    lkup.GroupName = 'AppStatus';
    return await this.lookupsrv.getList(lkup).subscribe(s => {
      this.status = <[]>s;
    });
  }


  async getTenants() {
    let dt: tenant = new tenant();
    dt.BusinessType = 'Salon';
    return await this.tenantsrv.getList(dt).subscribe(s => {
      this.tenants = <[]>s;
    });
  }

  async getServices() {
    let lkup: lookup = new lookup();
    lkup.BusinessType = 'Salon';
    lkup.GroupName = 'parlour_service';
    return await this.lookupsrv.getList(lkup).subscribe(s => {
      this.services = <[]>s;
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
    this.router.navigateByUrl('/appointment');
  }
}
