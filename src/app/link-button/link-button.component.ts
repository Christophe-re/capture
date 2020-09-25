import { Component, Input, OnInit } from '@angular/core';
import {DateAdapter, MatDialog, MatDialogConfig, MatTableDataSource} from '@angular/material';
import { Toast } from 'angular2-toaster';
import { DetailCaptureModalComponent } from '../detail-capture-modal/detail-capture-modal.component';

@Component({
  selector: 'app-link-button',
  templateUrl: './link-button.component.html',
  styleUrls: ['./link-button.component.scss']
})
export class LinkButtonComponent implements OnInit {
  public toast: Toast;
  constructor(public dialog: MatDialog) {}

  openDialog() {
    this.dialog.open(DetailCaptureModalComponent, {
      data: this.toast.data
    });
  }

  ngOnInit() {
    console.log(this.toast);
  }
}
