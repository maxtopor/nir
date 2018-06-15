import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpResponse, HttpErrorResponse } from "@angular/common/http";
import { Observable } from "rxjs/internal/Observable";
import { map, catchError} from "rxjs/operators";
import { of } from "rxjs/internal/observable/of";


@Injectable()
export class DataService{
    
    constructor(private http: HttpClient){
    }

    getData(url: string): Observable<any>{
        return this.http.get('/api'+url);
    }

    updateData(url: string, data: any[]){
        return this.http.put('/api'+url+'/update', data);
    }

    addData(url: string, data: any[]){
        return this.http.post('/api'+url+'/create',data);
    }

    getFields(url: string): Observable<any>{
        return this.http.get('/api'+url+'/fields');
    }    

    getToken(str:string) : Observable<any>{
        return this.http.get("http://abitpriv.vstu.by:8080/api/uaa/api/token/generate",{headers: {
            'Authorization': "Basic "+ btoa(str),
            'Content-Type':"application/json"
        }});
    }

    public checkToken(): Observable<any>{
        return this.http.post("http://abitpriv.vstu.by:8080/api/uaa/api/token/verify",localStorage.getItem('token'));
    }

}