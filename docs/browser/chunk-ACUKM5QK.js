import"./chunk-XG6EI434.js";import{a as B,c as V,g as z,m as N}from"./chunk-BN2FMV5P.js";import{a as Y}from"./chunk-NKEFFQH3.js";import{l as Z}from"./chunk-TIJ5NDGT.js";import{a as j}from"./chunk-GGQOJ67K.js";import{a as R}from"./chunk-ZKMRKIND.js";import"./chunk-SZXLN6HP.js";import{h as D}from"./chunk-K73KBK7O.js";import{j as I}from"./chunk-VS3RXJSE.js";import{Ab as U,Bb as p,Ib as l,Jb as w,Kb as F,Mb as L,Nb as E,Oa as y,Ob as O,Qb as M,Rb as A,Sa as a,Sb as P,Wb as T,Xb as k,ba as m,ea as S,hb as f,jb as _,kb as b,nb as x,oa as h,ob as W,pa as u,pb as g,qb as C,rb as o,sb as r,tb as d,wb as v}from"./chunk-SHLI2ADH.js";var $=(i,s)=>s.id,q=i=>["/details",i],Q=()=>[1,2,3,4,5],G=i=>({"text-danger":i});function H(i,s){if(i&1&&(o(0,"div",9)(1,"span",19),l(2),T(3,"intNum"),r()()),i&2){let e=p().$implicit;a(2),F("",k(3,1,(e.price-e.priceAfterDiscount)/e.price*100),"% off")}}function J(i,s){i&1&&(o(0,"span"),d(1,"i",20),r())}function K(i,s){if(i&1&&(o(0,"span"),d(1,"i",20),r()),i&2){let e=p().$implicit;a(),b("clip-path","inset(0 "+(100-e.ratingsAverage%1*100)+"% 0 0)")}}function X(i,s){if(i&1){let e=v();o(0,"div",7)(1,"div",8),f(2,H,4,3,"div",9),o(3,"div",10),d(4,"img",11),o(5,"h2",12),l(6),r(),o(7,"h3",13),l(8),r(),o(9,"div",14)(10,"span"),l(11),r(),o(12,"div",15),g(13,J,2,0,"span",null,W),f(15,K,2,2,"span"),r()()(),o(16,"span",16),U("click",function(){let t=h(e).$implicit,c=p(2);return u(c.removeProductFromWishList(t.id))}),d(17,"i",17),r(),o(18,"button",18),U("click",function(){let t=h(e).$implicit,c=p(2);return u(c.addToCart(t.id))}),l(19,"+ Add To Cart"),r()()()}if(i&2){let e=s.$implicit,n=p(2);a(2),x(2,e.priceAfterDiscount&&e.price!==e.priceAfterDiscount?2:-1),a(),_("routerLink",P(9,q,e.id)),a(),_("src",e.imageCover,y)("alt",e.title),a(2),w(e.category.name),a(2),w(e.title.split(" ",2).join(" ")),a(3),F("",e.price," EGP"),a(2),C(A(11,Q).slice(0,e.ratingsAverage)),a(2),x(15,e.ratingsAverage%1!==0?15:-1),a(),_("ngClass",P(12,G,n.isProductinWish(e.id)))}}function tt(i,s){if(i&1){let e=v();o(0,"h1",1),l(1,"Your Wish List\u2764\uFE0F"),r(),o(2,"div",2)(3,"input",3),O("ngModelChange",function(t){h(e);let c=p();return E(c.text,t)||(c.text=t),u(t)}),r(),o(4,"span",4),d(5,"i",5),r()(),o(6,"div",6),g(7,X,20,14,"div",7,$),r()}if(i&2){let e=p();a(3),L("ngModel",e.text),a(4),C(e.wishProducts)}}function et(i,s){i&1&&(o(0,"div",21),d(1,"img",22),o(2,"h1",23),d(3,"span",24),l(4,"Your WishList \u2764\uFE0F is "),o(5,"span",25),l(6,"Empty!!!"),r()()())}var ft=(()=>{let s=class s{constructor(){this._WishListService=m(j),this._CartService=m(R),this._ToastrService=m(Z),this.wishProducts=[],this.productsId=[],this.text=""}ngOnInit(){this._WishListService.getProductsInWish().subscribe({next:n=>{this._WishListService.wishListProducts.next(n.data),this._WishListService.wishListProducts.subscribe({next:t=>{this.wishProducts=t}})},error:n=>{console.log(n)}}),this.getProductsInWish=this._WishListService.getProductsInWish().subscribe({next:n=>{if(this._WishListService.wishListProducts.next(n.data),this._WishListService.wishListProducts.subscribe({next:t=>{this.wishProducts=t}}),n.data.length>0){this.productsId=[];for(let t=0;t<n.data.length;t++)this.productsId.push(n.data[t].id)}else this.productsId=[]}}),this.UpdateWishNum=this._WishListService.wishItemsNumber.subscribe({next:n=>{this.productsId=n}})}addToCart(n){this.addtocart=this._CartService.addProductToCart(n).subscribe({next:t=>{this._ToastrService.success("Added to cart!","",{positionClass:"toast-top-center"}),this._CartService.cartItemsNumber.next(t.numOfCartItems)},error:t=>{console.log(t)}})}isProductinWish(n){for(let t=0;t<this.productsId.length;t++)if(this.productsId[t]===n)return!0;return!1}removeProductFromWishList(n){this._WishListService.removeProductFromWish(n).subscribe({next:t=>{this._WishListService.productsCount.next(t.data.length),this._ToastrService.error("Removed From Wish List","",{positionClass:"toast-top-center"});for(let c of this.wishProducts)n===c.id&&this.wishProducts.splice(this.wishProducts.indexOf(c),1)}})}};s.\u0275fac=function(t){return new(t||s)},s.\u0275cmp=S({type:s,selectors:[["app-wish-list"]],standalone:!0,features:[M],decls:3,vars:1,consts:[[1,"my-3"],[1,"h2","login-text","my-3","card-text","fw-bolder","text-center"],[1,"w-50","mx-auto","my-3","search-container"],["type","search","placeholder","Search By Title...",1,"search","w-100",3,"ngModelChange","ngModel"],[1,"d-block"],[1,"fa-solid","fa-magnifying-glass"],[1,"row","g-4"],[1,"col-sm-6","col-md-4","col-lg-3","col-xl-2"],[1,"p-2","bg-transparent","product","card-text","h-100","my-card"],[1,"sale","border-0"],[3,"routerLink"],[1,"w-100",3,"src","alt"],[1,"small","text-main","mt-1"],[1,"h6"],[1,"d-flex","justify-content-between","align-items-center"],[1,"stars"],[1,"d-block","cursor-pointer","my-2","heart-icon",3,"click","ngClass"],[1,"fa-solid","fa-heart","fa-xl"],[1,"btn-main","w-100","py-1",3,"click"],[1,"small"],[1,"bi","bi-star-fill","rating-color","small"],[1,"text-center"],["src","./assets/images/OutOfStock.png","alt","empty cart",1,"outOfStock"],[1,"fw-bolder","card-text"],[1,"text-main"],[1,"text-danger"]],template:function(t,c){t&1&&(o(0,"section",0),f(1,tt,9,1)(2,et,7,0),r()),t&2&&(a(),x(1,c.wishProducts&&c.wishProducts.length>0?1:2))},dependencies:[D,Y,N,B,V,z,I],styles:['@font-face{font-family:Concert One;font-style:normal;font-weight:400;font-display:swap;src:url(https://fonts.gstatic.com/s/concertone/v22/VEM1Ro9xs5PjtzCu-srDqSTsjP6yuQ.woff2) format("woff2");unicode-range:U+0100-02AF,U+0304,U+0308,U+0329,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20C0,U+2113,U+2C60-2C7F,U+A720-A7FF}@font-face{font-family:Concert One;font-style:normal;font-weight:400;font-display:swap;src:url(https://fonts.gstatic.com/s/concertone/v22/VEM1Ro9xs5PjtzCu-srDqSTijP4.woff2) format("woff2");unicode-range:U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+2074,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD}@font-face{font-family:Lilita One;font-style:normal;font-weight:400;font-display:swap;src:url(https://fonts.gstatic.com/s/lilitaone/v15/i7dPIFZ9Zz-WBtRtedDbYE98RWq7.woff2) format("woff2");unicode-range:U+0100-02AF,U+0304,U+0308,U+0329,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20C0,U+2113,U+2C60-2C7F,U+A720-A7FF}@font-face{font-family:Lilita One;font-style:normal;font-weight:400;font-display:swap;src:url(https://fonts.gstatic.com/s/lilitaone/v15/i7dPIFZ9Zz-WBtRtedDbYEF8RQ.woff2) format("woff2");unicode-range:U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+2074,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD}.my-card[_ngcontent-%COMP%]{box-shadow:0 1px 5px #8f8f8f}.login-text[_ngcontent-%COMP%]{font-family:Lilita One,sans-serif;font-size:30px}.sale[_ngcontent-%COMP%]{position:absolute;padding:6px;top:0;right:0;background-color:#eeaf00}.search[_ngcontent-%COMP%]{padding:10px;border-radius:50px;background-color:transparent;color:var(--card-text);border:1px solid var(--main-color)}.search-container[_ngcontent-%COMP%]{position:relative}.search-container[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{padding:6px 10px;border-radius:50px;position:absolute;top:4px;right:6px;color:#fff;background-color:var(--main-color)}[_ngcontent-%COMP%]::-webkit-input-placeholder{color:var(--card-text)}[_ngcontent-%COMP%]::-moz-placeholder{color:var(--card-text)}[_ngcontent-%COMP%]:-ms-input-placeholder{color:var(--card-text)}[_ngcontent-%COMP%]:-moz-placeholder{color:var(--card-text)}.heart-icon[_ngcontent-%COMP%]{color:#8080803d}@media (min-width: 0px){.mainSlider[_ngcontent-%COMP%]{display:none}}@media (min-width: 576px){.outOfStock[_ngcontent-%COMP%]{width:50%}}@media (min-width: 768px){.mainSlider[_ngcontent-%COMP%]{display:block}.outOfStock[_ngcontent-%COMP%]{width:25%}.search-container[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{padding:7px 30px}}']});let i=s;return i})();export{ft as WishListComponent};
