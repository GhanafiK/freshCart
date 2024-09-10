import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Icategory } from '../../core/interfaces/icategory';
import { Iproduct } from '../../core/interfaces/Iproduct';
import { Subscription } from 'rxjs';
import { BrandService } from '../../core/services/brand.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-brands',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss'
})
export class BrandsComponent implements OnInit,OnDestroy {
  private readonly _BrandService=inject(BrandService)
  allBrands:Icategory[]=[]
  specificCartProducts:Iproduct[]=[]
  getAllBrands!:Subscription

  ngOnInit(): void {
      this.getAllBrands=this._BrandService.getAllBrands().subscribe({
        next:(res)=>{
          this.allBrands=res.data
        },
        error:(err)=>{
          console.log(err);
        }
      })
  }

  ngOnDestroy(): void {
      this.getAllBrands?.unsubscribe()
  }
}
