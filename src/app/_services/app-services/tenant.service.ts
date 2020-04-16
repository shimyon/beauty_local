import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { tenant } from '../../_models/tenant/tenant.model';
import { AjaxServiceService } from '..';

@Injectable({
  providedIn: 'root'
})
export class TenantService {

  constructor(private ajax: AjaxServiceService) { }

  getList(model: tenant) {
    let params: HttpParams = new HttpParams();
    params = params.append("action", "listing");
    if (model.TenantId) {
      params = params.append("TenantId", model.TenantId.toString());
    }
    if (model.BusinessType) {
      params = params.append("BusinessType", model.BusinessType);
    }
    if (model.Name) {
      params = params.append("Name", model.Name);
    }
    if (model.FullName) {
      params = params.append("FullName", model.FullName);
    }
    return this.ajax.PostData("tenant_action.php", params);
  }
}
