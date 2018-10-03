import { Injectable } from '@angular/core';
import { Http, RequestOptions, RequestMethod, Headers } from '@angular/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http:Http) { }

  registerStudent(input): Observable<any>{
    var body=JSON.stringify(input);
    //var body = input;
    console.log(body);
    var headerOptions=new Headers({'Accept' : 'application/json',
      'Content-Type' : 'application/json',
    });
    var requestOptions = new RequestOptions({ method: RequestMethod.Post, headers: headerOptions });
    return this.http.post(' http://127.0.0.1:8000/api/register-student ', body, requestOptions);
  }
}


// getDetails(): Observable<any>{
//   var headerOptions=new Headers( {'Accept' : 'application/json',
//   'Content-Type' : 'application/x-www-form-urlencoded',
//   });
//   var requestOptions = new RequestOptions({ method: RequestMethod.Get, headers: headerOptions });
//   return this.http.get('http://127.0.0.1:8000/api/student-details?token=' + localStorage.getItem('token') ,requestOptions);
// }

