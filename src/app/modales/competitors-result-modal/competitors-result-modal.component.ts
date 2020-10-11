import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BaseModalComponent } from 'src/app/comun/componentes/overlay/base_modal.component';
import { PartidosService } from 'src/app/servicios/partidos.service';

@Component({
  selector: 'app-competitors-result-modal',
  templateUrl: './competitors-result-modal.component.html',
  styleUrls: ['./competitors-result-modal.component.css']
})

export class CompetitorsResultModalComponent extends BaseModalComponent implements OnInit {

  game: any;

  constructor(
    public _partidosService: PartidosService
  ) {
    super();
  }

  ngOnInit() {
    if (!!this._data && !!this._data.game) {
      this.game = this._data.game;
    }

    console.log(this.game);
  }

  updateResult(f: NgForm) {
    this._partidosService.enviarResult( this.game.id, f.value )
    .subscribe( resp => {
      if (resp.status == 'correcto'){

      }
    });
  }
}