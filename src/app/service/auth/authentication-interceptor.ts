import { HttpInterceptor, HttpRequest, HttpHandler, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';

const TOKEN_HEADER_KEY = 'Authorization';

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {

    constructor(private storageService: StorageService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        const TOKEN = this.storageService.getToken();
        const TOKEN_TYPE = this.storageService.getTokenType();
        console.log("TOKEN_TYPE : " + TOKEN_TYPE);
        console.log("TOKEN : " + TOKEN);
        if(TOKEN != null) {
            req = req.clone({ headers: req.headers.set(TOKEN_HEADER_KEY, TOKEN_TYPE + ' ' + TOKEN) });
        }
        return next.handle(req);
    }
}

export const HTTP_INTERCEPTOR_PROVIDER = [
    { provide: HTTP_INTERCEPTORS, useClass: AuthenticationInterceptor, multi: true }
];