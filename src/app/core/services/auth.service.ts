import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { UserData } from '../interfaces/Iuser-data';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _HttpClient:HttpClient) { }
  userdata:UserData={} as UserData
  private readonly _Router=inject(Router)

  setRegisterForm(data:object):Observable<any>{
    return this._HttpClient.post(`${environment.baseUrl}/api/v1/auth/signup`,data)
  }

  setloginform(data:object):Observable<any>{
    return this._HttpClient.post(`${environment.baseUrl}/api/v1/auth/signin`,data)
  }

  verifyEmail(email:object):Observable<any>{
    return this._HttpClient.post(`${environment.baseUrl}/api/v1/auth/forgotPasswords`,email)
  }

  verifyCode(code:object):Observable<any>{
    return this._HttpClient.post(`${environment.baseUrl}/api/v1/auth/verifyResetCode`,code)
  }

  resetPassword(data:object):Observable<any>{
    return this._HttpClient.put(`${environment.baseUrl}/api/v1/auth/resetPassword`,data)
  }

  saveUserData():void{
    if(typeof localStorage!==undefined){
      if(localStorage.getItem('userToken')!==null){
        this.userdata=jwtDecode(localStorage.getItem('userToken')!)
      }
    }
  }

  logout():void{
    if(typeof localStorage!==undefined){
      localStorage.removeItem('userToken');
    }
    this.userdata={} as UserData
    this._Router.navigate(['/login'])

  }
  
}
