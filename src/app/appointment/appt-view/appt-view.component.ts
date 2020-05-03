import { Component, OnInit, Input } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { AppointmentService } from '../../_services/app-services/appointment.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { ModalController,NavParams } from '@ionic/angular';

@Component({
  selector: 'app-appt-view',
  templateUrl: './appt-view.component.html',
  styleUrls: ['./appt-view.component.scss'],
  // providers: [NavParams]
})
export class ApptViewComponent implements OnInit {
  isModal: boolean = false;
  AppointmentId: any;
  @Input() pAppointmentId: number;
  data = {};

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apptsrv: AppointmentService,
    public navCtrl: NavController,
    public modalController: ModalController
    // public navParams: NavParams
    ) {   
  }

  ngOnInit() {
    if (this.pAppointmentId) {
      this.AppointmentId = this.pAppointmentId;
      this.isModal = true;
      this.getData();
    }
    if (!this.isModal) {
      this.route.params.subscribe(params => {
        this.AppointmentId = params['AppointmentId'] || 0;
        this.getData();
      })
    }
  }

  getData() {
    let params = new HttpParams();
    params = params.append("isSingleRecord", "Y");
    params = params.append("AppointmentId", this.AppointmentId);
    this.apptsrv.getList(params).subscribe(s => {
      this.data = s;
    });
  }

  closeModal() {
    if (this.isModal) {
      this.modalController.dismiss();  
    }else {
      this.navCtrl.pop();
    }
  }

}
