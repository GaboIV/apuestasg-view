import { ApplicationRef, ComponentFactoryResolver, ComponentRef, EmbeddedViewRef, Injectable, Injector } from "@angular/core";

@Injectable({
    providedIn: 'root'
  })
  export class DomService {
    private id = 0;
    private componentRefs: { [key: number]: ComponentRef<any> } = {};
  
    constructor(
      private componentFactoryResolver: ComponentFactoryResolver,
      private appRef: ApplicationRef,
      private injector: Injector
    ) {}
  
    appendComponentToBody(component: any): number {
      const componentRef = this.componentFactoryResolver.resolveComponentFactory(component).create(this.injector);
      this.appRef.attachView(componentRef.hostView);
      const domElem = (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
      document.body.appendChild(domElem);
      this.id++;
      this.componentRefs[this.id] = componentRef;
      return this.id;
    }
  
    getComponent(id: number): ComponentRef<any> | null {
      if (this.componentRefs[id]) {
        return this.componentRefs[id];
      }
      return null;
    }
  
    removeComponentFromBody(id: number): void {
      if (this.componentRefs[id]) {
        this.appRef.detachView(this.componentRefs[id].hostView);
        this.componentRefs[id].destroy();
      }
    }
  }