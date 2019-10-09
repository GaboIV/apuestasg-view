import { Component, OnInit } from '@angular/core';
import { CaballosService } from 'src/app/servicios/caballos.service';

@Component({
  selector: 'app-menu-caballos',
  templateUrl: './menu-caballos.component.html',
  styleUrls: ['./menu-caballos.component.css']
})
export class MenuCaballosComponent implements OnInit {

  constructor(
    public _caballoService: CaballosService,
  ) { }

  ngOnInit() {
  }

}
