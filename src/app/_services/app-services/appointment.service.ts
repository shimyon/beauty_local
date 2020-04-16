import { Injectable } from '@angular/core';
import { AjaxServiceService } from '../ajax.service.service';
import { appGlob } from '../../../environments/app_glob';
import { HttpParams } from '@angular/common/http';

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
}
