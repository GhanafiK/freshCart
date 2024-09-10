import { NgClass } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { PaymentService } from '../../core/services/payment.service';
import { Subscription } from 'rxjs';
import { log } from 'console';
import { CartService } from '../../core/services/cart.service';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [ReactiveFormsModule,NgClass],
  templateUrl: './order.component.html',
  styleUrl: './order.component.scss'
})
export class OrderComponent implements OnInit,OnDestroy {
  private readonly _FormBuilder = inject(FormBuilder);
  private readonly _ActivatedRoute = inject(ActivatedRoute);
  private readonly _PaymentService = inject(PaymentService);
  private readonly _CartService = inject(CartService);
    private readonly _Router=inject(Router)
  checkeditem:string='Online Payment'
  cartId:string|null=''
  creditPayment!:Subscription
  cashPayment!:Subscription
  getCartId!:Subscription
  isloading:boolean=false
  

  orderForm: FormGroup = this._FormBuilder.group({
    details:[null,[RxwebValidators.required()]],
    phone:[null,[RxwebValidators.required(),RxwebValidators.pattern({expression:{'pattern':/^01[0125][0-9]{8}$/} })]],
    city:[null,[RxwebValidators.required()]],
  });

  ngOnInit(): void {
      this.getCartId=this._ActivatedRoute.paramMap.subscribe({
        next: (params) => {
          this.cartId=params.get('id')
        },
        error:(err)=>{
          console.log(err);  
        }
      })
  }

  onsubmit():void{
    if(this.orderForm.valid){
      this.isloading=true 
      if(this.checkeditem=="Online Payment"){
        this.creditPayment=this._PaymentService.creditPayment(this.cartId,this.orderForm.value).subscribe({
          next:(res)=>{
            this.isloading=false 
            window.open(res.session.url,'_self')
            this._CartService.cartItemsNumber.next(0)
          },
          error:(err)=>{
            console.log(err);
          }
        })
      }
      else if(this.checkeditem=="Cash on Delivery (COD)"){
        this.cashPayment=this._PaymentService.cashPayment(this.cartId,this.orderForm.value).subscribe({
          next:(res)=>{
            if(res.status==="success"){    
              this.isloading=false 
              this._Router.navigate(['/allorders'])
              this._CartService.cartItemsNumber.next(0)              
            }
          },
          error:(err)=>{
            console.log(err);
          }
        })
      }else{
        console.log("error Here")
      }
    }else{
      this.orderForm.markAllAsTouched()
    }
  }

  checkStatus(radioSelected:string):void {
    this.checkeditem=radioSelected
  }

  ngOnDestroy(): void {
      this.creditPayment?.unsubscribe()
      this.cashPayment?.unsubscribe()
      this.getCartId?.unsubscribe()
  }
}
