
// export const routes: Routes = [

// {
// path: '',
// loadChildren: () =>
// import('./pages/home/home.module').then(m => m.HomeModule)
// },

//   {
//     path: 'movie/:id',
//     component: MovieDetailComponent
//   },

// { path: '', redirectTo: 'auth/login', pathMatch: 'full' },

// {
// path: 'about',
// loadChildren: () =>
// import('./pages/about/about.module').then(m => m.AboutModule)
// },

// {
// path: 'contact',
// loadChildren: () =>
// import('./pages/contact/contact.module').then(m => m.ContactModule)
// },

// {
// path: 'subscription',
// loadChildren: () =>
// import('./pages/subscription/subscription.module').then(m => m.SubscriptionModule)
// },

//   {
//     path: 'auth',
//     loadChildren: () => import('./authentication/authentication.module')
//       .then(m => m.AuthenticationModule)
//   },

// { path: 'reward', component: RewardComponent },

//  { path: 'player', component: PlayerComponent },

// { path: 'privacy-policy', component: PrivacyPolicyComponent },

//  { path: 'terms-of-service', component: TermsOfServiceComponent },

//   { path: 'return-refund', component: ReturnRefundComponent},

//   { path: 'short-videos', component: ShortVideosComponent},

// ];


import { Routes } from '@angular/router';
import { MovieDetailComponent } from './movie-detail/movie-detail.component';
import { RewardComponent } from './reward/reward.component';
import { PlayerComponent } from './player/player.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { TermsOfServiceComponent } from './pages/terms-of-service/terms-of-service.component';
import { ReturnRefundComponent } from './return-refund/return-refund.component';
import { ShortVideosComponent } from './short-videos/short-videos.component';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [

  { path: '', redirectTo: 'auth/login', pathMatch: 'full' },

  {
    path: 'auth',
    loadChildren: () => import('./authentication/authentication.module')
      .then(m => m.AuthenticationModule)
  },

  //  Har route pe alag alag guard — wrapper '' nahi
  {
    path: 'home',
    canActivate: [authGuard],
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule)
  },
  { path: 'movie/:id',        canActivate: [authGuard], component: MovieDetailComponent },
  { path: 'reward',           canActivate: [authGuard], component: RewardComponent },
  { path: 'player',           canActivate: [authGuard], component: PlayerComponent },
  { path: 'privacy-policy',   canActivate: [authGuard], component: PrivacyPolicyComponent },
  { path: 'terms-of-service', canActivate: [authGuard], component: TermsOfServiceComponent },
  { path: 'return-refund',    canActivate: [authGuard], component: ReturnRefundComponent },
  { path: 'short-videos',     canActivate: [authGuard], component: ShortVideosComponent },
  {
    path: 'about',
    canActivate: [authGuard],
    loadChildren: () => import('./pages/about/about.module').then(m => m.AboutModule)
  },
  {
    path: 'contact',
    canActivate: [authGuard],
    loadChildren: () => import('./pages/contact/contact.module').then(m => m.ContactModule)
  },
  {
    path: 'subscription',
    canActivate: [authGuard],
    loadChildren: () => import('./pages/subscription/subscription.module')
      .then(m => m.SubscriptionModule)
  },

  { path: '**', redirectTo: 'auth/login' }
];