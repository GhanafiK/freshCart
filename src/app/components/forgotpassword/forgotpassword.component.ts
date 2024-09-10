import { NgClass } from '@angular/common';
import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { AuthService } from '../../core/services/auth.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-forgotpassword',
  standalone: true,
  imports: [ReactiveFormsModule,NgClass],
  templateUrl: './forgotpassword.component.html',
  styleUrl: './forgotpassword.component.scss'
})
export class ForgotpasswordComponent {
  private readonly _FormBuilder=inject(FormBuilder)
  private readonly _AuthService=inject(AuthService)
  private readonly _Router=inject(Router)
  isloading:boolean=false;
  errMsg:string=''
  verifyEmailSubscribe!:Subscription;
  verifyCodeSubscribe!:Subscription;
  resetPasswordSubscribe!:Subscription;
  @ViewChild('verifyemail') verifyemail!:ElementRef
  @ViewChild('verifycode') verifycode!:ElementRef
  @ViewChild('resetpass') resetpass!:ElementRef

  userEmail:string=''

  verifyEmail:FormGroup=this._FormBuilder.group({
    email:[null,[RxwebValidators.required(),RxwebValidators.email()]]
  })
  onverifyEmail():void{     
    if(this.verifyEmail.valid){
      this.isloading=true;
      this.errMsg=''
      this.verifyEmailSubscribe=this._AuthService.verifyEmail(this.verifyEmail.value).subscribe({
        next: (res) => {
          if(res.statusMsg=='success'){
            this.userEmail=this.verifyEmail.get('email')?.value
            this.verifyemail.nativeElement.classList.add('d-none')
            this.verifycode.nativeElement.classList.remove('d-none')
            this.resetPassword.get('email')?.patchValue(this.userEmail)
          }  
        },
        error: (err) => {
          this.errMsg=err.error.message
          this.isloading=false
        }
      })
    }else{
      this.verifyEmail.markAllAsTouched()
    }
  }

  verifyCode:FormGroup=this._FormBuilder.group({
    resetCode:[null,[RxwebValidators.required(),RxwebValidators.pattern({expression:{'pattern':/^.{6}$/} })]]
  })
  onVerifyCode():void{
    if(this.verifyCode.valid){
      this.errMsg=''
      this.verifyCodeSubscribe=this._AuthService.verifyCode(this.verifyCode.value).subscribe({
        next: (res) => {
          if(res.status=='Success'){
            this.verifycode.nativeElement.classList.add('d-none')
            this.resetpass.nativeElement.classList.remove('d-none')
          }  
        },
        error: (err) => {
          this.errMsg=err.error.message
        }
      })
    }else{
      this.verifyCode.markAllAsTouched()
    }
  }

  resetPassword:FormGroup=this._FormBuilder.group({
    email:[null,[RxwebValidators.required(),RxwebValidators.email()]],
    newPassword:[null,[RxwebValidators.required(),RxwebValidators.pattern({expression:{'pattern':/^.{6,}$/} })]]
  })
  onResetPassword():void{
    console.log(this.resetPassword)
    if(this.resetPassword.valid){
      this.errMsg=''
      this.resetPasswordSubscribe=this._AuthService.resetPassword(this.resetPassword.value).subscribe({
        next: (res) => {
          swal.fire({
            icon: "success",
            title: "Password Updated Successfully!",
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
            localStorage.setItem('userToken',res.token)
            this._Router.navigate(['/login'])
          }, 2000);
      },
      error: (err) => {
        this.errMsg=err.error.message
      }
    })
    }else{
      this.resetPassword.markAllAsTouched()
    }
  }

  ngOnDestroy(): void {
    this.verifyEmailSubscribe?.unsubscribe()
    this.verifyCodeSubscribe?.unsubscribe()
    this.resetPasswordSubscribe?.unsubscribe()
  }
}
