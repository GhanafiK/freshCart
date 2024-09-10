import { environment } from './../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  constructor(private _HttpClient:HttpClient) { }

  cashPayment(CartId:string|null,shippingAddress:object):Observable<any>{
    return this._HttpClient.post(`${environment.baseUrl}/api/v1/orders/${CartId}`,{
      "shippingAddress": shippingAddress
    })
  }

  creditPayment(CartId:string|null,shippingAddress:object):Observable<any>{
    return this._HttpClient.post(`${environment.baseUrl}/api/v1/orders/checkout-session/${CartId}?url=${environment.serverUrl}`,{
      "shippingAddress": shippingAddress
    })
  }

  getUserOrders(userId: string): Observable<any> {
    return this._HttpClient.get(`${environment.baseUrl}/api/v1/orders/user/${userId}`);
  }

}
