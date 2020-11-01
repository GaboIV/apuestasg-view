import { Component, OnInit } from '@angular/core';
import { GeneralesService } from '../../../servicios/generales.service';
import { InicioSesionService } from 'src/app/servicios/inicio-sesion.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  public largoVentana: any;
  public largoTabla: any;

  public scrollbarOptions = { theme: 'minimal-dark',  alwaysShowScrollbar: 1 };

  categories = [];

  constructor(
    public _generalService: GeneralesService,
    public _inicioSesion: InicioSesionService,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    this.largoVentana = window.innerHeight;
    this.largoTabla = this.largoVentana;
    this.largoTabla += 'px';
    this.getCategories();
  }

  getCategories() {
    this._generalService.getCategorySidebar()
    .subscribe(resp => {
      this.categories = resp.categories;
    });
  }

  sanitizeImageUrl(imageUrl: string): SafeUrl {
      if (imageUrl) {
        return this.sanitizer.bypassSecurityTrustUrl(imageUrl);
      }      
  }

  collapse(item) {
    if (item.collapse) {
      item.collapse = false;
    } else {
      item.collapse = true;
    }
    console.log(item);
  }

  checked(item) {
    if (item.checked) {
      item.checked = false;
    } else {
      item.checked = true;
    }
    console.log(item);
  }

}
