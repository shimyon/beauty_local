import { Injectable } from '@angular/core';
import { Idatatable } from '../_models/idatatable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { IDatatableSearch } from '../_models/idatatable-search';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { LoadingController } from '@ionic/angular';
import { LoadingService } from './loading.service';

@Injectable({
  providedIn: 'root'
})
export class AjaxServiceService {
  constructor(
    private http: HttpClient,
    private loaderService: LoadingService
  ) {
  }

  SetHeaderOption() {
    const token = "Bearer " + localStorage["token"];
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    // headers = headers.set('Authorization', token);
    return headers;
  }

  Datatable(controlleraction: string, search: IDatatableSearch): Observable<Idatatable<any>> {
    const headers = this.SetHeaderOption();
    return this.http.post<Idatatable<any>>(environment.apiurl + "/api/" + controlleraction, search, { headers })
      .pipe(
        map(user => {
          // this.loading.dismiss(); 
          return user;
        }) // or any other operator
      );
  }

  PostData(controlleraction: string, data: any = null) {
    const headers = this.SetHeaderOption();
    return this.http.post(environment.apiurl + "/api/" + controlleraction, data, { headers })
      .pipe(
        map(user => {
          return user;
        }), // or any other operator
        catchError((e: any) => {
          //do your processing here
          return throwError(e);
        })
      );
  }

  GetData(controlleraction: string, data: string = '') {
    const headers = this.SetHeaderOption();
    return this.http.get(environment.apiurl + "/api/" + controlleraction + data, { headers })
      .pipe(
        map(user => {
          return user;
        }), // or any other operator
        catchError((e: any) => {
          //do your processing here
          return throwError(e);
        })
      );
  }

  Upload(formData: FormData) {
    return new Promise((result, reject) => {
      this.http.post(environment.apiurl + "/admin/document_upload.php", formData)
        .subscribe((data: any) => {
          result(data);
        })
    })
  }
}
