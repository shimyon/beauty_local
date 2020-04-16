import { Injectable } from '@angular/core';
import { AjaxServiceService } from '..';
import { HttpParams } from '@angular/common/http';
import { lookup } from '../../_models/lookup/lookup.model';

@Injectable({
  providedIn: 'root'
})
export class LookupService {

  constructor(private ajax: AjaxServiceService) { }

  getList(lookup: lookup) {
    let params: HttpParams = new HttpParams();
    params = params.append("action", "listing");
    if (lookup.BusinessType) {
      params = params.append("BusinessType", lookup.BusinessType);      
    }
    if (lookup.Class) {
      params = params.append("Class", lookup.Class);      
    }
    if (lookup.GroupName) {
      params = params.append("GroupName", lookup.GroupName);      
    }
    if (lookup.Value) {
      params = params.append("Value", lookup.Value);
    }    
    return this.ajax.PostData("lookup_action.php", params);
  }
}
