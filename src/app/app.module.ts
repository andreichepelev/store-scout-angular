import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatChipsModule } from '@angular/material/chips';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ReactiveFormsModule } from '@angular/forms';
import { AppleIdChipsComponent } from './apple-id-chips/apple-id-chips.component';
import { GoogleIdChipsComponent } from './google-id-chips/google-id-chips.component';
import { TableComponent } from './table/table.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';
import { AuthService } from './services/auth.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDialogModule } from '@angular/material/dialog';
import { LandingComponent } from './landing/landing.component';
import { LayoutModule } from '@angular/cdk/layout'




const firebaseConfig = {
  apiKey: "AIzaSyAuVGnETj16iYqKIXOzqrIyk1Dp0VnJ-6o",
  authDomain: "store-scout-19f7d.firebaseapp.com",
  databaseURL: "https://store-scout-19f7d.firebaseio.com",
  projectId: "store-scout-19f7d",
  storageBucket: "store-scout-19f7d.appspot.com",
  messagingSenderId: "637067734443",
  appId: "1:637067734443:web:8d7ea05ed7256bac2cb6ee",
  measurementId: "G-JGVDJVY1FV"
};


@NgModule({
  declarations: [
    AppComponent,
    AppleIdChipsComponent,
    GoogleIdChipsComponent,
    TableComponent,
    TableComponent,
    SignInComponent,
    SignUpComponent,
    ForgotPasswordComponent,
    VerifyEmailComponent,
    DashboardComponent,
    LandingComponent
  ],
  imports: [
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule, 
    AngularFireAuthModule,
    AngularFireStorageModule,
    BrowserModule,
    AppRoutingModule,
    MatToolbarModule,
    MatIconModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatSidenavModule,
    MatInputModule,
    MatTableModule,
    MatTabsModule,
    MatChipsModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatGridListModule,
    MatDialogModule,
    LayoutModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
