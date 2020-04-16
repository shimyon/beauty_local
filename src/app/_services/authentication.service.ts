import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { AjaxServiceService } from './ajax.service.service';
import { appGlob } from '../../environments/app_glob';


@Injectable()
export class AuthenticationService {
    constructor(private http: HttpClient, private ajax: AjaxServiceService) { }

    login(tenantid: string, username: string, password: string) {
        const headers = new HttpHeaders();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        let params = new HttpParams();
        params = params.append('tenantid', tenantid);
        params = params.append('username', username);
        params = params.append('password', password);
        params = params.append('action', 'autho');
        let urlpost = environment.AppFor == "Client" ? 'user_action.php': 'customer_action.php';
        return this.ajax.PostData(urlpost, params).pipe(
            map((response: any) => {
                const user = response;
                if (user && user.isOk) {
                    appGlob.User.UserDetailsSet(user);
                }
                return user;
            })
        );
    }
}