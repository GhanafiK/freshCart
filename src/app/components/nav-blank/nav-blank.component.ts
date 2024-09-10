import { NgClass, NgStyle } from '@angular/common';
import { AfterContentChecked, Component, ElementRef, inject, ViewChild } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ThemeService } from '../../core/services/theme.service';
import { AuthService } from '../../core/services/auth.service';
import { CartService } from '../../core/services/cart.service';
import { WishListService } from '../../core/services/wish-list.service';

@Component({
  selector: 'app-nav-blank',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, NgClass],
  templateUrl: './nav-blank.component.html',
  styleUrl: './nav-blank.component.scss',
})
export class NavBlankComponent implements AfterContentChecked{
  private readonly _ThemeService = inject(ThemeService);
  private readonly _AuthService=inject(AuthService)
  private readonly _CartService=inject(CartService)
  private readonly _WishListService=inject(WishListService)
  @ViewChild('toggleBtn') toggleBtn!: ElementRef;
  theme:string='';

  cartCounter:number=0
  wishCounter:number=0

  ngOnInit(): void {
    this._CartService.getCartProducts().subscribe({
      next: (res) => {
        this._CartService.cartItemsNumber.next(res.numOfCartItems)
      }
    })

    this._WishListService.getProductsInWish().subscribe({
      next: (res) => {
        this._WishListService.productsCount.next(res.data.length)
      }
    })
    this._CartService.cartItemsNumber.subscribe({
      next:(c)=>{
        this.cartCounter=c
      }
    })
    this._WishListService.productsCount.subscribe({
      next:(c)=>{
        this.wishCounter=c
      }
    })
  

    

    if(typeof localStorage!=='undefined'){
      if (localStorage.getItem('theme')) {
        document.body.classList.add('dark-mode');
        this.theme='Dark';
      } else {
        document.body.classList.remove('dark-mode');
        this.theme='Light';
      }
    }
  }

  isDarkMode: boolean = this._ThemeService.dark;
  flag: string = '';

  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
    if (this.isDarkMode) {
      document.body.classList.add('dark-mode');
      if(typeof localStorage!=='undefined'){
        localStorage.setItem('theme', 'dark');
      }
      this.theme='Dark';
    } else {
      document.body.classList.remove('dark-mode');
      if(typeof localStorage!=='undefined'){
        localStorage.removeItem('theme');
      }
      this.theme='Light';
    }
  }

  ngAfterContentChecked(): void {
    if(typeof localStorage!=='undefined'){
      if (localStorage.getItem('theme')) {
        this.isDarkMode = true;
        this.theme='Dark';
      } else {
        this.isDarkMode = false;
        this.theme='Light';
      }
    }
  }

  signout():void{
    this._AuthService.logout()
  }
}
