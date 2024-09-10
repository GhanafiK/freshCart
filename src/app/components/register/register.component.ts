import { Component, inject, OnDestroy } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import swal from 'sweetalert2';
import { NgClass } from '@angular/common';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule,NgClass,RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnDestroy {
  isloading:boolean=false;
  private readonly _AuthService=inject(AuthService)
  private readonly _FormBuilder=inject(FormBuilder)
  private readonly _Router=inject(Router)
  registersubscribe!:Subscription;

  registerForm:FormGroup=this._FormBuilder.group({
    name:[null,[RxwebValidators.required(),RxwebValidators.minLength({value:3}),RxwebValidators.maxLength({value:25})]],
    phone:[null,[RxwebValidators.required(),RxwebValidators.pattern({expression:{'pattern':/^01[0125][0-9]{8}$/} })]],
    email:[null,[RxwebValidators.required(),RxwebValidators.email()]],
    password:[null,[RxwebValidators.required(),RxwebValidators.pattern({expression:{'pattern':/^.{6,}$/} })]],
    rePassword:[''], 
  },{validators:[this.validateRePassword]})
  
 /*  registerForm:FormGroup=this._FormBuilder.group({
    name:[null,[Validators.required,Validators.minLength(3),Validators.maxLength(30)]],
    phone:[null,[Validators.required,Validators.pattern(/^01[0125][0-9]{8}$/)]],
    email:[null,[Validators.required,Validators.email]],
    password:[null,[Validators.required,Validators.pattern(/^.{6,}$/)]],
    rePassword:[null], 
  },{validators:[this.validateRePassword]}) */

  
  validateRePassword(g:AbstractControl){
    if(g.get('password')?.value==g.get('rePassword')?.value){
      return null
    }else{
      return {mismatch:true}
    }
  }

  onsubmit():void{
    if(this.registerForm.valid){
      this.isloading=true;
      this.registersubscribe=this._AuthService.setRegisterForm(this.registerForm.value).subscribe({
        next:(res)=>{
          if(res.message=='success'){
            swal.fire({
              icon: "success",
              title: "Your email has been created successfully!",
              customClass: {
                popup: 'rounded-5'
              },
              confirmButtonColor: 'green',
              background: '#e7ece8',
              showConfirmButton: false,
              allowOutsideClick: false,
              timer: 2000 
            });
            setTimeout(() => {
              this._Router.navigate(['/login'])
            }, 2000);
            this.isloading=false
          }
        },
        error:(err)=>{
          swal.fire({
            icon: "error",
            title: "Account Already Exists",
            customClass: {
              popup: 'rounded-5'
            },
            confirmButtonColor: 'red',
            background: '#ffe3e3',
          });
          this.isloading=false
        }
      })
    }else{
      this.registerForm.markAllAsTouched()
    }
  }

  ngOnDestroy(): void {
      this.registersubscribe?.unsubscribe();
  }
}
