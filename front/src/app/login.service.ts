import { Injectable } from '@angular/core';
import { Http, RequestOptions, RequestMethod, Headers } from '@angular/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private token;
  constructor(private http:Http) { }

  storeToken(token){
    localStorage.setItem('token', token);
  }

  login(input): Observable<any>{
    var body=input;
    var headerOptions=new Headers( {'Content-Type' : 'application/json','Accept' : 'application/json'});
    var requestOptions = new RequestOptions({ method: RequestMethod.Post, headers: headerOptions });
    return this.http.post('http://127.0.0.1:8000/api/auth/login', body, requestOptions);
  }

  me(token: any): Observable<any>{
    console.log(token);
    var headerOptions=new Headers( {'Accept' : 'application/json',
      'Content-Type' : 'application/x-www-form-urlencoded',
    });
    var requestOptions = new RequestOptions({ method: RequestMethod.Post, headers: headerOptions });
    return this.http.post( 'http://127.0.0.1:8000/api/auth/me?token=' + token ,  requestOptions);
  }

  logout(token: any):Observable<any>{
    var headerOptions=new Headers( {'Accept' : 'application/json',
      'Content-Type' : 'application/x-www-form-urlencoded',
    });
    var requestOptions = new RequestOptions({ method: RequestMethod.Post, headers: headerOptions });
    return this.http.post( 'http://127.0.0.1:8000/api/auth/logout?token=' + token ,  requestOptions);
  }

}