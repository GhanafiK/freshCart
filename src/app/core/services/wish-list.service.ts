import { Iproduct } from './../interfaces/Iproduct';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WishListService {

  constructor(private _HttpClient:HttpClient) { }

  productsCount:BehaviorSubject<number>=new BehaviorSubject(0)

  wishItemsNumber:BehaviorSubject<[]>=new BehaviorSubject([])
  wishListProducts:BehaviorSubject<[]>=new BehaviorSubject([])

  addProductToWishList(productId:string):Observable<any>{
    return this._HttpClient.post(`${environment.baseUrl}/api/v1/wishlist`,{
      "productId": productId
    })
  }

  getProductsInWish():Observable<any>{
    return this._HttpClient.get(`${environment.baseUrl}/api/v1/wishlist`)
  }

  removeProductFromWish(productId:string):Observable<any>{
    return this._HttpClient.delete(`${environment.baseUrl}/api/v1/wishlist/${productId}`)
  }
}
