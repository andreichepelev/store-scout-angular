import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-removal',
  templateUrl: './confirm-removal.component.html',
  styleUrls: ['./confirm-removal.component.scss']
})
export class ConfirmRemovalComponent implements OnInit {

  // hide = true;

  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<ConfirmRemovalComponent>,
  ) { }

  closeDialog(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
  }

}