import { Injectable } from '@angular/core';
import { customer } from '../../_models/cutomer/customer.model';
import { HttpParams } from '@angular/common/http';
import { AjaxServiceService } from '..';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private ajax: AjaxServiceService) { }

  SaveData(appt: customer) {
    let params = new HttpParams();
    params = params.append("loginname", appt.loginname);  
    params = params.append("Firstname", appt.Firstname);  
    params = params.append("Surname", appt.Surname);  
    params = params.append("Lastname", appt.Lastname);  
    params = params.append("email", appt.email);  
    params = params.append("phone", appt.phone);  
    params = params.append("password", appt.password);  
    params = params.append("action", "update");
    return this.ajax.PostData("customer_action.php", params);
  }
}
