import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CartService } from '../../core/services/cart.service';
import { Subscription } from 'rxjs';
import { Icart } from '../../core/interfaces/icart';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit,OnDestroy {
  private readonly _CartService=inject(CartService)
  private readonly _ToastrService=inject(ToastrService)

  getUserCartProducts!:Subscription
  deleteProduct!:Subscription
  productQuantity!:Subscription
  cartDetails:Icart|null=null

  ngOnInit(): void {
      this.getUserCartProducts=this._CartService.getCartProducts().subscribe({
        next:(res)=>{
          this.cartDetails=res.data   
        },
        error:(err)=>{
          console.log(err)
        }
      })
  }

  removeSpecificProduct(id:string,productName:string):void{
    this.deleteProduct=this._CartService.removeSpecifcProduct(id).subscribe({
      next:(res)=>{
        this.cartDetails=res.data
        this._ToastrService.error(`${productName} removed from your cart!`, '',{
          positionClass: "toast-top-center"
        })
        this._CartService.cartItemsNumber.next(res.numOfCartItems)        
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }
  updateCount(id:string,c:number):void{
    this.productQuantity= this._CartService.updateCartProductQuantity(id,c).subscribe({
      next:(res)=>{
        this.cartDetails=res.data
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }

  ngOnDestroy(): void {
    this.getUserCartProducts?.unsubscribe()
    this.deleteProduct?.unsubscribe()
    this.productQuantity?.unsubscribe()
  }

}
