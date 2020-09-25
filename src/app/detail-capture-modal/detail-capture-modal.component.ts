import { Component, Inject, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
@Component({
  selector: 'app-detail-capture-modal',
  templateUrl: './detail-capture-modal.component.html',
  styleUrls: ['./detail-capture-modal.component.scss']
})
export class DetailCaptureModalComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data) {}

  ngOnInit() {
    
  }

}
