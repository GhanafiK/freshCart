import { Routes } from '@angular/router';
import { provideRouter } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { blankGuard } from './core/guards/blank.guard';

export const routes: Routes = [
  {
    path: '',
    canActivate: [blankGuard],
    loadComponent: () => import('./layout/auth-layout/auth-layout.component').then(m => m.AuthLayoutComponent),
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      {
        path: 'login',
        loadComponent: () => import('./components/login/login.component').then(m => m.LoginComponent),
        title: 'login'
      },
      {
        path: 'register',
        loadComponent: () => import('./components/register/register.component').then(m => m.RegisterComponent),
        title: 'register'
      },
      {
        path: 'forgotPassword',
        loadComponent: () => import('./components/forgotpassword/forgotpassword.component').then(m => m.ForgotpasswordComponent),
        title: 'forgotPassword'
      },
    ]
  },
  {
    path: '',
    canActivate: [authGuard],
    loadComponent: () => import('./layout/blank-layout/blank-layout.component').then(m => m.BlankLayoutComponent),
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      {
        path: 'home',
        loadComponent: () => import('./components/home/home.component').then(m => m.HomeComponent),
        title: 'home'
      },
      {
        path: 'details/:id',
        loadComponent: () => import('./components/details/details.component').then(m => m.DetailsComponent),
        title: 'details'
      },
      {
        path: 'brands',
        loadComponent: () => import('./components/brands/brands.component').then(m => m.BrandsComponent),
        title: 'brands'
      },
      {
        path: 'cart',
        loadComponent: () => import('./components/cart/cart.component').then(m => m.CartComponent),
        title: 'cart'
      },
      {
        path: 'categories',
        loadComponent: () => import('./components/categories/categories.component').then(m => m.CategoriesComponent),
        title: 'category'
      },
      {
        path: 'CategoryProducts/:name',
        loadComponent: () => import('./components/category-products/category-products.component').then(m => m.CategoryProductsComponent),
        title: 'category products'
      },
      {
        path: 'brandProducts/:name',
        loadComponent: () => import('./components/brand-products/brand-products.component').then(m => m.BrandProductsComponent),
        title: 'brand products'
      },
      {
        path: 'product',
        loadComponent: () => import('./components/product/product.component').then(m => m.ProductComponent),
        title: 'product'
      },
      {
        path: 'allorders',
        loadComponent: () => import('./components/allorders/allorders.component').then(m => m.AllordersComponent),
        title: 'allorders'
      },
      {
        path: 'wishList',
        loadComponent: () => import('./components/wish-list/wish-list.component').then(m => m.WishListComponent),
        title: 'Wish List'
      },
      {
        path: 'order/:id',
        loadComponent: () => import('./components/order/order.component').then(m => m.OrderComponent),
        title: 'order'
      },
    ]
  },
  {
    path: '**',
    loadComponent: () => import('./components/not-found/not-found.component').then(m => m.NotFoundComponent),
  }
];

export const appRouterProviders = [provideRouter(routes)];
