import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SignInComponent } from '../sign-in/sign-in.component'

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.scss']
})
export class VerifyEmailComponent implements OnInit {

  constructor(
    public authService: AuthService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<VerifyEmailComponent>
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
