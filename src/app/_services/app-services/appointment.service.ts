import { Injectable } from '@angular/core';
import { AjaxServiceService } from '../ajax.service.service';
import { appGlob } from '../../../environments/app_glob';
import { HttpParams } from '@angular/common/http';
import { Appointment } from '../../_models/appointment/appointment.model';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  constructor(private ajax: AjaxServiceService) { }

  getList(params: HttpParams) {
    let userdet = appGlob.User.UserDetailsGet();
    if (appGlob.User.isClient()) {
      params = params.append("TenantId", userdet.TenantId);
    }
    if (appGlob.User.isCustomer()) {
      params = params.append("CustomerId", userdet.userid);
    }
    params = params.append("action", "listing");
    return this.ajax.PostData("appointment_action.php", params);
  }

  SaveData(appt: Appointment) {
    let params = new HttpParams();
    let userdet = appGlob.User.UserDetailsGet();
    if (appt.AppointmentId) {
      params = params.append("AppointmentId", appt.AppointmentId.toString());
    }
    if (appt.TenantId) {
      params = params.append("TenantId", appt.TenantId.toString());
    }
    if (appGlob.User.isCustomer()) {
      params = params.append("CustomerId", userdet.userid);
    }
    if (appt.StatusId) {
      params = params.append("StatusId", appt.StatusId.toString());
    }
    if (appt.ApptDate) {
      debugger
      params = params.append("ApptDate",
        moment(appt.ApptDate).format("YYYY-MM-DD HH:mm:ss")
      );
      //params = params.append("ApptDate", appt.ApptDate.toISOString());
    }
    if (appt.Subject) {
      params = params.append("Subject", appt.Subject);
    }
    if (appt.Message) {
      params = params.append("Message", appt.Message);
    }
    if (appt.Services) {
      params = params.append("Services", appt.Services);
    }
    params = params.append("action", "update");
    return this.ajax.PostData("appointment_action.php", params);
  }
}

