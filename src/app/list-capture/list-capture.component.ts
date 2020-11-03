import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { DetailCaptureModalComponent } from '../detail-capture-modal/detail-capture-modal.component';
import { GlobalToasterService } from '../services/global-toaster.service';
import { OcrService } from '../services/ocr.service';

@Component({
  selector: 'app-list-capture',
  templateUrl: './list-capture.component.html',
  styleUrls: ['./list-capture.component.scss']
})
export class ListCaptureComponent implements OnInit {
  localListCapture: any[];
  constructor(private ocrService: OcrService, public dialog: MatDialog) { }

  ngOnInit() {
    this.localListCapture = this.ocrService.listCapture;
  }
  openDialog(data) {
    this.dialog.open(DetailCaptureModalComponent, {
      data: data,
      maxWidth: '100vw',
      maxHeight: '100vh',
      height: '100%',
      width: '100%'
    });
  }
}
