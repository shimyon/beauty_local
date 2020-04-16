import { Injectable } from "@angular/core";
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";
import { finalize } from "rxjs/operators";
import { LoadingService } from "../_services";

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
    constructor(public loaderService: LoadingService) { }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let num = Math.random() * 100000000000000;
        this.loaderService.show(num);
        return next.handle(req).pipe(
            finalize(() => {
                return this.loaderService.hide(num);
            })
        );
    }
}