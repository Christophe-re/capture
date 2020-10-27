import { Component, Input, OnInit } from '@angular/core';
import {DateAdapter, MatDialog, MatDialogConfig, MatTableDataSource} from '@angular/material';
import { Toast } from 'angular2-toaster';
import { DetailCaptureModalComponent } from '../detail-capture-modal/detail-capture-modal.component';
import { GlobalToasterService } from '../services/global-toaster.service';

@Component({
  selector: 'app-link-button',
  templateUrl: './link-button.component.html',
  styleUrls: ['./link-button.component.scss']
})
export class LinkButtonComponent implements OnInit {
  public toast: Toast;
  constructor(public dialog: MatDialog, private globalToasterService: GlobalToasterService) {}

  openDialog() {
    this.dialog.open(DetailCaptureModalComponent, {
      data: this.toast.data
    });
    this.globalToasterService.deleteToast(this.toast);
  }

  ngOnInit() {
    console.log(this.toast);
  }
}
