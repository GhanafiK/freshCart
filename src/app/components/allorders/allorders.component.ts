import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { PaymentService } from '../../core/services/payment.service';
import { Iorder } from '../../core/interfaces/iorder';
import { Subscription } from 'rxjs';
import { UserData } from '../../core/interfaces/Iuser-data';


@Component({
  selector: 'app-allorders',
  standalone: true,
  imports: [],
  templateUrl: './allorders.component.html',
  styleUrl: './allorders.component.scss'
})
export class AllordersComponent implements OnInit{
  private readonly _PaymentService = inject(PaymentService);
  token:any=localStorage.getItem('userToken')
  decodedToken:UserData=jwtDecode(this.token)
  getUserOrders!:Subscription
  UserOrders:Iorder[]=[]

  ngOnInit(): void { 
    this.getUserOrders=this._PaymentService.getUserOrders(this.decodedToken.id).subscribe({
      next: (res) =>{
        this.UserOrders=res
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }
}
