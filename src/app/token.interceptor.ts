import { Injectable } from '@angular/core';
import {HttpInterceptor, HttpRequest, HttpHandler, HttpResponse, HttpEvent} from '@angular/common/http';

import { Observable } from 'rxjs';
import {tap, filter} from 'rxjs/operators'
import { DataService } from './core/services/data.service';


@Injectable()
export class TokenInterceptor implements HttpInterceptor {

    private apiTokenName='token';
    constructor(private dataService:DataService) {}
    
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let token = localStorage.getItem(this.apiTokenName);
        console.log(token);
        if(token && request.url!="http://abitpriv.vstu.by:8080/api/uaa/api/token/generate"){
            request = request.clone({ 
                setHeaders: { 
                Authorization : "Bearer " +token ,
                },
            });
        }
        return next.handle(request)
            .pipe(
                tap(
                    (response:HttpResponse<any>)=>{
                    if(response.headers && response.body[this.apiTokenName]){
                        localStorage.setItem(this.apiTokenName,response.body[this.apiTokenName])
                        console.log("headers:"+response.body[this.apiTokenName]);
                    } 
            }));
    }
}