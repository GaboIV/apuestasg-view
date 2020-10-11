import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
    selector: 'app-base-modal',
    template: '<div></div>',
    styles: []
  })
  export class BaseModalComponent {
    protected _data: any;
  
    @Output() closeModal: EventEmitter<void> = new EventEmitter();
  
    @Input() set data(value: any) {
      if (!!value) {
        this._data = value;
      }
    }
  
    get data(): any {
      return this._data;
    }
  
    constructor() {}
  
    close(): void {
      this.closeModal.emit();
    }
  }
  
  export interface IModalConfig {
    /**
     * If true, will close the modal when user clicks outside.
     */
    allowOverlayClick?: boolean;
    showCloseButton?: boolean;
    data?: any;
    whenClosed?: () => {};
  }