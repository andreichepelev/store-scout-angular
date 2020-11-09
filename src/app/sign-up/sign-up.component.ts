import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SignInComponent } from '../sign-in/sign-in.component'
import { ForgotPasswordComponent } from '../forgot-password/forgot-password.component'
import { VerifyEmailComponent } from '../verify-email/verify-email.component'

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  hide = true;

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  passwordFormControl = new FormControl('', [
    Validators.required
  ])

  constructor(
    public authService: AuthService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<SignUpComponent>
  ) { }

  openLogInDialog() {
    this.dialog.open(SignInComponent, {});
  }

  openForgotPassWordDialog() {
    this.dialog.open(ForgotPasswordComponent, {});
  }

  openVerifyEmailDialog() {
    this.dialog.open(VerifyEmailComponent, {});
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
  ngOnInit(): void {
  }

}
