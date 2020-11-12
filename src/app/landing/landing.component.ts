import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service'
import { SignInComponent } from '../sign-in/sign-in.component'
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

  constructor(
    public authService: AuthService,
    public dialog: MatDialog
  ) { }

  openLogInDialog() {
    this.dialog.open(SignInComponent, {});
  }

  ngOnInit(): void {
  }

}