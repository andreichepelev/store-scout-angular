import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { JobsAdminPanelComponent } from './jobs-admin-panel/jobs-admin-panel.component'
import { DashboardComponent } from './dashboard/dashboard.component'
import { SignInComponent } from './sign-in/sign-in.component'
import { SignUpComponent } from './sign-up/sign-up.component'
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component'
import { VerifyEmailComponent } from './verify-email/verify-email.component'
// import { AuthGuard } from "./services/auth.guard";
import { LandingComponent } from './landing/landing.component';
import { AngularFireAuthGuard, redirectLoggedInTo, redirectUnauthorizedTo } from '@angular/fire/auth-guard';

const redirectUnauthorizedToLanding = () => redirectUnauthorizedTo(['landing']);
const redirectLoggedInToDashboard = () => redirectLoggedInTo(['dashboard']);


// {
//   path: 'send-email',
//   component: SendEmailComponent,
//   canActivate: [AngularFireAuthGuard],
//   data: { authGuardPipe: redirectUnauthorizedToLogin }
// },
// {
//   path: 'login',
//   component: PasswordLessLoginComponent,
//   canActivate: [AngularFireAuthGuard],
//   data: { authGuardPipe: redirectLoggedInToSendEmail }
// },

const routes: Routes = [
  // { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { 
    path: '', 
    component: LandingComponent, 
    canActivate: [AngularFireAuthGuard], 
    data: { authGuardPipe: redirectLoggedInToDashboard }
  },

  { path: 'sign-in', 
    component: SignInComponent 
  },

  { path: 'register-user', 
    component: SignUpComponent 
  },

  { path: 'dashboard', 
    component: DashboardComponent,  
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLanding }
  },

  { path: 'jobs-admin-panel', 
  component: JobsAdminPanelComponent,  
  canActivate: [AngularFireAuthGuard],
  data: { authGuardPipe: redirectUnauthorizedToLanding }
},

  { path: 'forgot-password', 
    component: ForgotPasswordComponent 
  },

  { path: 'verify-email-address', 
    component: VerifyEmailComponent 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
