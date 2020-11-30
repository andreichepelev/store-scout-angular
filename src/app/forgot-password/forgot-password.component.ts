import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth/auth.service'
import { FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SignInComponent } from '../sign-in/sign-in.component';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  hide = true;

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  constructor(
    public authService: AuthService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<ForgotPasswordComponent>,
  ) { }

  openLogInDialog() {
    this.dialog.open(SignInComponent, {});
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
  }

}
