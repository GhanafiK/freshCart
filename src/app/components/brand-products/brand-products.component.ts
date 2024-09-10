import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductsService } from '../../core/services/products.service';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Iproduct } from '../../core/interfaces/Iproduct';
import { CartService } from '../../core/services/cart.service';
import { IntNumPipe } from '../../core/pipes/int-num.pipe';
import { FormsModule } from '@angular/forms';
import { SearchPipe } from '../../core/pipes/search.pipe';
import { WishListService } from '../../core/services/wish-list.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-brand-products',
  standalone: true,
  imports: [RouterLink,IntNumPipe,FormsModule,SearchPipe,NgClass],
  templateUrl: './brand-products.component.html',
  styleUrl: './brand-products.component.scss'
})
export class BrandProductsComponent {
  private readonly _ActivatedRoute = inject(ActivatedRoute);
  private readonly _ProductsService=inject(ProductsService);
  private readonly _CartService=inject(CartService);
  private readonly _ToastrService=inject(ToastrService)

  getcategoryproducts!:Subscription
  brandName:string|null=''
  text:string=''
  addtocart!:Subscription
  brandsProArr:Iproduct[]=[]

  private readonly _WishListService=inject(WishListService)
  getProductsInWish!:Subscription
  UpdateWishNum!:Subscription
  addtowish!:Subscription
  productsInWish:Iproduct[]=[]
  productsId:string[]=[]
  wishProducts: Iproduct[] = [];
  

  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (params) => {
        this.brandName=params.get('name')               
      },
      error:(err)=>{
        console.log(err);  
      }
    })

    this.getcategoryproducts=this._ProductsService.getAllProducts().subscribe({
      next:(res)=>{
        for(let i=0;i<res.data.length;i++){
          if(res.data[i].brand.name==this.brandName){
            this.brandsProArr.push(res.data[i])
          }
        }
      },
      error:(err)=>{
        console.log(err);
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
}
