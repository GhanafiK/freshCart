import { Component, inject, OnInit } from '@angular/core';
import { WishListService } from '../../core/services/wish-list.service';
import { Subscription } from 'rxjs';
import { Iproduct } from '../../core/interfaces/Iproduct';
import { RouterLink } from '@angular/router';
import { IntNumPipe } from '../../core/pipes/int-num.pipe';
import { FormsModule } from '@angular/forms';
import { SearchPipe } from '../../core/pipes/search.pipe';
import { NgClass } from '@angular/common';
import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-wish-list',
  standalone: true,
  imports: [RouterLink, IntNumPipe, FormsModule, SearchPipe, NgClass],
  templateUrl: './wish-list.component.html',
  styleUrl: './wish-list.component.scss',
})
export class WishListComponent implements OnInit {
  private readonly _WishListService = inject(WishListService);
  private readonly _CartService=inject(CartService)
  private readonly _ToastrService=inject(ToastrService)
  wishProducts: Iproduct[] = [];
  getProductsiInWish!: Subscription;
  addtocart!:Subscription
  getProductsInWish!:Subscription
  UpdateWishNum!:Subscription
  productsId:string[]=[]
  text: string = '';

  ngOnInit(): void {
    this._WishListService.getProductsInWish().subscribe({
      next: (res) => {
        this._WishListService.wishListProducts.next(res.data)
        this._WishListService.wishListProducts.subscribe({
          next: (res) => {
            this.wishProducts=res
          }
        })
      },
      error: (err) => {
        console.log(err);
      },
    });
    
    this.getProductsInWish=this._WishListService.getProductsInWish().subscribe({
      next:(res)=>{
        this._WishListService.wishListProducts.next(res.data)
        this._WishListService.wishListProducts.subscribe({
          next: (res) => {
            this.wishProducts=res
          }
        })
        if(res.data.length>0){
          this.productsId=[]
          for(let i=0;i<res.data.length;i++){
            this.productsId.push(res.data[i].id)
          }      
        }else{
          this.productsId=[]
        }
      }
    })

    this.UpdateWishNum=this._WishListService.wishItemsNumber.subscribe({
      next:(res)=>{
        this.productsId=res
      }
    })
  }

  addToCart(id:string):void{
    this.addtocart=this._CartService.addProductToCart(id).subscribe({
      next:(res)=>{
        this._ToastrService.success("Added to cart!", '',{
          positionClass: "toast-top-center"
        })
        this._CartService.cartItemsNumber.next(res.numOfCartItems)        
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }

  isProductinWish(productId:string):boolean{    
    for(let i=0;i<this.productsId.length;i++){
      if(this.productsId[i]===productId){
        return true
      }
    }
    return false
  }

  removeProductFromWishList(productId:string){
    this._WishListService.removeProductFromWish(productId).subscribe({
      next:(res)=>{
        this._WishListService.productsCount.next(res.data.length)
        this._ToastrService.error(`Removed From Wish List`, '',{
          positionClass: "toast-top-center"
        })
        for(let product of this.wishProducts){
          if(productId===product.id){
            this.wishProducts.splice(this.wishProducts.indexOf(product),1)
          }
        }
      }
    })
  }
}
