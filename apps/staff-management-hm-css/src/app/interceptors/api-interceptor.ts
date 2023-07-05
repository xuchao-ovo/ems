import { Injectable } from '@angular/core';
import {
    HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse
} from '@angular/common/http';

import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';

/** Pass untouched request through to the next request handler. */
@Injectable()
export class APIInterceptor implements HttpInterceptor {
    constructor(
        private router: Router
    ){}
    intercept(req: HttpRequest<any>, next: HttpHandler):
        Observable<HttpEvent<any>> {
        /*
            如果访问url是 /api开头的，就将 /api 替换成 http://localhost:3000/api
         */
        if (req.url.startsWith('/api')) {
            const t_req = req.clone({
                url: req.url.replace('/api', 'http://localhost:3000/api')
            })
            return next.handle(t_req);
        }
        return next.handle(req);
    }
}