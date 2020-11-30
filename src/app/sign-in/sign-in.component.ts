import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth/auth.service'
import { FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SignUpComponent } from '../sign-up/sign-up.component';
import { ForgotPasswordComponent } from '../forgot-password/forgot-password.component';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

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
    public dialogRef: MatDialogRef<SignInComponent>,
  ) { }

  openSignUpDialog() {
    this.dialog.open(SignUpComponent, {});
  }

  openForgotPassWordDialog() {
    this.dialog.open(ForgotPasswordComponent, {});
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
  }

}
