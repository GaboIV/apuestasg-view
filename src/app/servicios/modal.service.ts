import { ComponentRef, Injectable, Type } from "@angular/core";
import { IModalConfig } from "../comun/componentes/overlay/base_modal.component";
import { OverlayComponent } from "../comun/componentes/overlay/overlay.component";
import { DomService } from "./dom.service";

@Injectable({
    providedIn: 'root'
  })
  export class ModalService {
  
    private openModals: { [idRef: number]: ComponentRef<OverlayComponent> } = {};
  
    constructor(private domService: DomService) {}
  
    closeModal(refId: number): void {
      this.domService.removeComponentFromBody(refId);
    }
  
    getModalContentInstance(refId: number): any {
      return !!this.openModals[refId] ? this.openModals[refId].instance.componentInstance.instance : null;
    }
  
    private setConfig(refId: number, config: IModalConfig): void {
      this.openModals[refId].instance.allowOverlayClick =
        'allowOverlayClick' in config ? !!config.allowOverlayClick : this.openModals[refId].instance.allowOverlayClick;
  
      this.openModals[refId].instance.showCloseButton =
        'showCloseButton' in config ? !!config.showCloseButton : this.openModals[refId].instance.showCloseButton;
  
      if ('whenClosed' in config) {
        this.openModals[refId].instance.whenOverlayClicked$.subscribe(() => {
          if (!!config.whenClosed) {
            config.whenClosed();
          }
        });
      }
  
      if ('data' in config) {
        this.openModals[refId].instance.data = config.data;
      }
    }
  
    showModal(content: Type<any>, config?: IModalConfig): number {
      const refId = this.domService.appendComponentToBody(OverlayComponent);
      this.openModals[refId] = this.domService.getComponent(refId) as ComponentRef<OverlayComponent>;
      this.openModals[refId].instance.component = content;
      if (config) {
        this.setConfig(refId, config);
      }
  
      this.openModals[refId].instance.whenOverlayClicked$.subscribe(() => {
        this.closeModal(refId);
      });
      return refId;
    }
  }