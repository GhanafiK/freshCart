import './polyfills.server.mjs';
import{a as w,b as A}from"./chunk-5HBUUMHY.mjs";import{i as L,l as x,m as _}from"./chunk-52P3PWSC.mjs";import{l as M}from"./chunk-HIKXIYV6.mjs";import{$ as c,Cb as b,Db as y,Eb as C,Fb as l,Hb as S,Nb as m,Pa as f,Qb as D,X as u,gb as h,ja as p,ka as g,ob as n,pb as a,qb as o,tb as v,xb as k}from"./chunk-XYGJBAR7.mjs";import"./chunk-VVCT4QZE.mjs";var N=["toggleBtn"],T=(i,e)=>({"bi bi-moon-stars-fill":i,"bi bi-brightness-high":e}),F=(()=>{let e=class e{constructor(){this._ThemeService=u(w),this.theme="",this.isDarkMode=this._ThemeService.dark,this.flag=""}ngOnInit(){typeof localStorage<"u"&&(localStorage.getItem("theme")?(document.body.classList.add("dark-mode"),this.theme="Dark"):(document.body.classList.remove("dark-mode"),this.theme="Light"))}toggleDarkMode(){this.isDarkMode=!this.isDarkMode,this.isDarkMode?(document.body.classList.add("dark-mode"),typeof localStorage<"u"&&localStorage.setItem("theme","dark"),this.theme="Dark"):(document.body.classList.remove("dark-mode"),typeof localStorage<"u"&&localStorage.removeItem("theme"),this.theme="Light")}ngAfterContentChecked(){typeof localStorage<"u"&&(localStorage.getItem("theme")?(this.isDarkMode=!0,this.theme="Dark"):(this.isDarkMode=!1,this.theme="Light"))}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=c({type:e,selectors:[["app-nav-auth"]],viewQuery:function(t,r){if(t&1&&b(N,5),t&2){let d;y(d=C())&&(r.toggleBtn=d.first)}},standalone:!0,features:[m],decls:22,vars:5,consts:[["toggleBtn",""],[1,"navbar","navbar-expand-lg","bg-main-light"],[1,"container-fluid"],["routerLink","login",1,"navbar-brand"],[1,"fw-bolder","logo"],[1,"bi","bi-cart4"],[1,"d-flex","justify-content-center","align-items-center","gap-2"],[1,"nav-link","cursor-pointer",3,"click"],[1,"fa-solid",3,"ngClass"],["type","button","data-bs-toggle","collapse","data-bs-target","#navbarNav","aria-controls","navbarNav","aria-expanded","false","aria-label","Toggle navigation",1,"navbar-toggler"],[1,"fa-solid","fa-bars","text-main"],["id","navbarNav",1,"collapse","navbar-collapse"],[1,"navbar-nav","ms-auto"],[1,"nav-item","cursor-pointer"],["routerLinkActive","active-link","routerLink","/login",1,"nav-link","ps-2"],["routerLinkActive","active-link","routerLink","/register",1,"nav-link","ps-2"]],template:function(t,r){if(t&1){let d=v();n(0,"nav",1)(1,"div",2)(2,"a",3)(3,"span",4),o(4,"i",5),l(5," FreshCart"),a()(),n(6,"div",6)(7,"a",7,0),k("click",function(){return p(d),g(r.toggleDarkMode())}),o(9,"i",8),l(10),a(),n(11,"button",9)(12,"span"),o(13,"i",10),a()()(),n(14,"div",11)(15,"ul",12)(16,"li",13)(17,"a",14),l(18,"login"),a()(),n(19,"li",13)(20,"a",15),l(21,"register"),a()()()()()()}t&2&&(f(9),h("ngClass",D(2,T,r.isDarkMode,!r.isDarkMode)),f(),S(" ",r.theme," "))},dependencies:[x,_,M],styles:[".navbar[_ngcontent-%COMP%]{background-color:var(--background-color);color:var(--main-color);transition:all 1s}.logo[_ngcontent-%COMP%]{font-family:Inter,sans-serif;font-size:25px;background:linear-gradient(45deg,#00fd19,#8f39f1);background-clip:text;color:transparent}"]});let i=e;return i})();var H=(()=>{let e=class e{};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=c({type:e,selectors:[["app-auth-layout"]],standalone:!0,features:[m],decls:4,vars:0,consts:[[1,"container"]],template:function(t,r){t&1&&(o(0,"app-nav-auth"),n(1,"div",0),o(2,"router-outlet"),a(),o(3,"app-footer"))},dependencies:[L,F,A],styles:["[_nghost-%COMP%]{display:flex;flex-direction:column;justify-content:space-between;min-height:100vh}"]});let i=e;return i})();export{H as AuthLayoutComponent};
