import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-stop-dialog',
  templateUrl: './stop-dialog.component.html',
  styleUrls: ['./stop-dialog.component.css']
})
export class StopDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public newData: any) { }

  ngOnInit(): void {
  }


}
