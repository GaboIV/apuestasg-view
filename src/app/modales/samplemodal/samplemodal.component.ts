import { Component, OnInit } from '@angular/core';
import { BaseModalComponent } from 'src/app/comun/componentes/overlay/base_modal.component';

@Component({
  selector: 'app-samplemodal',
  templateUrl: './samplemodal.component.html',
  styleUrls: ['./samplemodal.component.css']
})
export class SamplemodalComponent extends BaseModalComponent implements OnInit {

  modalTitle: string;

  constructor() {
    super();
  }

  ngOnInit() {
    if (!!this._data && !!this._data.modalTitle) {
      this.modalTitle = this._data.modalTitle;
    }
  }
}