import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItemsNumber:BehaviorSubject<number>=new BehaviorSubject(0)

  constructor(private _HttpClient:HttpClient) { }
  getCartProducts():Observable<any>{
    return this._HttpClient.get(`${environment.baseUrl}/api/v1/cart`
  )
  }

  addProductToCart(productId:string):Observable<any>{
    return this._HttpClient.post(`${environment.baseUrl}/api/v1/cart`,{
      "productId": productId
    }
  )
  }

  removeSpecifcProduct(id:string):Observable<any>{
    return this._HttpClient.delete(`${environment.baseUrl}/api/v1/cart/${id}`)
  }

  updateCartProductQuantity(id:string,c:number):Observable<any>{
    return this._HttpClient.put(`${environment.baseUrl}/api/v1/cart/${id}`,{
      "count":c
    })
  }
}
