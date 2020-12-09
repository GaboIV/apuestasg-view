import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Player } from 'src/app/modelos/player';
import { GeneralesService } from 'src/app/servicios/generales.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';

import Echo from 'laravel-echo';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  users: Player[] = [];

  pagina = 1;
  total = 0;

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public _usuariosService: UsuarioService,
    public _generalesService: GeneralesService,
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.getUsers(1);

    let config_broadcaster = environment.optionsWebsocketsEcho;
    config_broadcaster['auth'] = {
      headers:
      {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      }
    };

    window.Echo = new Echo(config_broadcaster);

    window.Echo.private('players')
      .listen('PlayerCreated', data => {
        if (this.users.length >= 15) {
          this.users.splice(-1, 1);
        }

        this.users.unshift(data.player);

        setTimeout(function () {
          document.getElementById('user-' + data.player.id).className = "par_th_nt add_user";

          setTimeout(function () {
            document.getElementById('user-' + data.player.id).className = "par_th_nt";
          }, 3000);
        }, 1);
      })
      .listen('PlayerUpdated', data => {
        let obj = this.users.find((user, i) => {
          if (user.id === data.player.id) {
            this.users[i] = data.player;
            return true;
          }
        });

        setTimeout(function () {
          document.getElementById('user-' + data.player.id).className = "par_th_nt add_user";

          setTimeout(function () {
            document.getElementById('user-' + data.player.id).className = "par_th_nt";
          }, 3000);
        }, 1);
      });
  }

  changeClass(player) {
    document.getElementById('user-' + player.id).className = "par_th_nt add_user";
  }

  getUsers(page: number ) {
    this._usuariosService.getAll(page)
      .subscribe(resp => {
        this.users = resp.data
        console.log(this.users);
      });
  }
}
