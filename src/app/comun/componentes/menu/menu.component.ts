import { Component, OnInit } from '@angular/core';
import { GeneralesService } from '../../../servicios/generales.service';
import { InicioSesionService } from 'src/app/servicios/inicio-sesion.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  public largoVentana: any;
  public largoTabla: any;

  public idsLeagues = [];

  public scrollbarOptions = { theme: 'minimal-dark', alwaysShowScrollbar: 1 };

  categories = [];

  constructor(
    private route: ActivatedRoute,
    public router: Router,
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
  }

  checked(item) {
    if (item.checked) {
      item.checked = false;
    } else {
      item.checked = true;
    }

    this.handleUrlParameters(item);
  }

  handleUrlParameters(item) {

    const id = item.id;

    const objIndex = this.idsLeagues.findIndex(idLeague => idLeague === id);

    if (objIndex > -1) {
      const objIndex2 = this._generalService.leaguesSelected.findIndex(categories => categories.id === item.category_id);

      const objIndex3 = this._generalService.leaguesSelected[objIndex2].leagues.findIndex(league => league.league_id == item.id);

      this._generalService.leaguesSelected[objIndex2].leagues.splice(objIndex3, 1);

      if (this._generalService.leaguesSelected[objIndex2].leagues.length == 0) {
        this._generalService.leaguesSelected.splice(objIndex2, 1);
      }
      
      this.idsLeagues.splice(objIndex, 1);
    } else {
      this._generalService.getGamesByLeague(id)
      .subscribe(resp => {})
      this.idsLeagues.push(id);
    }

    this._generalService.leaguesCount = this.idsLeagues.length;
    
    console.log(this._generalService.leaguesSelected);

    this.router.navigate([], {
      queryParams: {
        leagues: this.idsLeagues.join(",")
      },
      queryParamsHandling: 'merge',
    });
  }

}
