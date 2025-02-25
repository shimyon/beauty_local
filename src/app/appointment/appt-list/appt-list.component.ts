import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll, ActionSheetController, ModalController } from '@ionic/angular';
import { AppointmentService } from '../../_services/app-services/appointment.service';
import { HttpParams } from '@angular/common/http';
import { appGlob } from '../../../environments/app_glob';
import { ActivatedRoute, Router } from '@angular/router';
import { ApptViewComponent } from '../appt-view/appt-view.component';
import { lookup } from '../../_models/lookup/lookup.model';
import { LookupService } from '../../_services/app-services/lookup.service';

@Component({
  selector: 'app-appt-list',
  templateUrl: './appt-list.component.html',
  styleUrls: ['./appt-list.component.scss'],
})
export class ApptListComponent implements OnInit {
  @ViewChild(IonInfiniteScroll, { static: true }) infiniteScroll: IonInfiniteScroll;
  isCustomer: boolean = false;
  isClient: boolean = false;
  data = [];
  status: any[] = [];
  selectedStatus = 0;
  totaldata = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apptsrv: AppointmentService,
    public actionSheetController: ActionSheetController,
    private lookupsrv: LookupService,
    public modalController: ModalController) { }

  ngOnInit() {

  }

  async ionViewWillEnter() {
    console.log('ionViewWillEnter');
    this.isClient = appGlob.User.isClient();
    this.isCustomer = appGlob.User.isCustomer();
    await this.getStatus();
    // if (this.status.length) {
    //   this.selectedStatus = this.status[0].LookUpId;
    // }
    this.ResetData();
  }

  ResetData() {
    this.data = [];
    this.AddData();
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

  async presentActionSheet(apptid) {
    let btns = new Array();

    if (this.isCustomer) {
      btns.push({
        text: 'Delete',
        role: 'destructive',
        icon: 'trash',
        handler: () => {
          console.log('Delete clicked');
        }
      });
    }

    btns = btns.concat(
      [{
        text: 'View',
        icon: 'eye',
        handler: () => {
          this.viewAppts(apptid);
        }
      }, {
        text: 'Edit',
        icon: 'pencil',
        handler: () => {
          this.editAppt(apptid);
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    );
    const actionSheet = await this.actionSheetController.create({
      header: 'Action',
      buttons: btns
    });
    await actionSheet.present();
  }

  viewAppts(apptid) {
    this.presentModal(apptid);
    // this.router.navigate(['appointment/view', { AppointmentId: apptid }]);
  }

  editAppt(apptid) {
    this.router.navigate(['appointment/new', { AppointmentId: apptid }]);
  }

  async presentModal(apptid) {
    const modal = await this.modalController.create({
      component: ApptViewComponent,
      componentProps: {
        'pAppointmentId': apptid
      }
    });
    return await modal.present();
  }


  AddData() {
    // for (let index = 0; index < 50; index++) {
    //   this.data.push(index);
    // }
    let params = new HttpParams();
    if (this.selectedStatus && this.selectedStatus.toString() !== "0") {
      params = params.append("StatusId", this.selectedStatus.toString());
    }
    this.apptsrv.getList(params).subscribe(s => {
      var alldata = s[0];
      this.totaldata = s[1][0].Count;
      this.data = this.data.concat(alldata);
    });
  }

  loadData(event) {
    setTimeout(() => {
      console.log('Done');
      event.target.complete();

      // App logic to determine if all data is loaded
      // and disable the infinite scroll
      if (this.data.length == this.totaldata) {
        event.target.disabled = true;
      } else {
        this.AddData();
      }
    }, 500);
  }

  toggleInfiniteScroll() {
    this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
  }

  BookAppt() {
    this.router.navigateByUrl('/appointment/new');
  }

  ionChangeEvent(event: any) {
    //debugger
    this.ResetData();
  }
}
