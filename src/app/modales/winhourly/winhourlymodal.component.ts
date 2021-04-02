import { Component, OnInit } from '@angular/core';
import Echo from 'laravel-echo';
import { BaseModalComponent } from 'src/app/comun/componentes/overlay/base_modal.component';
import { GeneralesService } from 'src/app/servicios/generales.service';
import { InicioSesionService } from 'src/app/servicios/inicio-sesion.service';
import { PromoService } from 'src/app/servicios/promo.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-winhourlymodal',
  templateUrl: './winhourlymodal.component.html',
  styleUrls: ['./winhourlymodal.component.less']
})
export class WinHourlyComponent extends BaseModalComponent implements OnInit {

  modalTitle: string;
  time: string = '';
  nextPromo = {
    time: 0
  };
  numbers = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36];

  results = [];

  selection = null;

  constructor(
    public _promoService: PromoService,
    public _inicioSesion: InicioSesionService,
    public _generalesService: GeneralesService,
  ) {
    super();
  }

  ngOnInit() {
    this.getNextPromo();

    if (!!this._data && !!this._data.modalTitle) {
      this.modalTitle = this._data.modalTitle;
    }

    let config_broadcaster = environment.optionsWebsocketsEcho;
    config_broadcaster['auth'] = {
      headers:
      {
        'Authorization': 'Bearer ' + this._inicioSesion.token
      }
    };

    window.Echo = new Echo(config_broadcaster);

    console.log(window.Echo);

    console.log(window.Echo.channel('promo-hourly')
      .listen('PromoHourlyAdded', data => {
        this.nextPromo = data.promo;
      })
      .listen('WinnerNumberGenerated', data => {
        var $inner = $('.inner'),
          $reset = $('#reset'),
          $data = $('.data'),
          $spin = $('#spin'),
          $mask = $('.mask'),
          maskDefault = 'Hagan sus apuestas',
          timer = 9000;

        var red = [32, 19, 21, 25, 34, 27, 36, 30, 23, 5, 16, 1, 14, 9, 18, 7, 12, 3];

        // get a random number between 0 and 36 and apply it to the nth-child selector
        var randomNumber = data.number,
          color = null,
          bg_color = null;
        $inner.attr('data-spinto', randomNumber).find('li:nth-child(' + randomNumber + ') input').prop('checked', 'checked');
        // prevent repeated clicks on the spin button by hiding it
        $(this).hide();
        // disable the reset button until the ball has stopped spinning
        $reset.addClass('disabled').prop('disabled', 'disabled').show();

        $('.placeholder').remove();


        setTimeout(function () {
          $mask.text('No va más');
        }, timer / 2);

        setTimeout(function () {
          $mask.text(maskDefault);
        }, timer + 500);



        // remove the disabled attribute when the ball has stopped
        setTimeout(function () {
          $reset.removeClass('disabled').prop('disabled', '');

          if ($.inArray(randomNumber, red) !== -1) {
            color = 'rojo';
            bg_color = 'red';
          } else {
            color = 'negro';
            bg_color = 'black';
          };

          if (randomNumber == 0) {
            color = 'verde';
            bg_color = 'green';
          };

          $('.result-number').text(randomNumber);
          $('.result-color').text(color);
          $('.result').css({ 'background-color': '' + bg_color + '' });
          $data.addClass('reveal');
          $inner.addClass('rest');

          let thisResult = '<li class="previous-result color-' + bg_color + '"><span class="previous-number">' + randomNumber + '</span><span class="previous-color"> ' + color + '</span></li>';

          $('.previous-list').prepend(thisResult);


        }, timer);


        setTimeout(()=> {
          // remove the spinto data attr so the ball 'resets'
          $inner.attr('data-spinto','').removeClass('rest');
          $(this).hide();
          $spin.show();
          $data.removeClass('reveal');
          this.getNextPromo();
          this.selection = null;
        }, timer + 9000);

      })
    );
  }

  roulette() {
    var $inner = $('.inner'),
      $spin = $('#spin'),
      $reset = $('#reset'),
      $data = $('.data'),
      $mask = $('.mask'),
      maskDefault = 'Hagan sus apuestas',
      timer = 9000;

    $reset.hide();

    $mask.text(maskDefault);

    $spin.on('click', function () {
      $inner.attr('data-spinto', '').removeClass('rest');
      $(this).hide();
      $spin.show();
      $data.removeClass('reveal');
    });

    $reset.on('click', function () {

    });

  }

  getNextPromo() {
    this._promoService.getNextPromo('hourly')
    .subscribe(resp => {
      this.nextPromo = resp.promo;
      this.results = resp.results;
      this.selection = resp.selection.selection;
    })
  }

  addSelection(number) {
    this._promoService.addSelection('hourly', number)
    .subscribe(resp => {
      this.selection = resp.selection.selection;
    });
  }
}
