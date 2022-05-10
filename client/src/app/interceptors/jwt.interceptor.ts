import {HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = localStorage.getItem('token');
        const headers= new HttpHeaders()
        .set('content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .set('Access-Control-Allow-Origin', '*');
        if (token) {
            req = req.clone({
                headers
            });
        }
        return next.handle(req);
    }
}
