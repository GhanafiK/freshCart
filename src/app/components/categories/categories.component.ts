import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CategoriesService } from '../../core/services/categories.service';
import { Icategory } from '../../core/interfaces/icategory';
import { Iproduct } from '../../core/interfaces/Iproduct';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent implements OnInit,OnDestroy{
  private readonly _CategoriesService=inject(CategoriesService)
  categoriesData:Icategory[]=[]
  specificCartProducts:Iproduct[]=[]
  allCategories!:Subscription

  ngOnInit(): void {
      this.allCategories=this._CategoriesService.getAllCategories().subscribe({
        next:(res)=>{
          this.categoriesData=res.data
        },
        error:(err)=>{
          console.log(err);
        }
      })
  }

  ngOnDestroy(): void {
      this.allCategories?.unsubscribe()
  }
}
