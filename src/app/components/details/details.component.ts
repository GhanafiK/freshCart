import { Subscription } from 'rxjs';
import { Component, inject, OnDestroy, OnInit,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../core/services/products.service';
import { Iproduct } from '../../core/interfaces/Iproduct';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { IntNumPipe } from '../../core/pipes/int-num.pipe';
import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { WishListService } from '../../core/services/wish-list.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CarouselModule,IntNumPipe,NgClass],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss',
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class DetailsComponent implements OnInit,OnDestroy {
  private readonly _ActivatedRoute=inject(ActivatedRoute)
  private readonly _ProductsService=inject(ProductsService)
  private readonly _CartService=inject(CartService)

  addtocart!:Subscription
  getSpecificpro!:Subscription
  productDetails:Iproduct|null=null

  private readonly _ToastrService=inject(ToastrService)
  private readonly _WishListService=inject(WishListService)
  getProductsInWish!:Subscription
  UpdateWishNum!:Subscription
  addtowish!:Subscription
  productsInWish:Iproduct[]=[]
  productsId:string[]=[]
  wishProducts: Iproduct[] = [];

  dynamicSlider: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    autoplayHoverPause:true,
    navText: ['<i class="fa-solid fa-angles-left fa-beat"></i>', '<i class="fa-solid fa-angles-right fa-beat"></i>'],
    responsive: {
      0: {
        items: 1,
        },
      450: {
          items: 2,
      },
      600: {
          items: 3,
      },
      770: {
        items: 5,
      },
      980: {
        items: 7,
      }
    },
    nav: true
  }

  removeDecemal(num:number):number{
    return Math.trunc(num);
  }


  ngOnInit(): void {
      this.getSpecificpro=this._ActivatedRoute.paramMap.subscribe({
        next: (p) => {
          let idProduct=p.get('id')
          this._ProductsService.getSpecificProduct(idProduct).subscribe({
            next:(res)=>{
              this.productDetails=res.data;
            },
            error:(err)=>{
              console.log(err);
              
            }
          })
          
        }
      })
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

  
  isClicked:boolean=false

  toggleClick():boolean{
    this.isClicked=!this.isClicked
    return this.isClicked
  }

  addToWishList(productId:string):void{
    if(this.isProductinWish(productId)){
      this.isClicked=true
    }else{
      this.isClicked=false
    }
    if(this.toggleClick()){
      this.addtowish=this._WishListService.addProductToWishList(productId).subscribe({
        next:(res)=>{
          this._ToastrService.success("Added to wishList❤️", '',{
            positionClass: "toast-top-center"
          })
          this._WishListService.wishItemsNumber.next(res.data)
          this._WishListService.productsCount.next(res.data.length)
        },
        error:(err)=>{
          console.log(err);
        }
      })
    }else{
      this._WishListService.removeProductFromWish(productId).subscribe({
        next:(res)=>{
          this._WishListService.productsCount.next(res.data.length)
          this._ToastrService.error(`Removed From WishList`, '',{
            positionClass: "toast-top-center"
          })
          this._WishListService.wishItemsNumber.next(res.data)
          for(let product of this.wishProducts){
            if(productId===product.id){
              this.wishProducts.splice(this.wishProducts.indexOf(product),1)
            }
          }
        }
      })
    }
    
  }
  
  isProductinWish(productId:string):boolean{  
    for(let i=0;i<this.productsId.length;i++){
      if(this.productsId[i]===productId){
        return true
      }
    }
    return false
  }


  ngOnDestroy(): void {
    this.getSpecificpro?.unsubscribe()
  }

}
