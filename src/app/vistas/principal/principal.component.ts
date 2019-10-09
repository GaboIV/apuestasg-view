import { Component, OnInit } from '@angular/core';
import { GeneralesService } from '../../servicios/generales.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {

  constructor(
    public _generalService: GeneralesService
  ) {}

  ngOnInit() {}

}
