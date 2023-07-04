import { Injectable } from '@angular/core';
import {
    HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';

import { Observable } from 'rxjs';
import { Router } from '@angular/router';

/** Pass untouched request through to the next request handler. */
@Injectable()
export class TokenInterceptor implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler):
        Observable<HttpEvent<any>> {
        const token: string | null = localStorage.getItem('access_token')
        if (token) {
            req.headers.append('Authorization',  `Bearer ${token}`)
        }
        return next.handle(req);
    }
}