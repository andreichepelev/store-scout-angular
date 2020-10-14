import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service'
import { SignInComponent } from '../sign-in/sign-in.component'
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

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
