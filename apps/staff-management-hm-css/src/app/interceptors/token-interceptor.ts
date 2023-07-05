import { Injectable } from '@angular/core';
import {
    HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse
} from '@angular/common/http';

import { Observable, catchError, tap, throwError } from 'rxjs';
import { Router } from '@angular/router';

/** Pass untouched request through to the next request handler. */
@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    constructor(
        private router: Router
    ){}
    intercept(req: HttpRequest<any>, next: HttpHandler):
        Observable<HttpEvent<any>> {
        const token: string | null = localStorage.getItem('access_token')
        
        console.log("token", token)
        if (token) {
            const t_req = req.clone({
                headers: req.headers.set('Authorization',  `Bearer ${token}`)
            });
            return next.handle(t_req).pipe(
                catchError((error) => {
                    if(error instanceof HttpErrorResponse && error.status == 401){
                        localStorage.clear();
                        location.reload();
                    }
                    return throwError(error)
                }),
            );
        }
        return next.handle(req);
    }
}