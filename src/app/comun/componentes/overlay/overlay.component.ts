import { animate, style, transition, trigger } from "@angular/animations";
import { AfterViewInit, Component, ComponentFactory, ComponentFactoryResolver, ComponentRef, ElementRef, EventEmitter, HostBinding, HostListener, OnInit, Renderer2, Type, ViewChild, ViewContainerRef } from "@angular/core";
import { takeWhile } from "rxjs/operators";
import { ModalContentDirective } from "src/app/directivas/modal.directive";

@Component({
  selector: 'app-overlay',
  templateUrl: './overlay.component.html',
  styleUrls: ['./overlay.component.css'],
  animations: [
    trigger('leaveTimer', [
      transition(
        ':leave',
        [
          style({ opacity: 1 }),
          animate('0ms linear', style({ opacity: 1 }))
        ]
      )
    ])
  ]
})

export class OverlayComponent implements OnInit, AfterViewInit {

  private _active = false;
  private _modal: Type<any>;

  private _componentRef: ComponentRef<any>;
  private _data: any;
  allowOverlayClick = true;
  showCloseButton = true;

  set data(data: any) {
    this._data = data;
    this.setData();
  }

  whenOverlayClicked$: EventEmitter<void> = new EventEmitter();

  @ViewChild('closeButton') closeButton: ElementRef;
  @ViewChild('overlay') overlayEl: ElementRef;
  @ViewChild(ModalContentDirective) contentContainer: ModalContentDirective;

  @HostBinding('@leaveTimer') delayDestroy() {}
  @HostListener('click', ['$event']) onOverlayClick(event: MouseEvent | TouchEvent) {
    if (this.allowOverlayClick && !this._componentRef.location.nativeElement.contains(event.target)) {
      this.closeModal(event);
    }
  }

  set component(component: Type<any>) {
    if (!this._modal) {
      this._modal = component;
      this.setupContent();
    }
  }

  get componentInstance(): ComponentRef<any> {
    return this._componentRef;
  }

  constructor(private componentFactoryResolver: ComponentFactoryResolver, private renderer: Renderer2) {
  }

  ngOnInit(): void {
    this._active = true;
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.renderer.addClass(this.overlayEl.nativeElement, 'fade-in');
    });
  }

  closeModal(event?: MouseEvent | TouchEvent): void {
    if (!!event) {
      event.stopPropagation();
      event.preventDefault();
    }
    this.renderer.removeClass(this.overlayEl.nativeElement, 'fade-in');
    this.renderer.removeClass(this._componentRef.location.nativeElement, 'slide-in');
    this.whenOverlayClicked$.emit();
  }

  setData(): void {
    if (this._componentRef && 'data' in this._componentRef.instance) {
      this._componentRef.instance.data = this._data;
    }
  }

  private setupCloseListener(): void {
    if (this._componentRef && 'closeModal' in this._componentRef.instance) {
      (this._componentRef.instance.closeModal as EventEmitter<void>)
        .pipe(takeWhile(() => this._active))
        .subscribe(() => {
        this.closeModal();
      });
    }
  }

  setupContent(): void {
    if (this._modal) {
      const componentFactory: ComponentFactory<any> = this.componentFactoryResolver.resolveComponentFactory(
        this._modal
      );

      const viewContainerRef: ViewContainerRef = this.contentContainer.viewContainerRef;
      viewContainerRef.clear();

      this._componentRef = viewContainerRef.createComponent(componentFactory);

      this.setupCloseListener();
    }
  }
}